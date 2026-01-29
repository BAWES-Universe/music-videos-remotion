import { parseSrt, Caption } from "@remotion/captions";
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

const getSectionFromLabel = (
  label: string
): LyricLine["section"] | null => {
  const upper = label.toUpperCase();
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

    // Check if this is a section label
    const sectionMatch = getSectionFromLabel(text);
    if (sectionMatch) {
      currentSection = sectionMatch;
      if (sectionMatch === "chorus") {
        chorusCount++;
      }
      continue;
    }

    // Skip labels and empty lines
    if (isLabel(text)) {
      continue;
    }

    // Get timing correction if available (only for first chorus, first occurrence)
    const correction = timingCorrections?.[text];
    const applyCorrection = correction && chorusCount === 1 && isFirstOccurrence(text, lyrics);

    // Calculate start time: use absolute startMs if set, else apply startOffset
    let startMs = caption.startMs;
    if (applyCorrection && correction) {
      if (correction.startMs !== undefined) {
        startMs = correction.startMs;
      } else if (correction.startOffset) {
        startMs += correction.startOffset;
      }
    }

    // Calculate end time
    let endMs: number;
    if (applyCorrection && correction.duration) {
      endMs = startMs + correction.duration;
    } else {
      const nextCaption = captions[i + 1];
      endMs = nextCaption ? nextCaption.startMs : caption.startMs + 3000;
      // Apply same offset to end if we shifted start
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
