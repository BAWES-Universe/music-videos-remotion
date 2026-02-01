import type { SongConfig } from "../../types/SongConfig";

export const theStickThatEatsSnakesConfig: SongConfig = {
  // Metadata
  id: "The-Stick-That-Eats-Snakes",
  title: "The Stick That Eats Snakes",
  subtitle: "Wood turns fire, staff takes breath",

  // Files
  audioFile: "the-stick-that-eats-snakes/audio.mp3",
  srtFile: "the-stick-that-eats-snakes/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 210,

  // Visual theme — stick, snakes, prophet, desert, fire
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0a0c08",
        bg2: "#12100e",
        bg3: "#1a1814",
        accent: "#65a30d",
      },
      verse: {
        bg1: "#0c0e0a",
        bg2: "#141612",
        bg3: "#1e1c18",
        accent: "#84cc16",
      },
      "pre-chorus": {
        bg1: "#0e100c",
        bg2: "#181a14",
        bg3: "#22201a",
        accent: "#a16207",
      },
      chorus: {
        bg1: "#0c0e08",
        bg2: "#161810",
        bg3: "#202018",
        accent: "#ca8a04",
      },
      bridge: {
        bg1: "#0c0e0a",
        bg2: "#141612",
        bg3: "#1e1c18",
        accent: "#78716c",
      },
      outro: {
        bg1: "#0a0c08",
        bg2: "#12100e",
        bg3: "#1a1814",
        accent: "#65a30d",
      },
    },
    particleColors: {
      default: "#84cc16",
      chorus: "#ca8a04",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#ca8a04",
    secondaryColor: "#65a30d",
    opacity: 0.65,
  },

  timingCorrections: {},
};
