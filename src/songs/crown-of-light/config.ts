import type { SongConfig } from "../../types/SongConfig";

export const crownOfLightConfig: SongConfig = {
  // Metadata
  id: "Crown-Of-Light",
  title: "Crown of Light",
  subtitle: "I wear it high",

  // Files
  audioFile: "crown-of-light/audio.mp3",
  srtFile: "crown-of-light/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 190,

  // Visual theme — crown, light, fire, triumph
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0c0a08",
        bg2: "#161210",
        bg3: "#1e1814",
        accent: "#fbbf24",
      },
      verse: {
        bg1: "#0e0c0a",
        bg2: "#181412",
        bg3: "#221c18",
        accent: "#f59e0b",
      },
      "pre-chorus": {
        bg1: "#100c0a",
        bg2: "#1a1412",
        bg3: "#241e1a",
        accent: "#fbbf24",
      },
      chorus: {
        bg1: "#120e0a",
        bg2: "#1c1612",
        bg3: "#282018",
        accent: "#fcd34d",
      },
      bridge: {
        bg1: "#0e0c0a",
        bg2: "#181412",
        bg3: "#221c18",
        accent: "#c084fc",
      },
      outro: {
        bg1: "#0c0a08",
        bg2: "#161210",
        bg3: "#1e1814",
        accent: "#fbbf24",
      },
    },
    particleColors: {
      default: "#f59e0b",
      chorus: "#fcd34d",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#fcd34d",
    secondaryColor: "#f59e0b",
    opacity: 0.65,
  },

  timingCorrections: {},
};
