import type { SongConfig } from "../../types/SongConfig";

export const whenGiantsWakeConfig: SongConfig = {
  // Metadata
  id: "WhenGiantsWake",
  title: "When the Giants Wake",
  subtitle: "Every Chain's Gonna Break",

  // Files
  audioFile: "when-giants-wake/audio.mp3",
  srtFile: "when-giants-wake/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 225,

  // Visual theme - epic, earth, mountains, fire (giants waking)
  theme: {
    sectionColors: {
      verse: {
        bg1: "#0f0a08",
        bg2: "#1a120d",
        bg3: "#261a12",
        accent: "#d97706",
      },
      chorus: {
        bg1: "#1a0a0a",
        bg2: "#2d1515",
        bg3: "#451a1a",
        accent: "#dc2626",
      },
      bridge: {
        bg1: "#0a0f14",
        bg2: "#121a24",
        bg3: "#1a2433",
        accent: "#ea580c",
      },
      outro: {
        bg1: "#0f0a08",
        bg2: "#1a120d",
        bg3: "#261a12",
        accent: "#f59e0b",
      },
    },
    particleColors: {
      default: "#d97706",
      chorus: "#dc2626",
      bridge: "#ea580c",
    },
  },

  // Audio visualization - fire/earth
  visualization: {
    style: "full",
    primaryColor: "#dc2626",
    secondaryColor: "#f59e0b",
    opacity: 0.7,
  },

  timingCorrections: {},
};
