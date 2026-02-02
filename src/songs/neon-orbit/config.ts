import type { SongConfig } from "../../types/SongConfig";

export const neonOrbitConfig: SongConfig = {
  // Metadata
  id: "Neon-Orbit",
  title: "Neon Orbit",
  subtitle: "We go neon, over the edge",

  // Files
  audioFile: "neon-orbit/audio.mp3",
  srtFile: "neon-orbit/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 305,

  // Visual theme — neon, orbit, urban, night
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0a080c",
        bg2: "#120c14",
        bg3: "#1a141c",
        accent: "#a855f7",
      },
      verse: {
        bg1: "#0c0810",
        bg2: "#141018",
        bg3: "#1c1820",
        accent: "#c084fc",
      },
      "pre-chorus": {
        bg1: "#0e0a12",
        bg2: "#16121a",
        bg3: "#201a24",
        accent: "#e879f9",
      },
      chorus: {
        bg1: "#0a0810",
        bg2: "#121018",
        bg3: "#1a1420",
        accent: "#06b6d4",
      },
      bridge: {
        bg1: "#0c0810",
        bg2: "#141018",
        bg3: "#1c1820",
        accent: "#78716c",
      },
      outro: {
        bg1: "#0a080c",
        bg2: "#120c14",
        bg3: "#1a141c",
        accent: "#a855f7",
      },
    },
    particleColors: {
      default: "#c084fc",
      chorus: "#06b6d4",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#06b6d4",
    secondaryColor: "#a855f7",
    opacity: 0.65,
  },

  timingCorrections: {},
};
