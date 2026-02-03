import type { SongConfig } from "../../types/SongConfig";

export const infiniteResponsibilityConfig: SongConfig = {
  // Metadata
  id: "Infinite-Responsibility",
  title: "Infinite Responsibility",
  subtitle: "The more we rise, the more we owe",

  // Files
  audioFile: "infinite-responsibility/audio.mp3",
  srtFile: "infinite-responsibility/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 208,

  // Visual theme — responsibility, calling, choice, garden
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0c0f0a",
        bg2: "#141a12",
        bg3: "#1c2418",
        accent: "#65a30d",
      },
      verse: {
        bg1: "#0e120c",
        bg2: "#161c14",
        bg3: "#202618",
        accent: "#84cc16",
      },
      "pre-chorus": {
        bg1: "#10140c",
        bg2: "#181e14",
        bg3: "#242a1a",
        accent: "#a16207",
      },
      chorus: {
        bg1: "#0a1208",
        bg2: "#121a10",
        bg3: "#1a2414",
        accent: "#ca8a04",
      },
      bridge: {
        bg1: "#0e120c",
        bg2: "#161c14",
        bg3: "#202618",
        accent: "#78716c",
      },
      outro: {
        bg1: "#0c0f0a",
        bg2: "#141a12",
        bg3: "#1c2418",
        accent: "#65a30d",
      },
    },
    particleColors: {
      default: "#84cc16",
      chorus: "#ca8a04",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#ca8a04",
    secondaryColor: "#65a30d",
    opacity: 0.65,
  },

  timingCorrections: {},
};
