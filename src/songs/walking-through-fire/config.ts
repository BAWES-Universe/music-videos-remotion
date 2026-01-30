import type { SongConfig } from "../../types/SongConfig";

export const walkingThroughFireConfig: SongConfig = {
  // Metadata
  id: "Walking-Through-Fire",
  title: "Walking Through Fire",
  subtitle: "I've never felt so warm",

  // Files
  audioFile: "walking-through-fire/audio.mp3",
  srtFile: "walking-through-fire/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 200,

  // Visual theme - fire, warmth, transformation
  theme: {
    sectionColors: {
      intro: {
        bg1: "#1a0a08",
        bg2: "#2a1210",
        bg3: "#3a1814",
        accent: "#f97316",
      },
      verse: {
        bg1: "#1c0c0a",
        bg2: "#2e1412",
        bg3: "#401a16",
        accent: "#fb923c",
      },
      "pre-chorus": {
        bg1: "#1e0a0c",
        bg2: "#301214",
        bg3: "#421a1c",
        accent: "#f87171",
      },
      chorus: {
        bg1: "#200a08",
        bg2: "#321210",
        bg3: "#461816",
        accent: "#fcd34d",
      },
      bridge: {
        bg1: "#1c0c0a",
        bg2: "#2e1412",
        bg3: "#401a16",
        accent: "#fbbf24",
      },
      outro: {
        bg1: "#1a0a08",
        bg2: "#2a1210",
        bg3: "#3a1814",
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
    primaryColor: "#f97316",
    secondaryColor: "#fcd34d",
    opacity: 0.7,
  },

  timingCorrections: {},
};
