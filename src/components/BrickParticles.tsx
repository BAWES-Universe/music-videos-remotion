import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  opacity: number;
  delay: number;
};

const generateParticles = (count: number, seed: number): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const s = (seed + i * 137.5) % 1000;
    particles.push({
      x: (s * 7.3) % 100,
      y: 100 + ((s * 3.7) % 50), // Start below screen
      size: 4 + ((s * 2.1) % 12),
      speed: 0.3 + ((s * 0.1) % 0.5),
      rotation: (s * 17) % 360,
      opacity: 0.1 + ((s * 0.05) % 0.3),
      delay: (s * 0.5) % 100,
    });
  }
  return particles;
};

// Rising brick/dust particles
export const BrickParticles: React.FC<{
  intensity?: number;
  color?: string;
}> = ({ intensity = 1, color = "#e94560" }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  const particles = React.useMemo(
    () => generateParticles(Math.floor(20 * intensity), frame % 1000),
    [intensity]
  );

  // Fade in/out particles over video duration
  const globalOpacity = interpolate(
    frame,
    [0, 60, durationInFrames - 60, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden", opacity: globalOpacity }}>
      {particles.map((particle, i) => {
        const adjustedFrame = Math.max(0, frame - particle.delay);
        const yOffset = adjustedFrame * particle.speed * 2;
        const y = particle.y - (yOffset % 150);
        const rotation = particle.rotation + adjustedFrame * 0.5;

        // Cycle opacity
        const cycleOpacity = Math.sin(adjustedFrame * 0.05 + i) * 0.5 + 0.5;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${particle.x}%`,
              top: `${y}%`,
              width: particle.size,
              height: particle.size * 0.6,
              backgroundColor: color,
              opacity: particle.opacity * cycleOpacity,
              transform: `rotate(${rotation}deg)`,
              borderRadius: 2,
              boxShadow: `0 0 ${particle.size}px ${color}40`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Dramatic particle burst for chorus/bridge
export const ParticleBurst: React.FC<{
  triggerFrame: number;
  color?: string;
}> = ({ triggerFrame, color = "#ee4540" }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const burstFrame = frame - triggerFrame;
  if (burstFrame < 0 || burstFrame > 60) return null;

  const progress = burstFrame / 60;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const distance = interpolate(progress, [0, 1], [0, 400], {
          extrapolateRight: "clamp",
        });
        const x = width / 2 + Math.cos(angle) * distance;
        const y = height / 2 + Math.sin(angle) * distance;
        const opacity = interpolate(progress, [0, 0.5, 1], [1, 0.8, 0], {
          extrapolateRight: "clamp",
        });
        const size = interpolate(progress, [0, 1], [8, 2], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size * 0.6,
              backgroundColor: color,
              opacity,
              borderRadius: 2,
              boxShadow: `0 0 20px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
