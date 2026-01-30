import type { SongConfig } from "../../types/SongConfig";

export const theArchitectConfig: SongConfig = {
  // Metadata
  id: "TheArchitect",
  title: "The Architect",
  subtitle: "Not of Dreams, of Weight",

  // Files
  audioFile: "the-architect/audio.mp3",
  srtFile: "the-architect/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 80,

  // Visual theme - blueprint, structure, precision
  theme: {
    sectionColors: {
      verse: {
        bg1: "#0a0c0f",
        bg2: "#12161a",
        bg3: "#1a1f24",
        accent: "#64748b",
      },
      "pre-chorus": {
        bg1: "#0f1215",
        bg2: "#181c22",
        bg3: "#222830",
        accent: "#94a3b8",
      },
      chorus: {
        bg1: "#0a0d10",
        bg2: "#141a1f",
        bg3: "#1e262e",
        accent: "#cbd5e1",
      },
    },
    particleColors: {
      default: "#64748b",
      chorus: "#94a3b8",
    },
  },

  // Audio visualization - clean, structural
  visualization: {
    style: "full",
    primaryColor: "#94a3b8",
    secondaryColor: "#64748b",
    opacity: 0.55,
  },

  timingCorrections: {},
};
