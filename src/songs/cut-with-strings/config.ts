import type { SongConfig } from "../../types/SongConfig";

export const cutWithStringsConfig: SongConfig = {
  // Metadata
  id: "Cut-With-Strings",
  title: "Cut With Strings",
  subtitle: "I cut clean through the noise",

  // Files
  audioFile: "cut-with-strings/audio.mp3",
  srtFile: "cut-with-strings/lyrics.srt",

  // ~1 min (lyrics end ~0:57; fallback, auto-detected from audio in Root)
  durationSeconds: 60,

  // Visual theme — sharp, minimal, blade/string; cold greys and one sharp accent
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0a0a0c",
        bg2: "#121216",
        bg3: "#1a1a1f",
        accent: "#a1a1aa",
      },
      verse: {
        bg1: "#0c0c0f",
        bg2: "#141418",
        bg3: "#1c1c22",
        accent: "#a1a1aa",
      },
      "pre-chorus": {
        bg1: "#0a0a0e",
        bg2: "#12121a",
        bg3: "#1a1a24",
        accent: "#d4d4d8",
      },
      chorus: {
        bg1: "#08080c",
        bg2: "#101018",
        bg3: "#181820",
        accent: "#e4e4e7",
      },
      bridge: {
        bg1: "#0a0a0c",
        bg2: "#121216",
        bg3: "#1a1a1f",
        accent: "#a1a1aa",
      },
      outro: {
        bg1: "#08080a",
        bg2: "#0f0f12",
        bg3: "#16161a",
        accent: "#71717a",
      },
    },
    particleColors: {
      default: "#a1a1aa",
      chorus: "#e4e4e7",
      bridge: "#d4d4d8",
    },
  },

  visualization: {
    style: "full",
    primaryColor: "#a1a1aa",
    secondaryColor: "#71717a",
    opacity: 0.55,
  },

  timingCorrections: {},
};
