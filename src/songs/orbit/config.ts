import type { SongConfig } from "../../types/SongConfig";

export const orbitConfig: SongConfig = {
  // Metadata
  id: "Orbit",
  title: "Orbit",
  subtitle: "Not Lost, Not Free",

  // Files
  audioFile: "orbit/audio.mp3",
  srtFile: "orbit/lyrics.srt",

  // Fallback duration (auto-detected from audio via calculateMetadata)
  durationSeconds: 120,

  // Visual theme - space, orbit, cosmic
  theme: {
    sectionColors: {
      intro: {
        bg1: "#030508",
        bg2: "#0a0f18",
        bg3: "#0f1624",
        accent: "#7dd3fc",
      },
      verse: {
        bg1: "#050810",
        bg2: "#0d1320",
        bg3: "#141c2e",
        accent: "#38bdf8",
      },
      "pre-chorus": {
        bg1: "#080c14",
        bg2: "#101824",
        bg3: "#1a2438",
        accent: "#818cf8",
      },
      chorus: {
        bg1: "#0a0a18",
        bg2: "#12122a",
        bg3: "#1a1a3a",
        accent: "#a78bfa",
      },
    },
    particleColors: {
      default: "#38bdf8",
      chorus: "#a78bfa",
    },
  },

  // Audio visualization - cosmic, orbit
  visualization: {
    style: "full",
    primaryColor: "#818cf8",
    secondaryColor: "#38bdf8",
    opacity: 0.65,
  },

  // "In orbit —" in all sections: shorter display so we move on to next line sooner
  timingCorrections: {
    "In orbit —": { duration: 900, allOccurrences: true },
  },
};
