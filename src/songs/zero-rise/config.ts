import type { SongConfig } from "../../types/SongConfig";

export const zeroRiseConfig: SongConfig = {
  // Metadata
  id: "Zero-Rise",
  title: "Zero \\\\ Rise",
  subtitle: "Zero isn't empty. It's the silence before thunder",

  // Files
  audioFile: "zero-rise/audio.mp3",
  srtFile: "zero-rise/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 183,

  // Visual theme — zero, rise, silence, creation
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0a0a0c",
        bg2: "#121214",
        bg3: "#1a1a1c",
        accent: "#71717a",
      },
      verse: {
        bg1: "#0c0c0e",
        bg2: "#141416",
        bg3: "#1c1c1e",
        accent: "#a1a1aa",
      },
      "pre-chorus": {
        bg1: "#0e0e10",
        bg2: "#161618",
        bg3: "#1e1e20",
        accent: "#eab308",
      },
      chorus: {
        bg1: "#0a0a0c",
        bg2: "#121214",
        bg3: "#1a1a1c",
        accent: "#fbbf24",
      },
      bridge: {
        bg1: "#0c0c0e",
        bg2: "#141416",
        bg3: "#1c1c1e",
        accent: "#78716c",
      },
      outro: {
        bg1: "#0a0a0c",
        bg2: "#121214",
        bg3: "#1a1a1c",
        accent: "#71717a",
      },
    },
    particleColors: {
      default: "#a1a1aa",
      chorus: "#fbbf24",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#fbbf24",
    secondaryColor: "#71717a",
    opacity: 0.65,
  },

  timingCorrections: {},
};
