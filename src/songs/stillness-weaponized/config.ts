import type { SongConfig } from "../../types/SongConfig";

export const stillnessWeaponizedConfig: SongConfig = {
  // Metadata
  id: "StillnessWeaponized",
  title: "Stillness Weaponized",
  subtitle: "Calm So Cold",

  // Files
  audioFile: "stillness-weaponized/audio.mp3",
  srtFile: "stillness-weaponized/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 92,

  // Visual theme - minimal, sharp, cold (stillness / weaponized)
  theme: {
    sectionColors: {
      verse: {
        bg1: "#0c0c0f",
        bg2: "#141418",
        bg3: "#1c1c22",
        accent: "#94a3b8",
      },
      "pre-chorus": {
        bg1: "#0f0f14",
        bg2: "#18181f",
        bg3: "#22222e",
        accent: "#cbd5e1",
      },
      chorus: {
        bg1: "#0a0a0e",
        bg2: "#12121a",
        bg3: "#1a1a24",
        accent: "#e2e8f0",
      },
      bridge: {
        bg1: "#050508",
        bg2: "#0a0a0d",
        bg3: "#0f0f14",
        accent: "#f1f5f9",
      },
    },
    particleColors: {
      default: "#94a3b8",
      chorus: "#e2e8f0",
      bridge: "#f1f5f9",
    },
  },

  // Audio visualization - subtle, cold
  visualization: {
    style: "full",
    primaryColor: "#94a3b8",
    secondaryColor: "#64748b",
    opacity: 0.5,
  },

  timingCorrections: {},
};
