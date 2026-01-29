import type { LyricLine } from "../lyrics/parseLyrics";

export type Section = LyricLine["section"];

// Timing correction for a specific lyric line
export type TimingCorrection = {
  startMs?: number;      // Absolute start time in ms
  startOffset?: number;  // Offset to add to SRT start time
  duration?: number;     // Fixed duration in ms
};

// Color palette for visual theme
export type ColorPalette = {
  bg1: string;
  bg2: string;
  bg3: string;
  accent: string;
};

// Audio visualization style
export type VisualizerStyle = "none" | "radial" | "bars" | "wave" | "full";

// Audio visualization config
export type VisualizationConfig = {
  style: VisualizerStyle;
  primaryColor?: string;   // Main visualizer color (defaults to theme accent)
  secondaryColor?: string; // Secondary/gradient color
  opacity?: number;        // 0-1, default 0.8
};

// Full song configuration
export type SongConfig = {
  // Metadata
  id: string;
  title: string;
  subtitle?: string;
  
  // Files (relative to public folder)
  audioFile: string;
  srtFile: string;
  
  // Duration
  durationSeconds: number;
  
  // Visual theme - can use preset name or custom palettes
  theme?: {
    // Override section colors (optional - uses defaults if not specified)
    sectionColors?: Partial<Record<Section, ColorPalette>>;
    // Particle color overrides
    particleColors?: {
      default?: string;
      chorus?: string;
      bridge?: string;
    };
  };
  
  // Audio visualization (optional)
  visualization?: VisualizationConfig;
  
  // Timing corrections for specific lyrics (keyed by exact lyric text)
  // Only applied to first occurrence of each lyric
  timingCorrections?: Record<string, TimingCorrection>;
};

// Default section colors (industrial/brick theme)
export const DEFAULT_SECTION_COLORS: Record<Section, ColorPalette> = {
  intro: {
    bg1: "#0a0a0f",
    bg2: "#1a1a2e",
    bg3: "#16213e",
    accent: "#e94560",
  },
  verse: {
    bg1: "#1a1a2e",
    bg2: "#16213e",
    bg3: "#0f3460",
    accent: "#e94560",
  },
  "pre-chorus": {
    bg1: "#16213e",
    bg2: "#1f4068",
    bg3: "#1b1b2f",
    accent: "#f39422",
  },
  chorus: {
    bg1: "#2d132c",
    bg2: "#801336",
    bg3: "#c72c41",
    accent: "#ee4540",
  },
  bridge: {
    bg1: "#0d0d0d",
    bg2: "#1a1a1a",
    bg3: "#2d2d2d",
    accent: "#f5af19",
  },
  outro: {
    bg1: "#1a1a2e",
    bg2: "#16213e",
    bg3: "#0f3460",
    accent: "#a855f7",
  },
};

// Helper to get section colors for a song (merges defaults with overrides)
export const getSectionColors = (config: SongConfig): Record<Section, ColorPalette> => {
  if (!config.theme?.sectionColors) {
    return DEFAULT_SECTION_COLORS;
  }
  
  return {
    ...DEFAULT_SECTION_COLORS,
    ...config.theme.sectionColors,
  } as Record<Section, ColorPalette>;
};

// Helper to get particle colors
export const getParticleColors = (config: SongConfig, section: Section): string => {
  const particleColors = config.theme?.particleColors;
  
  if (section === "chorus" && particleColors?.chorus) {
    return particleColors.chorus;
  }
  if (section === "bridge" && particleColors?.bridge) {
    return particleColors.bridge;
  }
  
  return particleColors?.default ?? "#e94560";
};
