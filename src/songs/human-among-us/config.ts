import type { SongConfig } from "../../types/SongConfig";

export const humanAmongUsConfig: SongConfig = {
  // Metadata
  id: "Human-Among-Us",
  title: "Human Among Us",
  subtitle: "If the divine wore skin and bones…",

  // Files
  audioFile: "human-among-us/audio.mp3",
  srtFile: "human-among-us/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 185,

  // Visual theme — divine/human, justice, solemn, earth
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0f0c0a",
        bg2: "#1a1512",
        bg3: "#241e18",
        accent: "#b45309",
      },
      verse: {
        bg1: "#120f0c",
        bg2: "#1c1814",
        bg3: "#262118",
        accent: "#a16207",
      },
      "pre-chorus": {
        bg1: "#14100c",
        bg2: "#1e1a14",
        bg3: "#2a241c",
        accent: "#ca8a04",
      },
      chorus: {
        bg1: "#18120a",
        bg2: "#221a10",
        bg3: "#2e2418",
        accent: "#d97706",
      },
      bridge: {
        bg1: "#120f0c",
        bg2: "#1c1814",
        bg3: "#262118",
        accent: "#92400e",
      },
      outro: {
        bg1: "#0f0c0a",
        bg2: "#1a1512",
        bg3: "#241e18",
        accent: "#b45309",
      },
    },
    particleColors: {
      default: "#a16207",
      chorus: "#d97706",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#d97706",
    secondaryColor: "#b45309",
    opacity: 0.65,
  },

  timingCorrections: {},
};
