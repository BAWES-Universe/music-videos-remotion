import type { SongConfig } from "../../types/SongConfig";

export const priceOfLoveConfig: SongConfig = {
  // Metadata
  id: "Price-Of-Love",
  title: "Price of Love",
  subtitle: "Too high, I can't buy",

  // Files
  audioFile: "price-of-love/audio.mp3",
  srtFile: "price-of-love/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 120,

  // Visual theme — love, cost, dignity, freedom
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0f0808",
        bg2: "#1a0e0e",
        bg3: "#241414",
        accent: "#b91c1c",
      },
      verse: {
        bg1: "#120a0a",
        bg2: "#1c1010",
        bg3: "#261616",
        accent: "#dc2626",
      },
      "pre-chorus": {
        bg1: "#140c0c",
        bg2: "#1e1212",
        bg3: "#2a1818",
        accent: "#ea580c",
      },
      chorus: {
        bg1: "#180a0a",
        bg2: "#221010",
        bg3: "#2e1616",
        accent: "#ef4444",
      },
      bridge: {
        bg1: "#120a0a",
        bg2: "#1c1010",
        bg3: "#261616",
        accent: "#c084fc",
      },
      outro: {
        bg1: "#0f0808",
        bg2: "#1a0e0e",
        bg3: "#241414",
        accent: "#b91c1c",
      },
    },
    particleColors: {
      default: "#dc2626",
      chorus: "#ef4444",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#ef4444",
    secondaryColor: "#ea580c",
    opacity: 0.6,
  },

  timingCorrections: {},
};
