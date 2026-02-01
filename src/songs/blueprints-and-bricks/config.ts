import type { SongConfig } from "../../types/SongConfig";

export const blueprintsAndBricksConfig: SongConfig = {
  // Metadata
  id: "Blueprints-And-Bricks",
  title: "Blueprints and Bricks",
  subtitle: "Lay the stone... hold the line",

  // Files
  audioFile: "blueprints-and-bricks/audio.mp3",
  srtFile: "blueprints-and-bricks/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 167,

  // Visual theme — blueprint, construction, stone, weight
  theme: {
    sectionColors: {
      intro: {
        bg1: "#080a0f",
        bg2: "#0e121a",
        bg3: "#141a24",
        accent: "#475569",
      },
      verse: {
        bg1: "#0a0c10",
        bg2: "#12161c",
        bg3: "#1a2028",
        accent: "#64748b",
      },
      "pre-chorus": {
        bg1: "#0c0e12",
        bg2: "#14181e",
        bg3: "#1e242e",
        accent: "#94a3b8",
      },
      chorus: {
        bg1: "#0a0e12",
        bg2: "#12181e",
        bg3: "#1c2430",
        accent: "#b45309",
      },
      bridge: {
        bg1: "#0a0c10",
        bg2: "#12161c",
        bg3: "#1a2028",
        accent: "#78716c",
      },
      outro: {
        bg1: "#080a0f",
        bg2: "#0e121a",
        bg3: "#141a24",
        accent: "#475569",
      },
    },
    particleColors: {
      default: "#64748b",
      chorus: "#b45309",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#94a3b8",
    secondaryColor: "#b45309",
    opacity: 0.65,
  },

  timingCorrections: {},
};
