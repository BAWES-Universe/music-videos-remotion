import type { SongConfig } from "../../types/SongConfig";

export const runaDeFuegoConfig: SongConfig = {
  // Metadata
  id: "Runa-De-Fuego",
  title: "Runa de Fuego",
  subtitle: "I burn with meaning",

  // Files
  audioFile: "runa-de-fuego/audio.mp3",
  srtFile: "runa-de-fuego/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 165,

  // Visual theme — fire, flame, brass, rhythm
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0f0808",
        bg2: "#1a0e0e",
        bg3: "#241414",
        accent: "#f59e0b",
      },
      verse: {
        bg1: "#120a0a",
        bg2: "#1c1010",
        bg3: "#261616",
        accent: "#ea580c",
      },
      "pre-chorus": {
        bg1: "#140c0c",
        bg2: "#1e1212",
        bg3: "#2a1818",
        accent: "#fbbf24",
      },
      chorus: {
        bg1: "#180a0a",
        bg2: "#221010",
        bg3: "#2e1616",
        accent: "#fcd34d",
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
        accent: "#f59e0b",
      },
    },
    particleColors: {
      default: "#ea580c",
      chorus: "#fcd34d",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#fcd34d",
    secondaryColor: "#ea580c",
    opacity: 0.65,
  },

  timingCorrections: {},
};
