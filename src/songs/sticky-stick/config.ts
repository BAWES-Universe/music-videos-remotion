import type { SongConfig } from "../../types/SongConfig";

export const stickyStickConfig: SongConfig = {
  // Metadata
  id: "Sticky-Stick",
  title: "Sticky Stick",
  subtitle: "Poke. Prod. Pop.",

  // Files
  audioFile: "sticky-stick/audio.mp3",
  srtFile: "sticky-stick/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 125,

  // Visual theme — sticky note, playful, pranks
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0f0e0a",
        bg2: "#1a1812",
        bg3: "#242018",
        accent: "#eab308",
      },
      verse: {
        bg1: "#120f0a",
        bg2: "#1c1812",
        bg3: "#262218",
        accent: "#facc15",
      },
      "pre-chorus": {
        bg1: "#14100a",
        bg2: "#1e1a12",
        bg3: "#2a2418",
        accent: "#fbbf24",
      },
      chorus: {
        bg1: "#181208",
        bg2: "#221a10",
        bg3: "#2e2618",
        accent: "#fde047",
      },
      bridge: {
        bg1: "#120f0a",
        bg2: "#1c1812",
        bg3: "#262218",
        accent: "#f59e0b",
      },
      outro: {
        bg1: "#0f0e0a",
        bg2: "#1a1812",
        bg3: "#242018",
        accent: "#eab308",
      },
    },
    particleColors: {
      default: "#facc15",
      chorus: "#fde047",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#fde047",
    secondaryColor: "#eab308",
    opacity: 0.65,
  },

  timingCorrections: {},
};
