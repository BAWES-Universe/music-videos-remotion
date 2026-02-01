import type { SongConfig } from "../../types/SongConfig";

export const ashesToAnthemsConfig: SongConfig = {
  // Metadata
  id: "Ashes-To-Anthems",
  title: "Ashes to Anthems",
  subtitle: "From ashes to anthems, we rise",

  // Files
  audioFile: "ashes-to-anthems/audio.mp3",
  srtFile: "ashes-to-anthems/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 188,

  // Visual theme — ashes, fire, rise, uprising
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0c0808",
        bg2: "#140c0c",
        bg3: "#1c1414",
        accent: "#dc2626",
      },
      verse: {
        bg1: "#0e0a08",
        bg2: "#18100c",
        bg3: "#221814",
        accent: "#ea580c",
      },
      "pre-chorus": {
        bg1: "#100a08",
        bg2: "#1a120c",
        bg3: "#261a14",
        accent: "#f97316",
      },
      chorus: {
        bg1: "#120808",
        bg2: "#1c1010",
        bg3: "#2a1818",
        accent: "#fbbf24",
      },
      bridge: {
        bg1: "#0e0a08",
        bg2: "#18100c",
        bg3: "#221814",
        accent: "#b91c1c",
      },
      outro: {
        bg1: "#0c0808",
        bg2: "#140c0c",
        bg3: "#1c1414",
        accent: "#dc2626",
      },
    },
    particleColors: {
      default: "#ea580c",
      chorus: "#fbbf24",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#fbbf24",
    secondaryColor: "#dc2626",
    opacity: 0.65,
  },

  timingCorrections: {},
};
