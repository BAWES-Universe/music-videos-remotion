import type { SongConfig } from "../../types/SongConfig";

export const theUnmovedMoverConfig: SongConfig = {
  // Metadata
  id: "The-Unmoved-Mover",
  title: "The Unmoved Mover",
  subtitle: "Motion born from what won't bend",

  // Files
  audioFile: "the-unmoved-mover/audio.mp3",
  srtFile: "the-unmoved-mover/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 180,

  // Visual theme - cosmic, stillness, philosophical
  theme: {
    sectionColors: {
      intro: {
        bg1: "#080810",
        bg2: "#101420",
        bg3: "#181c2c",
        accent: "#94a3b8",
      },
      verse: {
        bg1: "#0a0c14",
        bg2: "#12182a",
        bg3: "#1a2038",
        accent: "#64748b",
      },
      "pre-chorus": {
        bg1: "#0c0e18",
        bg2: "#141a2e",
        bg3: "#1e2640",
        accent: "#818cf8",
      },
      chorus: {
        bg1: "#0e0e1a",
        bg2: "#16162c",
        bg3: "#1e1e3a",
        accent: "#a5b4fc",
      },
      bridge: {
        bg1: "#0a0c14",
        bg2: "#12182a",
        bg3: "#1a2038",
        accent: "#c4b5fd",
      },
      outro: {
        bg1: "#080810",
        bg2: "#101420",
        bg3: "#181c2c",
        accent: "#94a3b8",
      },
    },
    particleColors: {
      default: "#64748b",
      chorus: "#a5b4fc",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#818cf8",
    secondaryColor: "#94a3b8",
    opacity: 0.6,
  },

  // Only first lyric was late: singing starts at 19.29s but SRT has it at 22.98s
  timingCorrections: {
    "Before the spark, before the sound,": { startMs: 19290 },
  },
};
