import type { SongConfig } from "../../types/SongConfig";

export const mouthFullOfClocksConfig: SongConfig = {
  // Metadata
  id: "Mouth-Full-Of-Clocks",
  title: "Mouth Full of Clocks",
  subtitle: "Time doesn't move it just leans",

  // Files
  audioFile: "mouth-full-of-clocks/audio.mp3",
  srtFile: "mouth-full-of-clocks/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 205,
  introOffsetSeconds: 3,

  // Visual theme — time, clocks, fragmented (slate + copper, surreal)
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0e0c0e",
        bg2: "#161416",
        bg3: "#201c20",
        accent: "#b45309",
      },
      verse: {
        bg1: "#100e10",
        bg2: "#1a161a",
        bg3: "#262226",
        accent: "#d97706",
      },
      "pre-chorus": {
        bg1: "#0c0a0e",
        bg2: "#141216",
        bg3: "#1e1a20",
        accent: "#ea580c",
      },
      chorus: {
        bg1: "#120e0c",
        bg2: "#1c1612",
        bg3: "#2a221a",
        accent: "#f59e0b",
      },
      bridge: {
        bg1: "#0e0c10",
        bg2: "#16141a",
        bg3: "#221e26",
        accent: "#78716c",
      },
      outro: {
        bg1: "#0e0c0e",
        bg2: "#161416",
        bg3: "#201c20",
        accent: "#b45309",
      },
    },
    particleColors: {
      default: "#d97706",
      chorus: "#f59e0b",
      bridge: "#78716c",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#d97706",
    secondaryColor: "#f59e0b",
    opacity: 0.65,
  },

  timingCorrections: {},
};
