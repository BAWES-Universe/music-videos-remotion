import { parseSrt } from "@remotion/captions";
import type { TimingCorrection } from "../types/SongConfig";

export type LyricLine = {
  startMs: number;
  endMs: number;
  text: string;
  section: "verse" | "pre-chorus" | "chorus" | "bridge" | "outro" | "intro";
};

// Labels to filter out (not actual lyrics)
const SECTION_LABELS = [
  "(VERSE 1)",
  "(VERSE 2)",
  "(PRE-CHORUS)",
  "(CHORUS)",
  "(BRIDGE)",
  "(OUTRO)",
  "(INTRO)",
  "—", // em dash only line
];

// Check if this is the FIRST occurrence of a lyric (for corrections that only apply once)
const isFirstOccurrence = (text: string, lyrics: LyricLine[]): boolean => {
  return !lyrics.some(l => l.text === text);
};

const isLabel = (text: string): boolean => {
  const trimmed = text.trim();
  return SECTION_LABELS.includes(trimmed) || trimmed === "";
};

// Only treat as section label when the line starts with a known label (e.g. "(VERSE 1)", "(CHORUS)").
// Otherwise lines like "The universe doesn't pause." would match due to "verse" in "universe".
const SECTION_LABEL_PATTERN =
  /^\s*\(?\s*(VERSE\s*\d*|PRE-CHORUS|CHORUS|BRIDGE|OUTRO|INTRO)\b/i;

const getSectionFromLabel = (
  label: string
): LyricLine["section"] | null => {
  const trimmed = label.trim();
  if (!SECTION_LABEL_PATTERN.test(trimmed)) return null;
  const upper = trimmed.toUpperCase();
  if (upper.includes("VERSE")) return "verse";
  if (upper.includes("PRE-CHORUS")) return "pre-chorus";
  if (upper.includes("CHORUS")) return "chorus";
  if (upper.includes("BRIDGE")) return "bridge";
  if (upper.includes("OUTRO")) return "outro";
  if (upper.includes("INTRO")) return "intro";
  return null;
};

// Parse SRT content with optional timing corrections
export const parseLyricsFromSrt = (
  srtContent: string,
  timingCorrections?: Record<string, TimingCorrection>
): LyricLine[] => {
  const { captions } = parseSrt({ input: srtContent });

  const lyrics: LyricLine[] = [];
  let currentSection: LyricLine["section"] = "intro";
  let chorusCount = 0;

  for (let i = 0; i < captions.length; i++) {
    const caption = captions[i];
    const text = caption.text.trim();

    // Check if this is a section label (or caption contains one)
    const sectionMatch = getSectionFromLabel(text);
    if (sectionMatch) {
      currentSection = sectionMatch;
      if (sectionMatch === "chorus") {
        chorusCount++;
      }
      // If caption has multiple lines, one may be a lyric (e.g. "(PRE-CHORUS)\nIn orbit —")
      const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      const lyricLine = lines.find((l) => !getSectionFromLabel(l) && !isLabel(l));
      if (lyricLine && lines.length > 1) {
        // Push the lyric with this caption's timing; endMs will be set below
        const nextIdx = i + 1;
        let endIdx = nextIdx;
        while (endIdx < captions.length) {
          const nextText = captions[endIdx].text.trim();
          if (!getSectionFromLabel(nextText) && !isLabel(nextText)) break;
          endIdx++;
        }
        const nextLyricCaption = captions[endIdx];
        const lineEndMs = nextLyricCaption ? nextLyricCaption.startMs : caption.startMs + 3000;
        lyrics.push({
          startMs: caption.startMs,
          endMs: lineEndMs,
          text: lyricLine,
          section: currentSection,
        });
      }
      continue;
    }

    // Skip labels and empty lines
    if (isLabel(text)) {
      continue;
    }

    // Get timing correction: apply if allOccurrences, or (first chorus + first occurrence)
    const correction = timingCorrections?.[text];
    const applyCorrection =
      correction &&
      (correction.allOccurrences || (chorusCount === 1 && isFirstOccurrence(text, lyrics)));

    // Calculate start time
    let startMs = caption.startMs;
    // If previous caption had a shortened duration (e.g. "In orbit —" 900ms), pull this line forward so it starts when that one ends (no pause)
    const prevCaption = i > 0 ? captions[i - 1] : null;
    const prevText = prevCaption?.text.trim();
    const prevCorrection = prevText ? timingCorrections?.[prevText] : undefined;
    if (
      prevCaption &&
      prevCorrection?.duration !== undefined &&
      prevCorrection?.allOccurrences
    ) {
      startMs = prevCaption.startMs + prevCorrection.duration;
    } else if (applyCorrection && correction) {
      if (correction.startMs !== undefined) {
        startMs = correction.startMs;
      } else if (correction.startOffset) {
        startMs += correction.startOffset;
      }
    }

    // End time: next caption's start so we switch to the next line when it starts (no overlap, no stuck previous line)
    let endMs: number;
    if (applyCorrection && correction.duration) {
      endMs = startMs + correction.duration;
    } else {
      const immediateNext = captions[i + 1];
      const nextIsSectionLabel =
        immediateNext && (getSectionFromLabel(immediateNext.text.trim()) !== null || isLabel(immediateNext.text.trim()));
      if (nextIsSectionLabel) {
        // Next is (VERSE 2) etc.: use this line's SRT end so we don't stretch until "I see hands"
        endMs = caption.endMs ?? caption.startMs + 3000;
      } else {
        // Next is a lyric: end when it starts so "far enough to still breathe" appears when sung, not "close enough..."
        endMs = immediateNext ? immediateNext.startMs : caption.startMs + 3000;
      }
      if (applyCorrection && correction.startOffset) {
        endMs += correction.startOffset;
      }
    }

    lyrics.push({
      startMs,
      endMs,
      text,
      section: currentSection,
    });
  }

  return lyrics;
};

// Group lyrics by section for scene transitions
export type LyricSection = {
  section: LyricLine["section"];
  startMs: number;
  endMs: number;
  lines: LyricLine[];
};

export const groupLyricsBySection = (lyrics: LyricLine[]): LyricSection[] => {
  const sections: LyricSection[] = [];
  let currentGroup: LyricSection | null = null;

  for (const line of lyrics) {
    if (!currentGroup || currentGroup.section !== line.section) {
      if (currentGroup) {
        sections.push(currentGroup);
      }
      currentGroup = {
        section: line.section,
        startMs: line.startMs,
        endMs: line.endMs,
        lines: [line],
      };
    } else {
      currentGroup.lines.push(line);
      currentGroup.endMs = line.endMs;
    }
  }

  if (currentGroup) {
    sections.push(currentGroup);
  }

  return sections;
};
