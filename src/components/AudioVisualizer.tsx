import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";

const REF_WIDTH = 1920;

type VisualizerStyle = "radial" | "bars" | "wave" | "full";

type AudioVisualizerProps = {
  audioSrc: string;
  style?: VisualizerStyle;
  primaryColor?: string;
  secondaryColor?: string;
  opacity?: number;
};

// Radial/circular frequency visualizer
const RadialVisualizer: React.FC<{
  frequencyData: number[];
  primaryColor: string;
  secondaryColor: string;
  opacity: number;
}> = ({ frequencyData, primaryColor, secondaryColor, opacity }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const scale = width / REF_WIDTH;

  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = Math.min(width, height) * 0.15;
  const maxBarHeight = Math.min(width, height) * 0.25;

  // Use more bars for smoother look (bar width scales with resolution)
  const numBars = 64;
  const barWidth = 4 * scale;

  // Sample frequency data to match our bar count
  const sampledData = useMemo(() => {
    const result: number[] = [];
    const step = frequencyData.length / numBars;
    for (let i = 0; i < numBars; i++) {
      const idx = Math.floor(i * step);
      // Apply some smoothing and boost bass frequencies
      const boost = i < numBars / 4 ? 1.5 : 1;
      result.push(Math.min(1, (frequencyData[idx] || 0) * boost));
    }
    return result;
  }, [frequencyData, numBars]);

  // Slow rotation
  const rotation = frame * 0.2;

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity,
      }}
    >
      {/* Glow effect behind (blur scales with resolution) */}
      <div
        style={{
          position: "absolute",
          left: centerX,
          top: centerY,
          width: baseRadius * 4,
          height: baseRadius * 4,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${primaryColor}40 0%, transparent 70%)`,
          filter: `blur(${40 * scale}px)`,
        }}
      />

      {/* Inner circle glow */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={4 * scale} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>

        {/* Inner pulsing circle (stroke scales with resolution) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={baseRadius * 0.8 + sampledData.slice(0, 8).reduce((a, b) => a + b, 0) * 10 * scale}
          fill="none"
          stroke={primaryColor}
          strokeWidth={2 * scale}
          opacity={0.6}
          filter="url(#glow)"
        />

        {/* Frequency bars radiating outward */}
        <g transform={`rotate(${rotation}, ${centerX}, ${centerY})`}>
          {sampledData.map((value, i) => {
            const angle = (i / numBars) * Math.PI * 2 - Math.PI / 2;
            const barHeight = value * maxBarHeight + 5 * scale;

            const x1 = centerX + Math.cos(angle) * baseRadius;
            const y1 = centerY + Math.sin(angle) * baseRadius;
            const x2 = centerX + Math.cos(angle) * (baseRadius + barHeight);
            const y2 = centerY + Math.sin(angle) * (baseRadius + barHeight);

            // Color based on frequency (bass = primary, treble = secondary)
            const colorMix = i / numBars;
            const barOpacity = 0.4 + value * 0.6;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={`url(#barGradient)`}
                strokeWidth={barWidth}
                strokeLinecap="round"
                opacity={barOpacity}
                filter="url(#glow)"
              />
            );
          })}
        </g>

        {/* Mirror bars (inner) for symmetry (stroke scales with resolution) */}
        <g transform={`rotate(${-rotation * 0.5}, ${centerX}, ${centerY})`}>
          {sampledData.map((value, i) => {
            const angle = (i / numBars) * Math.PI * 2 - Math.PI / 2;
            const barHeight = value * maxBarHeight * 0.4 + 2 * scale;

            const x1 = centerX + Math.cos(angle) * (baseRadius * 0.7);
            const y1 = centerY + Math.sin(angle) * (baseRadius * 0.7);
            const x2 = centerX + Math.cos(angle) * (baseRadius * 0.7 - barHeight);
            const y2 = centerY + Math.sin(angle) * (baseRadius * 0.7 - barHeight);

            return (
              <line
                key={`inner-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={secondaryColor}
                strokeWidth={2 * scale}
                strokeLinecap="round"
                opacity={0.3 + value * 0.4}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

// Horizontal bar visualizer (bottom of screen, scales with resolution)
const BarVisualizer: React.FC<{
  frequencyData: number[];
  primaryColor: string;
  secondaryColor: string;
  opacity: number;
}> = ({ frequencyData, primaryColor, secondaryColor, opacity }) => {
  const { width, height } = useVideoConfig();
  const scale = width / REF_WIDTH;

  const numBars = 64;
  const barWidth = width / numBars - 2 * scale;
  const maxHeight = height * 0.15;

  const sampledData = useMemo(() => {
    const result: number[] = [];
    const step = frequencyData.length / numBars;
    for (let i = 0; i < numBars; i++) {
      const idx = Math.floor(i * step);
      result.push(frequencyData[idx] || 0);
    }
    return result;
  }, [frequencyData, numBars]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: maxHeight + 20 * scale,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 2 * scale,
        opacity,
      }}
    >
      {sampledData.map((value, i) => {
        const barHeight = Math.max(4 * scale, value * maxHeight);

        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: barHeight,
              background: `linear-gradient(to top, ${primaryColor}, ${secondaryColor})`,
              borderRadius: `${2 * scale}px ${2 * scale}px 0 0`,
              boxShadow: `0 0 ${(10 + value * 20) * scale}px ${primaryColor}60`,
              opacity: 0.5 + value * 0.5,
            }}
          />
        );
      })}
    </div>
  );
};

// Wave visualizer (ambient background wave, scales with resolution)
const WaveVisualizer: React.FC<{
  frequencyData: number[];
  primaryColor: string;
  secondaryColor: string;
  opacity: number;
}> = ({ frequencyData, primaryColor, secondaryColor, opacity }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const scale = width / REF_WIDTH;

  // Create multiple wave layers
  const waves = useMemo(() => {
    const result: string[] = [];
    const numWaves = 3;

    for (let w = 0; w < numWaves; w++) {
      const points: string[] = [];
      const numPoints = 100;
      const waveOffset = w * 0.3;
      const waveSpeed = 0.02 + w * 0.01;

      for (let i = 0; i <= numPoints; i++) {
        const x = (i / numPoints) * width;
        const freqIdx = Math.floor((i / numPoints) * (frequencyData.length - 1));
        const freqValue = frequencyData[freqIdx] || 0;

        // Combine sine wave with frequency data
        const baseY = height * 0.5;
        const waveY =
          Math.sin((i / numPoints) * Math.PI * 4 + frame * waveSpeed + waveOffset) *
          (30 + freqValue * 80) * scale;
        const y = baseY + waveY;

        points.push(`${x},${y}`);
      }

      result.push(points.join(" "));
    }

    return result;
  }, [frequencyData, frame, width, height, scale]);

  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", top: 0, left: 0, opacity }}
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.3} />
          <stop offset="50%" stopColor={secondaryColor} stopOpacity={0.5} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity={0.3} />
        </linearGradient>
        <filter id="waveGlow">
          <feGaussianBlur stdDeviation={8 * scale} />
        </filter>
      </defs>

      {waves.map((points, i) => (
        <polyline
          key={i}
          points={points}
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth={(3 - i) * scale}
          opacity={0.4 - i * 0.1}
          filter="url(#waveGlow)"
        />
      ))}
    </svg>
  );
};

// Reactive particles that respond to bass (scale with resolution)
const ReactiveParticles: React.FC<{
  frequencyData: number[];
  primaryColor: string;
  opacity: number;
}> = ({ frequencyData, primaryColor, opacity }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const scale = width / REF_WIDTH;

  // Get bass level (average of low frequencies)
  const bassLevel = useMemo(() => {
    const bassFreqs = frequencyData.slice(0, Math.floor(frequencyData.length / 8));
    return bassFreqs.reduce((a, b) => a + b, 0) / bassFreqs.length;
  }, [frequencyData]);

  // Generate particles
  const particles = useMemo(() => {
    const result: Array<{ x: number; y: number; size: number; speed: number; offset: number }> = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      const seed = i * 137.5;
      result.push({
        x: ((seed * 7.3) % 100) / 100,
        y: ((seed * 11.7) % 100) / 100,
        size: 2 + (seed % 6),
        speed: 0.5 + (seed % 1),
        offset: seed,
      });
    }

    return result;
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      {particles.map((p, i) => {
        const pulse = 1 + bassLevel * 2;
        const size = p.size * scale * pulse;
        const x = p.x * width + Math.sin(frame * 0.02 + p.offset) * 50 * scale;
        const y = p.y * height + Math.cos(frame * 0.015 + p.offset) * 30 * scale;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: primaryColor,
              boxShadow: `0 0 ${size * 2}px ${primaryColor}`,
              opacity: 0.3 + bassLevel * 0.5,
            }}
          />
        );
      })}
    </div>
  );
};

// Main AudioVisualizer component
export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  audioSrc,
  style = "full",
  primaryColor = "#ee4540",
  secondaryColor = "#f39422",
  opacity = 0.8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Load audio data
  const audioData = useAudioData(staticFile(audioSrc));

  // Get frequency data for current frame
  const frequencyData = useMemo(() => {
    if (!audioData) return new Array(256).fill(0);

    try {
      return visualizeAudio({
        fps,
        frame,
        audioData,
        numberOfSamples: 256,
      });
    } catch {
      return new Array(256).fill(0);
    }
  }, [audioData, fps, frame]);

  if (!audioData) {
    return null;
  }

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Wave background (subtle) */}
      {(style === "wave" || style === "full") && (
        <WaveVisualizer
          frequencyData={frequencyData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          opacity={opacity * 0.3}
        />
      )}

      {/* Reactive particles */}
      {style === "full" && (
        <ReactiveParticles
          frequencyData={frequencyData}
          primaryColor={primaryColor}
          opacity={opacity * 0.5}
        />
      )}

      {/* Radial visualizer (center) */}
      {(style === "radial" || style === "full") && (
        <RadialVisualizer
          frequencyData={frequencyData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          opacity={opacity}
        />
      )}

      {/* Bar visualizer (bottom) */}
      {(style === "bars" || style === "full") && (
        <BarVisualizer
          frequencyData={frequencyData}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          opacity={opacity * 0.6}
        />
      )}
    </AbsoluteFill>
  );
};
