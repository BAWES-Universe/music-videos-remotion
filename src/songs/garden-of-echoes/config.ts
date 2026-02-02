import type { SongConfig } from "../../types/SongConfig";

export const gardenOfEchoesConfig: SongConfig = {
  // Metadata
  id: "Garden-Of-Echoes",
  title: "Garden of Echoes",
  subtitle: "Dance with the echo, ride with the flame",

  // Files
  audioFile: "garden-of-echoes/audio.mp3",
  srtFile: "garden-of-echoes/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 135,

  // Visual theme — garden, echo, mirror, butterflies
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0a0f0c",
        bg2: "#121a14",
        bg3: "#182418",
        accent: "#22c55e",
      },
      verse: {
        bg1: "#0c120e",
        bg2: "#141c16",
        bg3: "#1c261c",
        accent: "#4ade80",
      },
      "pre-chorus": {
        bg1: "#0e1410",
        bg2: "#161e18",
        bg3: "#202a20",
        accent: "#a78bfa",
      },
      chorus: {
        bg1: "#0a140e",
        bg2: "#121c14",
        bg3: "#1a261a",
        accent: "#c084fc",
      },
      bridge: {
        bg1: "#0c120e",
        bg2: "#141c16",
        bg3: "#1c261c",
        accent: "#86efac",
      },
      outro: {
        bg1: "#0a0f0c",
        bg2: "#121a14",
        bg3: "#182418",
        accent: "#22c55e",
      },
    },
    particleColors: {
      default: "#4ade80",
      chorus: "#c084fc",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#c084fc",
    secondaryColor: "#22c55e",
    opacity: 0.65,
  },

  timingCorrections: {},
};
