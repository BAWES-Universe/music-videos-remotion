import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Oswald";
import type { LyricLine } from "../lyrics/parseLyrics";

const { fontFamily } = loadFont();

type Section = LyricLine["section"];

// Section-specific styling
const SECTION_STYLES: Record<
  Section,
  {
    fontSize: number;
    color: string;
    highlightColor: string;
    glowColor: string;
    transform: string;
  }
> = {
  intro: {
    fontSize: 64,
    color: "#ffffff",
    highlightColor: "#e94560",
    glowColor: "#e94560",
    transform: "none",
  },
  verse: {
    fontSize: 56,
    color: "#e0e0e0",
    highlightColor: "#4fc3f7",
    glowColor: "#4fc3f7",
    transform: "none",
  },
  "pre-chorus": {
    fontSize: 60,
    color: "#f0f0f0",
    highlightColor: "#f39422",
    glowColor: "#f39422",
    transform: "none",
  },
  chorus: {
    fontSize: 72,
    color: "#ffffff",
    highlightColor: "#ee4540",
    glowColor: "#ee4540",
    transform: "scale(1.05)",
  },
  bridge: {
    fontSize: 58,
    color: "#d0d0d0",
    highlightColor: "#f5af19",
    glowColor: "#f5af19",
    transform: "none",
  },
  outro: {
    fontSize: 54,
    color: "#c0c0c0",
    highlightColor: "#a855f7",
    glowColor: "#a855f7",
    transform: "none",
  },
};

// Word component with highlight animation
const Word: React.FC<{
  word: string;
  index: number;
  totalWords: number;
  progress: number;
  style: (typeof SECTION_STYLES)[Section];
  isChorus: boolean;
}> = ({ word, index, totalWords, progress, style, isChorus }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate if this word should be highlighted
  const wordProgress = index / totalWords;
  const isActive = progress >= wordProgress && progress < (index + 1) / totalWords;
  const isPast = progress >= (index + 1) / totalWords;

  // Entrance animation for each word
  const entranceDelay = index * 2;
  const entrance = spring({
    frame: frame - entranceDelay,
    fps,
    config: { damping: 200, stiffness: 150 },
  });

  // Highlight pulse
  const highlightScale = isActive
    ? spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 200 },
      }) * 0.1 + 1
    : 1;

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [20, 0]);

  // Color transition
  const color = isActive
    ? style.highlightColor
    : isPast
      ? style.color
      : `${style.color}99`;

  // Glow effect for active word
  const textShadow = isActive
    ? `0 0 20px ${style.glowColor}, 0 0 40px ${style.glowColor}60`
    : isPast
      ? `0 0 10px ${style.glowColor}30`
      : "none";

  return (
    <span
      style={{
        display: "inline-block",
        color,
        opacity,
        transform: `translateY(${translateY}px) scale(${highlightScale})`,
        textShadow,
        transition: "color 0.1s ease",
        marginRight: "0.3em",
        fontWeight: isActive ? 700 : 600,
      }}
    >
      {word}
    </span>
  );
};

// Main lyric line component
export const LyricLine: React.FC<{
  text: string;
  section: Section;
  lineProgress: number;
}> = ({ text, section, lineProgress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const style = SECTION_STYLES[section];
  const words = text.split(" ");
  const isChorus = section === "chorus";

  // Line entrance animation
  const lineEntrance = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 100 },
  });

  const lineOpacity = interpolate(lineEntrance, [0, 1], [0, 1]);
  const lineScale = interpolate(lineEntrance, [0, 1], [0.95, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 80px",
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: style.fontSize,
          textAlign: "center",
          lineHeight: 1.3,
          opacity: lineOpacity,
          transform: `scale(${lineScale}) ${style.transform}`,
          letterSpacing: isChorus ? "0.05em" : "0.02em",
          textTransform: "uppercase",
        }}
      >
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            index={index}
            totalWords={words.length}
            progress={lineProgress}
            style={style}
            isChorus={isChorus}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Title display for intro/outro
export const TitleDisplay: React.FC<{
  title: string;
  subtitle?: string;
}> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 80 },
  });

  const subtitleEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 200, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily,
            fontSize: 96,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            margin: 0,
            opacity: titleEntrance,
            transform: `translateY(${interpolate(titleEntrance, [0, 1], [40, 0])}px)`,
            textShadow: "0 0 60px #e9456080, 0 0 120px #e9456040",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontFamily,
              fontSize: 32,
              color: "#e94560",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              marginTop: 20,
              opacity: subtitleEntrance,
              transform: `translateY(${interpolate(subtitleEntrance, [0, 1], [20, 0])}px)`,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </AbsoluteFill>
  );
};
