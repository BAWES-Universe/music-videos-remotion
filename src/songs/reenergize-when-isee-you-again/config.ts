import type { SongConfig } from "../../types/SongConfig";

export const reenergizeWhenISeeYouAgainConfig: SongConfig = {
  // Metadata
  id: "ReenergizeWhenISeeYouAgain",
  title: "Re-energize When I See You Again",
  subtitle: "A Part of Me Remains",

  // Files
  audioFile: "reenergize-when-isee-you-again/audio.mp3",
  srtFile: "reenergize-when-isee-you-again/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 180,

  // Visual theme - intimate, recharge, mask/steel then renewal
  theme: {
    sectionColors: {
      verse: {
        bg1: "#0d0a0f",
        bg2: "#151018",
        bg3: "#1a1520",
        accent: "#a78bfa",
      },
      chorus: {
        bg1: "#0a0f12",
        bg2: "#121a1f",
        bg3: "#152028",
        accent: "#22d3ee",
      },
      outro: {
        bg1: "#0d0a0f",
        bg2: "#151018",
        bg3: "#1a1520",
        accent: "#c4b5fd",
      },
    },
    particleColors: {
      default: "#a78bfa",
      chorus: "#22d3ee",
    },
  },

  // Audio visualization - soft, recharge vibe
  visualization: {
    style: "full",
    primaryColor: "#a78bfa",
    secondaryColor: "#22d3ee",
    opacity: 0.6,
  },

  timingCorrections: {},
};
