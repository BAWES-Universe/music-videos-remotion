import type { SongConfig } from "../../types/SongConfig";

export const lightspeedConfig: SongConfig = {
  // Metadata
  id: "Lightspeed",
  title: "Lightspeed",
  subtitle: "I was born to run — at lightspeed",

  // Files
  audioFile: "lightspeed/audio.mp3",
  srtFile: "lightspeed/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 120,

  // Visual theme - speed, energy, neon
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0a0814",
        bg2: "#12101c",
        bg3: "#1a1428",
        accent: "#f97316",
      },
      verse: {
        bg1: "#0c0a18",
        bg2: "#141020",
        bg3: "#1c1830",
        accent: "#fb923c",
      },
      "pre-chorus": {
        bg1: "#0e0c1a",
        bg2: "#161224",
        bg3: "#201a38",
        accent: "#fbbf24",
      },
      chorus: {
        bg1: "#100a18",
        bg2: "#181020",
        bg3: "#241830",
        accent: "#fcd34d",
      },
      bridge: {
        bg1: "#0c0a18",
        bg2: "#141020",
        bg3: "#1c1830",
        accent: "#fde047",
      },
      outro: {
        bg1: "#0a0814",
        bg2: "#12101c",
        bg3: "#1a1428",
        accent: "#f97316",
      },
    },
    particleColors: {
      default: "#fb923c",
      chorus: "#fcd34d",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#fbbf24",
    secondaryColor: "#f97316",
    opacity: 0.7,
  },

  timingCorrections: {},
};
