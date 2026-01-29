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
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import { AnimatedBackground } from "./components/AnimatedBackground";
import { LyricLine as LyricLineComponent, TitleDisplay } from "./components/LyricDisplay";
import { BrickParticles, ParticleBurst } from "./components/BrickParticles";
import {
  parseLyricsFromSrt,
  groupLyricsBySection,
  type LyricLine,
  type LyricSection,
} from "./lyrics/parseLyrics";

export type CompositionProps = {
  audioSrc: string;
  srtSrc: string;
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

// Main composition component
export const MyComposition: React.FC<CompositionProps> = ({
  audioSrc,
  srtSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const [handle] = useState(() => delayRender("Loading lyrics"));
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [sections, setSections] = useState<LyricSection[]>([]);

  // Load and parse SRT
  const loadLyrics = useCallback(async () => {
    try {
      const response = await fetch(srtSrc);
      const srtContent = await response.text();
      const parsedLyrics = parseLyricsFromSrt(srtContent);
      const groupedSections = groupLyricsBySection(parsedLyrics);

      setLyrics(parsedLyrics);
      setSections(groupedSections);
      continueRender(handle);
    } catch (e) {
      cancelRender(e);
    }
  }, [srtSrc, handle]);

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

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Audio track */}
      <Audio src={audioSrc} />

      {/* Animated background based on current section */}
      <AnimatedBackground section={currentSection} sectionProgress={sectionProgress} />

      {/* Rising brick particles */}
      <BrickParticles
        intensity={currentSection === "chorus" ? 1.5 : 1}
        color={
          currentSection === "chorus"
            ? "#ee4540"
            : currentSection === "bridge"
              ? "#f5af19"
              : "#e94560"
        }
      />

      {/* Title sequence during intro */}
      <Sequence from={0} durationInFrames={Math.min(introEndFrame, 90)} premountFor={30}>
        <TitleDisplay title="Heart of Work" subtitle="Brick by Brick" />
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
              <ParticleBurst triggerFrame={0} color="#ee4540" />
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
