import type { SongConfig } from "../../types/SongConfig";

export const burnTheQuietConfig: SongConfig = {
  // Metadata
  id: "Burn-The-Quiet",
  title: "Burn the Quiet",
  subtitle: "If we're burning tonight, let's start a riot",

  // Files
  audioFile: "burn-the-quiet/audio.mp3",
  srtFile: "burn-the-quiet/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 146,

  // Visual theme — fire, burn, riot, light
  theme: {
    sectionColors: {
      intro: {
        bg1: "#1a0808",
        bg2: "#2a1010",
        bg3: "#3a1414",
        accent: "#ef4444",
      },
      verse: {
        bg1: "#1c0a0a",
        bg2: "#2e1212",
        bg3: "#401616",
        accent: "#f87171",
      },
      "pre-chorus": {
        bg1: "#1e0c0a",
        bg2: "#301412",
        bg3: "#421a18",
        accent: "#fb923c",
      },
      chorus: {
        bg1: "#200808",
        bg2: "#321010",
        bg3: "#461816",
        accent: "#fbbf24",
      },
      bridge: {
        bg1: "#1c0a0a",
        bg2: "#2e1212",
        bg3: "#401616",
        accent: "#fcd34d",
      },
      outro: {
        bg1: "#1a0808",
        bg2: "#2a1010",
        bg3: "#3a1414",
        accent: "#ef4444",
      },
    },
    particleColors: {
      default: "#f87171",
      chorus: "#fbbf24",
      bridge: "#fcd34d",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#ef4444",
    secondaryColor: "#fbbf24",
    opacity: 0.7,
  },

  timingCorrections: {},
};
