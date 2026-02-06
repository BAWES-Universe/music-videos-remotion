import type { SongConfig } from "../../types/SongConfig";

export const swayLikeFireConfig: SongConfig = {
  // Metadata
  id: "Sway-Like-Fire",
  title: "Sway Like Fire",
  subtitle: "We were born to sway like fire",

  // Files
  audioFile: "sway-like-fire/audio.mp3",
  srtFile: "sway-like-fire/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 90,

  // Visual theme — golden hour, Caribbean, sway/fire (coral + amber, distinct from other fire songs)
  theme: {
    sectionColors: {
      intro: {
        bg1: "#1a0c0e",
        bg2: "#2a1418",
        bg3: "#3a1c22",
        accent: "#fb7185",
      },
      verse: {
        bg1: "#1c0e10",
        bg2: "#2e161a",
        bg3: "#401e24",
        accent: "#f472b6",
      },
      "pre-chorus": {
        bg1: "#1a0c0e",
        bg2: "#2a1418",
        bg3: "#3a1c22",
        accent: "#f97316",
      },
      chorus: {
        bg1: "#1e0a0c",
        bg2: "#321214",
        bg3: "#461a1e",
        accent: "#fbbf24",
      },
      bridge: {
        bg1: "#1c0e10",
        bg2: "#2e161a",
        bg3: "#401e24",
        accent: "#fcd34d",
      },
      outro: {
        bg1: "#1a0c0e",
        bg2: "#2a1418",
        bg3: "#3a1c22",
        accent: "#fb7185",
      },
    },
    particleColors: {
      default: "#f472b6",
      chorus: "#fbbf24",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#fbbf24",
    secondaryColor: "#fb7185",
    opacity: 0.7,
  },

  timingCorrections: {},
};
