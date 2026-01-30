import type { SongConfig } from "../../types/SongConfig";

export const pressureButIDontBreakConfig: SongConfig = {
  // Metadata
  id: "PressureButIDontBreak",
  title: "Pressure — But I Don't Break",
  subtitle: "Carry Suns, Carry Storms",

  // Files
  audioFile: "pressure-but-i-dont-break/audio.mp3",
  srtFile: "pressure-but-i-dont-break/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 174,

  // Visual theme - warm, resilient, sun/storms vibe
  theme: {
    sectionColors: {
      verse: {
        bg1: "#1a0f0a",
        bg2: "#2d1810",
        bg3: "#3d2215",
        accent: "#f59e0b",
      },
      chorus: {
        bg1: "#2d1510",
        bg2: "#4a1f15",
        bg3: "#6b2a1a",
        accent: "#f97316",
      },
      bridge: {
        bg1: "#0f1419",
        bg2: "#1a2433",
        bg3: "#243447",
        accent: "#38bdf8",
      },
      outro: {
        bg1: "#1a1510",
        bg2: "#2d2215",
        bg3: "#3d2a18",
        accent: "#fbbf24",
      },
    },
    particleColors: {
      default: "#f59e0b",
      chorus: "#f97316",
      bridge: "#38bdf8",
    },
  },

  // Audio visualization - warm, energetic
  visualization: {
    style: "full",
    primaryColor: "#f97316",
    secondaryColor: "#fbbf24",
    opacity: 0.7,
  },

  timingCorrections: {},
};
