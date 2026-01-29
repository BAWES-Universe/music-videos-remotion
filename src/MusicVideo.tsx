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
} from "./types/SongConfig";

export type MusicVideoProps = {
  config: SongConfig;
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
export const MusicVideo: React.FC<MusicVideoProps> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

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

  // Current time in milliseconds
  const currentTimeMs = (frame / fps) * 1000;

  // Get current section for background
  const currentSection = getCurrentSection(sections, currentTimeMs);

  // Calculate section progress (0-1)
  const currentSectionData = sections.find((s) => {
    const nextSection = sections[sections.indexOf(s) + 1];
    const endTime = nextSection ? nextSection.startMs : durationInFrames * (1000 / fps);
    return currentTimeMs >= s.startMs && currentTimeMs < endTime;
  });
  const sectionProgress = currentSectionData
    ? (currentTimeMs - currentSectionData.startMs) /
      (currentSectionData.endMs - currentSectionData.startMs)
    : 0;

  // Intro duration (before first lyric)
  const introEndFrame = lyrics.length > 0 ? Math.floor((lyrics[0].startMs / 1000) * fps) : 60;

  // Get particle color for current section
  const particleColor = getParticleColors(config, currentSection);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Audio track */}
      <Audio src={staticFile(config.audioFile)} />

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

      {/* Title sequence during intro */}
      <Sequence from={0} durationInFrames={Math.min(introEndFrame, 90)} premountFor={30}>
        <TitleDisplay title={config.title} subtitle={config.subtitle} />
      </Sequence>

      {/* Render each lyric line */}
      {lyrics.map((line, index) => {
        const startFrame = Math.floor((line.startMs / 1000) * fps);
        const endFrame = Math.floor((line.endMs / 1000) * fps);
        const duration = endFrame - startFrame;

        // Skip if duration is too short
        if (duration < 5) return null;

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={duration}
            premountFor={15}
          >
            <LyricLineSequence line={line} durationInFrames={duration} />
          </Sequence>
        );
      })}

      {/* Particle bursts at chorus starts */}
      {sections
        .filter((s) => s.section === "chorus")
        .map((section, index) => {
          const burstFrame = Math.floor((section.startMs / 1000) * fps);
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
