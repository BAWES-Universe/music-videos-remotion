import type { SongConfig } from "../../types/SongConfig";

export const upwardPressureConfig: SongConfig = {
  // Metadata
  id: "Upward-Pressure",
  title: "Upward Pressure",
  subtitle: "No ceiling. Just weather.",

  // Files
  audioFile: "upward-pressure/audio.mp3",
  srtFile: "upward-pressure/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 160,

  // Visual theme — cool family with clear section variation (depth, hue, intensity)
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0a0e14",
        bg2: "#101820",
        bg3: "#1a2432",
        accent: "#7dd3fc",
      },
      verse: {
        bg1: "#0c1018",
        bg2: "#141c28",
        bg3: "#1e2a3a",
        accent: "#38bdf8",
      },
      "pre-chorus": {
        bg1: "#080c14",
        bg2: "#0e1622",
        bg3: "#162030",
        accent: "#22d3ee",
      },
      chorus: {
        bg1: "#061018",
        bg2: "#0c1824",
        bg3: "#142438",
        accent: "#67e8f9",
      },
      bridge: {
        bg1: "#0e0c18",
        bg2: "#16142a",
        bg3: "#201c38",
        accent: "#a78bfa",
      },
      outro: {
        bg1: "#0a0e14",
        bg2: "#101820",
        bg3: "#1a2432",
        accent: "#7dd3fc",
      },
    },
    particleColors: {
      default: "#38bdf8",
      chorus: "#67e8f9",
      bridge: "#a78bfa",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#22d3ee",
    secondaryColor: "#38bdf8",
    opacity: 0.7,
  },

  timingCorrections: {},
};
