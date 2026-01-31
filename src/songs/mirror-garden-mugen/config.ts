import type { SongConfig } from "../../types/SongConfig";

export const mirrorGardenMugenConfig: SongConfig = {
  // Metadata
  id: "Mirror-Garden-Mugen",
  title: "Mirror Garden",
  subtitle: "鏡の庭 — where the real collides",

  // Files
  audioFile: "mirror-garden-mugen/audio.mp3",
  srtFile: "mirror-garden-mugen/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 140,

  // Visual theme — mirror, garden, glass, reflections
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0a0e12",
        bg2: "#12181e",
        bg3: "#1a2228",
        accent: "#94a3b8",
      },
      verse: {
        bg1: "#0c1014",
        bg2: "#141a20",
        bg3: "#1c242c",
        accent: "#64748b",
      },
      "pre-chorus": {
        bg1: "#0e1218",
        bg2: "#161c24",
        bg3: "#1e2630",
        accent: "#818cf8",
      },
      chorus: {
        bg1: "#101418",
        bg2: "#181e26",
        bg3: "#222a34",
        accent: "#38bdf8",
      },
      bridge: {
        bg1: "#0c1014",
        bg2: "#141a20",
        bg3: "#1c242c",
        accent: "#a78bfa",
      },
      outro: {
        bg1: "#0a0e12",
        bg2: "#12181e",
        bg3: "#1a2228",
        accent: "#94a3b8",
      },
    },
    particleColors: {
      default: "#64748b",
      chorus: "#38bdf8",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#38bdf8",
    secondaryColor: "#94a3b8",
    opacity: 0.6,
  },

  timingCorrections: {},
};
