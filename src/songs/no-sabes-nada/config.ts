import type { SongConfig } from "../../types/SongConfig";

export const noSabesNadaConfig: SongConfig = {
  // Metadata
  id: "No-Sabes-Nada",
  title: "No Sabes Nada",
  subtitle: "Sin parada",

  // Files
  audioFile: "no-sabes-nada/audio.mp3",
  srtFile: "no-sabes-nada/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 130,

  // Visual theme — Latin / Caribbean / bilingual, energetic
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0c0a08",
        bg2: "#161210",
        bg3: "#1e1a14",
        accent: "#f59e0b",
      },
      verse: {
        bg1: "#0e0c0a",
        bg2: "#181412",
        bg3: "#221c18",
        accent: "#ea580c",
      },
      "pre-chorus": {
        bg1: "#100e0a",
        bg2: "#1a1612",
        bg3: "#242018",
        accent: "#fbbf24",
      },
      chorus: {
        bg1: "#120e0a",
        bg2: "#1c1612",
        bg3: "#282018",
        accent: "#14b8a6",
      },
      bridge: {
        bg1: "#0e0c0a",
        bg2: "#181412",
        bg3: "#221c18",
        accent: "#a78bfa",
      },
      outro: {
        bg1: "#0c0a08",
        bg2: "#161210",
        bg3: "#1e1a14",
        accent: "#f59e0b",
      },
    },
    particleColors: {
      default: "#ea580c",
      chorus: "#14b8a6",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#14b8a6",
    secondaryColor: "#f59e0b",
    opacity: 0.65,
  },

  timingCorrections: {},
};
