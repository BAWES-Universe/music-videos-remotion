import type { SongConfig } from "../../types/SongConfig";

export const cameThroughTheNoiseConfig: SongConfig = {
  // Metadata
  id: "CameThroughTheNoise",
  title: "Came Through the Noise",
  subtitle: "I was already around",

  // Files
  audioFile: "came-through-the-noise/audio.mp3",
  srtFile: "came-through-the-noise/lyrics.srt",

  // Duration: 2:27
  durationSeconds: 60 * 2 + 27,

  // Visual theme - urban motion, sirens, momentum; cool blues and electric accent
  theme: {
    sectionColors: {
      verse: {
        bg1: "#0a0e14",
        bg2: "#121a28",
        bg3: "#1a2438",
        accent: "#3b82f6",
      },
      "pre-chorus": {
        bg1: "#0f1419",
        bg2: "#1a2438",
        bg3: "#243047",
        accent: "#60a5fa",
      },
      chorus: {
        bg1: "#0c1220",
        bg2: "#1e3a5f",
        bg3: "#2563eb",
        accent: "#38bdf8",
      },
      bridge: {
        bg1: "#050810",
        bg2: "#0f172a",
        bg3: "#1e293b",
        accent: "#22d3ee",
      },
      outro: {
        bg1: "#0a0e14",
        bg2: "#121a28",
        bg3: "#1a2438",
        accent: "#3b82f6",
      },
    },
    particleColors: {
      default: "#3b82f6",
      chorus: "#38bdf8",
      bridge: "#22d3ee",
    },
  },

  visualization: {
    style: "full",
    primaryColor: "#3b82f6",
    secondaryColor: "#38bdf8",
    opacity: 0.65,
  },

  timingCorrections: {},
};
