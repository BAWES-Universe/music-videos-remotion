import React, { useState, useEffect, useCallback } from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  continueRender,
  delayRender,
  cancelRender,
} from "remotion";
import { Audio } from "@remotion/media";

import { AnimatedBackground } from "./components/AnimatedBackground";
import { LyricLine as LyricLineComponent, TitleDisplay } from "./components/LyricDisplay";
import { BrickParticles, ParticleBurst } from "./components/BrickParticles";
import { AudioVisualizer } from "./components/AudioVisualizer";
import {
  parseLyricsFromSrt,
  groupLyricsBySection,
  type LyricLine,
  type LyricSection,
} from "./lyrics/parseLyrics";
import {
  type SongConfig,
  getSectionColors,
  getParticleColors,
  DEFAULT_SECTION_COLORS,
} from "./types/SongConfig";

export type MusicVideoProps = {
  config: SongConfig;
  /** When set, title shows this many seconds with no overlap; audio/lyrics start after. */
  introOffsetSeconds?: number;
};

// Get current section based on frame/time
const getCurrentSection = (
  sections: LyricSection[],
  currentTimeMs: number
): LyricSection["section"] => {
  for (let i = sections.length - 1; i >= 0; i--) {
    if (currentTimeMs >= sections[i].startMs) {
      return sections[i].section;
    }
  }
  return "intro";
};

// Main music video component - config-driven
export const MusicVideo: React.FC<MusicVideoProps> = ({ config, introOffsetSeconds = 0 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // When first lyric starts before 3s, we push music/lyrics by this many frames (title only, no overlap)
  const offsetFrames = introOffsetSeconds > 0 ? Math.ceil(introOffsetSeconds * fps) : 0;

  const [handle] = useState(() => delayRender("Loading lyrics"));
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [sections, setSections] = useState<LyricSection[]>([]);

  // Get colors from config
  const sectionColors = getSectionColors(config);

  // Load and parse SRT with song-specific timing corrections
  const loadLyrics = useCallback(async () => {
    try {
      const response = await fetch(staticFile(config.srtFile));
      const srtContent = await response.text();
      const parsedLyrics = parseLyricsFromSrt(srtContent, config.timingCorrections);
      const groupedSections = groupLyricsBySection(parsedLyrics);

      setLyrics(parsedLyrics);
      setSections(groupedSections);
      continueRender(handle);
    } catch (e) {
      cancelRender(e);
    }
  }, [config.srtFile, config.timingCorrections, handle]);

  useEffect(() => {
    loadLyrics();
  }, [loadLyrics]);

  // Current time in milliseconds (logical time in the song; before offset = intro)
  const currentTimeMs =
    offsetFrames > 0 && frame < offsetFrames
      ? 0
      : ((Math.max(0, frame - offsetFrames) / fps) * 1000);

  // Get current section for background
  const currentSection = getCurrentSection(sections, currentTimeMs);

  // Calculate section progress (0-1); when pushed, song end is earlier than video end
  const songEndMs = (durationInFrames - offsetFrames) * (1000 / fps);
  const currentSectionData = sections.find((s) => {
    const nextSection = sections[sections.indexOf(s) + 1];
    const endTime = nextSection ? nextSection.startMs : Math.max(0, songEndMs);
    return currentTimeMs >= s.startMs && currentTimeMs < endTime;
  });
  const sectionProgress = currentSectionData
    ? (currentTimeMs - currentSectionData.startMs) /
      (currentSectionData.endMs - currentSectionData.startMs)
    : 0;

  // Title: show for offset (pushed intro) or until first lyric when no push
  const firstLyricStartFrame = lyrics.length > 0 ? Math.floor((lyrics[0].startMs / 1000) * fps) : 90;
  const titleDurationFrames =
    offsetFrames > 0 ? offsetFrames : firstLyricStartFrame;

  // Get particle color for current section
  const particleColor = getParticleColors(config, currentSection);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Audio track: when pushed, delay start until after title (Sequence delays playback) */}
      <Sequence from={offsetFrames} durationInFrames={durationInFrames - offsetFrames}>
        <Audio src={staticFile(config.audioFile)} />
      </Sequence>

      {/* Animated background based on current section */}
      <AnimatedBackground
        section={currentSection}
        sectionProgress={sectionProgress}
        sectionColors={sectionColors}
      />

      {/* Rising brick particles */}
      <BrickParticles
        intensity={currentSection === "chorus" ? 1.5 : 1}
        color={particleColor}
      />

      {/* Audio visualization: mount after frame 0 so "Extracting audio for frame 0" doesn't block the first frame (avoids render timeout) */}
      {config.visualization && config.visualization.style !== "none" && (
        <Sequence from={offsetFrames || 1} durationInFrames={Math.max(1, durationInFrames - (offsetFrames || 1))}>
          <AudioVisualizer
            audioSrc={config.audioFile}
            style={config.visualization.style}
            primaryColor={config.visualization.primaryColor ?? sectionColors[currentSection].accent}
            secondaryColor={config.visualization.secondaryColor ?? sectionColors.chorus.accent}
            opacity={config.visualization.opacity ?? 0.8}
          />
        </Sequence>
      )}

      {/* Title sequence: show at least 3 seconds, or until first lyric if intro is longer */}
      <Sequence from={0} durationInFrames={titleDurationFrames} premountFor={30}>
        <TitleDisplay title={config.title} subtitle={config.subtitle} />
      </Sequence>

      {/* Render each lyric line (offset when title is pushed) */}
      {lyrics.map((line, index) => {
        const startFrame = offsetFrames + Math.floor((line.startMs / 1000) * fps);
        const endFrame = offsetFrames + Math.floor((line.endMs / 1000) * fps);
        const duration = endFrame - startFrame;

        // Skip if duration is too short
        if (duration < 5) return null;

        // Unique key so duplicate text at different times (e.g. repeated "In orbit —") never reuses the wrong instance
        return (
          <Sequence
            key={`lyric-${index}-${line.startMs}`}
            from={startFrame}
            durationInFrames={duration}
            premountFor={15}
          >
            <LyricLineSequence line={line} durationInFrames={duration} />
          </Sequence>
        );
      })}

      {/* Particle bursts at chorus starts (offset when title is pushed) */}
      {sections
        .filter((s) => s.section === "chorus")
        .map((section, index) => {
          const burstFrame = offsetFrames + Math.floor((section.startMs / 1000) * fps);
          return (
            <Sequence
              key={`burst-${index}`}
              from={burstFrame}
              durationInFrames={60}
              premountFor={5}
            >
              <ParticleBurst triggerFrame={0} color={getParticleColors(config, "chorus")} />
            </Sequence>
          );
        })}
    </AbsoluteFill>
  );
};

// Wrapper component for lyric line with local frame tracking
const LyricLineSequence: React.FC<{
  line: LyricLine;
  durationInFrames: number;
}> = ({ line, durationInFrames }) => {
  const frame = useCurrentFrame();

  // Progress through this line (0 to 1)
  const lineProgress = Math.min(1, frame / durationInFrames);

  return (
    <LyricLineComponent
      text={line.text}
      section={line.section}
      lineProgress={lineProgress}
    />
  );
};
