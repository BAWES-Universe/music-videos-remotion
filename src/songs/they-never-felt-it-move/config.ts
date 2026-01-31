import type { SongConfig } from "../../types/SongConfig";

export const theyNeverFeltItMoveConfig: SongConfig = {
  // Metadata
  id: "They-Never-Felt-It-Move",
  title: "They Never Felt It Move",
  subtitle: "Zero's alive",

  // Files
  audioFile: "they-never-felt-it-move/audio.mp3",
  srtFile: "they-never-felt-it-move/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 150,

  // Visual theme - minimal, contemplative, motion
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0c0c10",
        bg2: "#141418",
        bg3: "#1c1c24",
        accent: "#94a3b8",
      },
      verse: {
        bg1: "#0a0a0e",
        bg2: "#121218",
        bg3: "#1a1a22",
        accent: "#64748b",
      },
      "pre-chorus": {
        bg1: "#0c0c12",
        bg2: "#14141c",
        bg3: "#1c1c28",
        accent: "#818cf8",
      },
      chorus: {
        bg1: "#0e0e14",
        bg2: "#16161e",
        bg3: "#1e1e2a",
        accent: "#a5b4fc",
      },
      bridge: {
        bg1: "#0a0a0e",
        bg2: "#121218",
        bg3: "#1a1a22",
        accent: "#c4b5fd",
      },
      outro: {
        bg1: "#0c0c10",
        bg2: "#141418",
        bg3: "#1c1c24",
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
    opacity: 0.55,
  },

  timingCorrections: {},
};
