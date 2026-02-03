import type { SongConfig } from "../../types/SongConfig";

export const whatWeDoinConfig: SongConfig = {
  // Metadata
  id: "What-We-Doin",
  title: "What We Doin",
  subtitle: "We risin'. We grindin'. We fightin'. We shinin'.",

  // Files
  audioFile: "what-we-doin/audio.mp3",
  srtFile: "what-we-doin/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 95,

  // Visual theme — electric blue / cyan, anthem energy
  theme: {
    sectionColors: {
      intro: {
        bg1: "#050810",
        bg2: "#0a0f1a",
        bg3: "#0f1624",
        accent: "#0ea5e9",
      },
      verse: {
        bg1: "#060a12",
        bg2: "#0c1220",
        bg3: "#121c2e",
        accent: "#38bdf8",
      },
      "pre-chorus": {
        bg1: "#080c14",
        bg2: "#0e1424",
        bg3: "#161e32",
        accent: "#22d3ee",
      },
      chorus: {
        bg1: "#040810",
        bg2: "#0a1020",
        bg3: "#101830",
        accent: "#06b6d4",
      },
      bridge: {
        bg1: "#060a12",
        bg2: "#0c1220",
        bg3: "#121c2e",
        accent: "#64748b",
      },
      outro: {
        bg1: "#050810",
        bg2: "#0a0f1a",
        bg3: "#0f1624",
        accent: "#0ea5e9",
      },
    },
    particleColors: {
      default: "#38bdf8",
      chorus: "#06b6d4",
    },
  },

  // Audio visualization
  visualization: {
    style: "full",
    primaryColor: "#06b6d4",
    secondaryColor: "#0ea5e9",
    opacity: 0.65,
  },

  timingCorrections: {},

  // Extra particle burst during solo (01:08.15)
  particleBurstTimesMs: [68_150],
};
