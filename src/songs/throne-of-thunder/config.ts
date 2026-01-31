import type { SongConfig } from "../../types/SongConfig";

export const throneOfThunderConfig: SongConfig = {
  // Metadata
  id: "Throne-Of-Thunder",
  title: "Throne of Thunder",
  subtitle: "Every strike's a hymn",

  // Files
  audioFile: "throne-of-thunder/audio.mp3",
  srtFile: "throne-of-thunder/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 215,

  // Visual theme — storm, thunder, crown, fire
  theme: {
    sectionColors: {
      intro: {
        bg1: "#080a12",
        bg2: "#0e121a",
        bg3: "#141a24",
        accent: "#a78bfa",
      },
      verse: {
        bg1: "#0a0e14",
        bg2: "#12161e",
        bg3: "#1a1e2a",
        accent: "#818cf8",
      },
      "pre-chorus": {
        bg1: "#0c1018",
        bg2: "#141820",
        bg3: "#1c202c",
        accent: "#c084fc",
      },
      chorus: {
        bg1: "#0e0a14",
        bg2: "#16121c",
        bg3: "#201a28",
        accent: "#fbbf24",
      },
      bridge: {
        bg1: "#0a0e14",
        bg2: "#12161e",
        bg3: "#1a1e2a",
        accent: "#c084fc",
      },
      outro: {
        bg1: "#080a12",
        bg2: "#0e121a",
        bg3: "#141a24",
        accent: "#a78bfa",
      },
    },
    particleColors: {
      default: "#818cf8",
      chorus: "#fbbf24",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#fbbf24",
    secondaryColor: "#a78bfa",
    opacity: 0.65,
  },

  timingCorrections: {},
};
