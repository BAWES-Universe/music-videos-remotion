import type { SongConfig } from "../../types/SongConfig";

export const gravityWontHoldMeConfig: SongConfig = {
  // Metadata
  id: "Gravity-Wont-Hold-Me",
  title: "Gravity Won't Hold Me",
  subtitle: "I was born to break away",

  // Files
  audioFile: "gravity-wont-holdme/audio.mp3",
  srtFile: "gravity-wont-holdme/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 140,

  // Visual theme — sky, flight, storm
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0a0e18",
        bg2: "#121a2a",
        bg3: "#1a2438",
        accent: "#7dd3fc",
      },
      verse: {
        bg1: "#0d1220",
        bg2: "#151d30",
        bg3: "#1e2a42",
        accent: "#38bdf8",
      },
      "pre-chorus": {
        bg1: "#0f1424",
        bg2: "#181f34",
        bg3: "#222d48",
        accent: "#818cf8",
      },
      chorus: {
        bg1: "#121828",
        bg2: "#1a2240",
        bg3: "#262d52",
        accent: "#f59e0b",
      },
      bridge: {
        bg1: "#0d1220",
        bg2: "#151d30",
        bg3: "#1e2a42",
        accent: "#c084fc",
      },
      outro: {
        bg1: "#0a0e18",
        bg2: "#121a2a",
        bg3: "#1a2438",
        accent: "#7dd3fc",
      },
    },
    particleColors: {
      default: "#38bdf8",
      chorus: "#f59e0b",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#f59e0b",
    secondaryColor: "#38bdf8",
    opacity: 0.65,
  },

  timingCorrections: {},
};
