import type { SongConfig } from "../../types/SongConfig";

export const theDayTheMusicWonConfig: SongConfig = {
  // Metadata
  id: "The-Day-The-Music-Won",
  title: "The Day the Music Won",
  subtitle: "If the world ends tonight, play it loud",

  // Files
  audioFile: "the-day-the-music-won/audio.mp3",
  srtFile: "the-day-the-music-won/lyrics.srt",

  // Duration: ~2:30 (fallback; auto-detected from audio in Root)
  durationSeconds: 60 * 2 + 30,

  // Visual theme — end-of-world but music wins; dark with warm amber/gold
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0f0a08",
        bg2: "#1a120e",
        bg3: "#261a14",
        accent: "#f59e0b",
      },
      verse: {
        bg1: "#0f0a08",
        bg2: "#1a120e",
        bg3: "#261a14",
        accent: "#fbbf24",
      },
      "pre-chorus": {
        bg1: "#141008",
        bg2: "#1e1810",
        bg3: "#2a2018",
        accent: "#fcd34d",
      },
      chorus: {
        bg1: "#1a0c08",
        bg2: "#2a1810",
        bg3: "#3d2218",
        accent: "#fbbf24",
      },
      bridge: {
        bg1: "#0f0a08",
        bg2: "#1a120e",
        bg3: "#261a14",
        accent: "#f59e0b",
      },
      outro: {
        bg1: "#0f0a08",
        bg2: "#1a120e",
        bg3: "#261a14",
        accent: "#f59e0b",
      },
    },
    particleColors: {
      default: "#fbbf24",
      chorus: "#fcd34d",
      bridge: "#f59e0b",
    },
  },

  visualization: {
    style: "full",
    primaryColor: "#f59e0b",
    secondaryColor: "#fcd34d",
    opacity: 0.7,
  },

  timingCorrections: {},
};
