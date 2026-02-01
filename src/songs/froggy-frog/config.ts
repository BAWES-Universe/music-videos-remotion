import type { SongConfig } from "../../types/SongConfig";

export const froggyFrogConfig: SongConfig = {
  // Metadata
  id: "Froggy-Frog",
  title: "Froggy Frog",
  subtitle: "Ribbit-ribbit, swing that thing",

  // Files
  audioFile: "froggy-frog/audio.mp3",
  srtFile: "froggy-frog/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 142,

  // Visual theme — frog, neon, jazz, brass
  theme: {
    sectionColors: {
      intro: {
        bg1: "#080f0a",
        bg2: "#0e1a10",
        bg3: "#142418",
        accent: "#22c55e",
      },
      verse: {
        bg1: "#0a120c",
        bg2: "#101c12",
        bg3: "#18261a",
        accent: "#16a34a",
      },
      "pre-chorus": {
        bg1: "#0c140e",
        bg2: "#121e14",
        bg3: "#1a2a1c",
        accent: "#4ade80",
      },
      chorus: {
        bg1: "#0a180c",
        bg2: "#102214",
        bg3: "#162e1a",
        accent: "#84cc16",
      },
      bridge: {
        bg1: "#0a120c",
        bg2: "#101c12",
        bg3: "#18261a",
        accent: "#eab308",
      },
      outro: {
        bg1: "#080f0a",
        bg2: "#0e1a10",
        bg3: "#142418",
        accent: "#22c55e",
      },
    },
    particleColors: {
      default: "#16a34a",
      chorus: "#84cc16",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#84cc16",
    secondaryColor: "#22c55e",
    opacity: 0.65,
  },

  timingCorrections: {},
};
