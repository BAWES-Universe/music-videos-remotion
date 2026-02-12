import type { SongConfig } from "../../types/SongConfig";

export const goneTooSoonConfig: SongConfig = {
  // Metadata
  id: "Gone-Too-Soon",
  title: "Gone Too Soon",
  subtitle: "My sweet monthly salary, saying goodbye",

  // Files
  audioFile: "gone-too-soon/audio.mp3",
  srtFile: "gone-too-soon/lyrics.srt",

  // ~2:06+ (outro ends ~2:06; fallback, auto-detected from audio in Root)
  durationSeconds: 130,

  // Visual theme — melancholic, soft; dusty blues and muted warmth
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0f1218",
        bg2: "#161c26",
        bg3: "#1e2634",
        accent: "#64748b",
      },
      verse: {
        bg1: "#12161c",
        bg2: "#1a2028",
        bg3: "#222a34",
        accent: "#94a3b8",
      },
      "pre-chorus": {
        bg1: "#14181e",
        bg2: "#1c222c",
        bg3: "#262e3a",
        accent: "#a1a1aa",
      },
      chorus: {
        bg1: "#0e1218",
        bg2: "#161c24",
        bg3: "#1e2632",
        accent: "#c4b5a0",
      },
      bridge: {
        bg1: "#101418",
        bg2: "#181e26",
        bg3: "#202830",
        accent: "#94a3b8",
      },
      outro: {
        bg1: "#0c0f14",
        bg2: "#14181e",
        bg3: "#1a2028",
        accent: "#64748b",
      },
    },
    particleColors: {
      default: "#64748b",
      chorus: "#c4b5a0",
      bridge: "#94a3b8",
    },
  },

  visualization: {
    style: "full",
    primaryColor: "#64748b",
    secondaryColor: "#94a3b8",
    opacity: 0.5,
  },

  timingCorrections: {},
};
