import type { SongConfig } from "../../types/SongConfig";

export const cantStopMeConfig: SongConfig = {
  // Metadata
  id: "Cant-Stop-Me",
  title: "Can't Stop Me",
  subtitle: "I'm free",

  // Files
  audioFile: "cant-stop-me/audio.mp3",
  srtFile: "cant-stop-me/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 115,

  // Visual theme — defiant, fire, thunder
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0f0808",
        bg2: "#1a0e0e",
        bg3: "#241414",
        accent: "#f97316",
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
        accent: "#f59e0b",
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
        accent: "#f97316",
      },
    },
    particleColors: {
      default: "#ea580c",
      chorus: "#ef4444",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#ef4444",
    secondaryColor: "#f97316",
    opacity: 0.65,
  },

  timingCorrections: {},
};
