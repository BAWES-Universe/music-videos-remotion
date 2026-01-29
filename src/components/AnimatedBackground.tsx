import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { type Section, type ColorPalette, DEFAULT_SECTION_COLORS } from "../types/SongConfig";

type SectionColors = Record<Section, ColorPalette>;

// Floating brick/block shapes
const FloatingBrick: React.FC<{
  index: number;
  colors: ColorPalette;
}> = ({ index, colors }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  // Each brick has unique properties based on index
  const seed = index * 137.5;
  const baseX = ((seed * 7) % 100) * (width / 100);
  const baseY = ((seed * 11) % 100) * (height / 100);
  const size = 20 + ((seed * 3) % 60);
  const rotationSpeed = 0.1 + ((seed * 0.01) % 0.3);
  const floatSpeed = 0.02 + ((seed * 0.005) % 0.03);
  const floatAmplitude = 20 + ((seed * 2) % 40);

  // Animate position and rotation
  const rotation = frame * rotationSpeed;
  const floatOffset = Math.sin(frame * floatSpeed) * floatAmplitude;
  const driftX = Math.sin(frame * 0.01 + seed) * 30;

  // Opacity based on position in video
  const opacity = interpolate(
    frame,
    [0, 30, durationInFrames - 30, durationInFrames],
    [0, 0.15 + ((index % 3) * 0.05), 0.15 + ((index % 3) * 0.05), 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: baseX + driftX,
        top: baseY + floatOffset,
        width: size,
        height: size * 0.6,
        backgroundColor: colors.accent,
        opacity,
        transform: `rotate(${rotation}deg)`,
        borderRadius: 4,
        boxShadow: `0 0 ${size / 2}px ${colors.accent}40`,
      }}
    />
  );
};

// Animated gradient background
export const AnimatedBackground: React.FC<{
  section: Section;
  sectionProgress: number;
  sectionColors?: SectionColors;
}> = ({ section, sectionProgress, sectionColors = DEFAULT_SECTION_COLORS }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const colors = sectionColors[section];

  // Gradient animation
  const gradientAngle = interpolate(frame, [0, 10 * fps], [135, 225], {
    extrapolateRight: "extend",
  });

  // Pulse effect for chorus
  const pulseScale =
    section === "chorus"
      ? 1 + Math.sin(frame * 0.1) * 0.02
      : 1;

  // Vignette intensity
  const vignetteIntensity = section === "bridge" ? 0.8 : 0.5;

  return (
    <AbsoluteFill>
      {/* Main gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(${gradientAngle}deg, ${colors.bg1} 0%, ${colors.bg2} 50%, ${colors.bg3} 100%)`,
          transform: `scale(${pulseScale})`,
        }}
      />

      {/* Floating bricks */}
      {Array.from({ length: 12 }).map((_, i) => (
        <FloatingBrick key={i} index={i} colors={colors} />
      ))}

      {/* Radial overlay for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 0%, ${colors.bg1}${Math.round(vignetteIntensity * 255).toString(16).padStart(2, "0")} 100%)`,
        }}
      />

      {/* Noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Bottom gradient for lyric readability */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: `linear-gradient(to top, ${colors.bg1}ee 0%, transparent 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
