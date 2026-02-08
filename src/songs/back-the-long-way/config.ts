import type { SongConfig } from "../../types/SongConfig";

export const backTheLongWayConfig: SongConfig = {
  // Metadata
  id: "BackTheLongWay",
  title: "Back the Long Way",
  subtitle: "I took the long way back",

  // Files
  audioFile: "back-the-long-way/audio.mp3",
  srtFile: "back-the-long-way/lyrics.srt",

  // Duration: 2:53
  durationSeconds: 60 * 2 + 53,

  // Visual theme - road, journey, fire; warm amber and deep reds
  theme: {
    sectionColors: {
      verse: {
        bg1: "#1a0f0a",
        bg2: "#2d1810",
        bg3: "#3d2215",
        accent: "#e85d04",
      },
      "pre-chorus": {
        bg1: "#251510",
        bg2: "#3d2018",
        bg3: "#4a281e",
        accent: "#f39422",
      },
      chorus: {
        bg1: "#2d0f14",
        bg2: "#5c1a1a",
        bg3: "#7f1d1d",
        accent: "#dc2626",
      },
      bridge: {
        bg1: "#0d0a08",
        bg2: "#1a1410",
        bg3: "#2d2218",
        accent: "#f59e0b",
      },
      outro: {
        bg1: "#1a0f0a",
        bg2: "#2d1810",
        bg3: "#3d2215",
        accent: "#e85d04",
      },
    },
    particleColors: {
      default: "#e85d04",
      chorus: "#dc2626",
      bridge: "#f59e0b",
    },
  },

  visualization: {
    style: "full",
    primaryColor: "#e85d04",
    secondaryColor: "#dc2626",
    opacity: 0.65,
  },

  timingCorrections: {},
  /** Title shows 3s before first lyric (first lyric at ~0.2s) */
  introOffsetSeconds: 3,
};
