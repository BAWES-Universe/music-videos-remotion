import type { SongConfig } from "../../types/SongConfig";

export const razorWireConfig: SongConfig = {
  // Metadata
  id: "Razor-Wire",
  title: "Razor Wire",
  subtitle: "Tangled in your own desire",

  // Files
  audioFile: "razor-wire/audio.mp3",
  srtFile: "razor-wire/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 287,

  // Visual theme — industrial, metal, razor, phoenix
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0a0808",
        bg2: "#120c0c",
        bg3: "#1c1414",
        accent: "#71717a",
      },
      verse: {
        bg1: "#0c0808",
        bg2: "#14100c",
        bg3: "#1e1814",
        accent: "#a1a1aa",
      },
      "pre-chorus": {
        bg1: "#0e0808",
        bg2: "#16100c",
        bg3: "#221814",
        accent: "#dc2626",
      },
      chorus: {
        bg1: "#100808",
        bg2: "#1a100c",
        bg3: "#261814",
        accent: "#ef4444",
      },
      bridge: {
        bg1: "#0c0808",
        bg2: "#14100c",
        bg3: "#1e1814",
        accent: "#78716c",
      },
      outro: {
        bg1: "#0a0808",
        bg2: "#120c0c",
        bg3: "#1c1414",
        accent: "#71717a",
      },
    },
    particleColors: {
      default: "#a1a1aa",
      chorus: "#ef4444",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#ef4444",
    secondaryColor: "#71717a",
    opacity: 0.65,
  },

  timingCorrections: {},
};
