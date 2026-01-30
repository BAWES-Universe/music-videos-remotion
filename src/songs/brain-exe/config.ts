import type { SongConfig } from "../../types/SongConfig";

export const brainExeConfig: SongConfig = {
  // Metadata (id must be a-z, A-Z, 0-9, CJK, - only; no period)
  id: "Brain-exe",
  title: "Brain.exe",
  subtitle: "I'm the glitch you can't delete",

  // Files (public folder: brain-exe)
  audioFile: "brain-exe/audio.mp3",
  srtFile: "brain-exe/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 120,

  // Visual theme - glitch, tech, cyber
  theme: {
    sectionColors: {
      intro: {
        bg1: "#0a0612",
        bg2: "#120a1a",
        bg3: "#1a0e24",
        accent: "#00ffcc",
      },
      verse: {
        bg1: "#0d0814",
        bg2: "#14101c",
        bg3: "#1c1428",
        accent: "#00ffcc",
      },
      "pre-chorus": {
        bg1: "#0a0818",
        bg2: "#121024",
        bg3: "#1a1430",
        accent: "#ff00aa",
      },
      chorus: {
        bg1: "#0c0a1a",
        bg2: "#14122a",
        bg3: "#1e1a3a",
        accent: "#ff00ff",
      },
      bridge: {
        bg1: "#0a0a14",
        bg2: "#12121e",
        bg3: "#1a1a2a",
        accent: "#00aaff",
      },
      outro: {
        bg1: "#0a0612",
        bg2: "#120a1a",
        bg3: "#1a0e24",
        accent: "#00ffcc",
      },
    },
    particleColors: {
      default: "#00ffcc",
      chorus: "#ff00ff",
    },
  },

  // Audio visualization - glitch, reactive
  visualization: {
    style: "full",
    primaryColor: "#00ffcc",
    secondaryColor: "#ff00aa",
    opacity: 0.7,
  },

  timingCorrections: {},
};
