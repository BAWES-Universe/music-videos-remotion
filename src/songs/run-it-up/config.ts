import type { SongConfig } from "../../types/SongConfig";

export const runItUpConfig: SongConfig = {
  // Metadata
  id: "Run-It-Up",
  title: "Run It Up",
  subtitle: "We don't stop till we're at the top",

  // Files
  audioFile: "run-it-up/audio.mp3",
  srtFile: "run-it-up/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 165,
  introOffsetSeconds: 3,

  // Visual theme — green/emerald, "run it up" / money / climb, distinct from other songs
  theme: {
    sectionColors: {
      intro: {
        bg1: "#060c08",
        bg2: "#0c1410",
        bg3: "#121c16",
        accent: "#34d399",
      },
      verse: {
        bg1: "#080e0a",
        bg2: "#0e1612",
        bg3: "#162018",
        accent: "#2dd4bf",
      },
      "pre-chorus": {
        bg1: "#040a08",
        bg2: "#0a1210",
        bg3: "#101a14",
        accent: "#22c55e",
      },
      chorus: {
        bg1: "#061008",
        bg2: "#0c1810",
        bg3: "#142418",
        accent: "#10b981",
      },
      bridge: {
        bg1: "#080c0a",
        bg2: "#101410",
        bg3: "#181c18",
        accent: "#6ee7b7",
      },
      outro: {
        bg1: "#060c08",
        bg2: "#0c1410",
        bg3: "#121c16",
        accent: "#34d399",
      },
    },
    particleColors: {
      default: "#2dd4bf",
      chorus: "#10b981",
      bridge: "#6ee7b7",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#10b981",
    secondaryColor: "#34d399",
    opacity: 0.7,
  },

  timingCorrections: {},
};
