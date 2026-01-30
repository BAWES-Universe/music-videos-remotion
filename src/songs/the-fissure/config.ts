import type { SongConfig } from "../../types/SongConfig";

export const theFissureConfig: SongConfig = {
  // Metadata
  id: "TheFissure",
  title: "The Fissure",
  subtitle: "Crack in the Mind",

  // Files
  audioFile: "the-fissure/audio.mp3",
  srtFile: "the-fissure/lyrics.srt",

  // Duration: ~1:16 (add a bit of buffer)
  durationSeconds: 78,

  // Visual theme - cold steel, fracture aesthetic
  theme: {
    sectionColors: {
      verse: {
        bg1: "#0a0a12",
        bg2: "#151525",
        bg3: "#1a1a2e",
        accent: "#4fc3f7",
      },
      "pre-chorus": {
        bg1: "#12121a",
        bg2: "#1a1a2e",
        bg3: "#252545",
        accent: "#7c4dff",
      },
      chorus: {
        bg1: "#1a0a1a",
        bg2: "#2d1530",
        bg3: "#451850",
        accent: "#e040fb",
      },
      bridge: {
        bg1: "#050508",
        bg2: "#0a0a10",
        bg3: "#151520",
        accent: "#00e5ff",
      },
    },
    particleColors: {
      default: "#4fc3f7",
      chorus: "#e040fb",
      bridge: "#00e5ff",
    },
  },

  // Audio visualization - radial style for the cracked/fractured vibe
  visualization: {
    style: "full",
    primaryColor: "#7c4dff",
    secondaryColor: "#00e5ff",
    opacity: 0.65,
  },

  // No timing corrections needed initially - add if lyrics are off
  timingCorrections: {},
};
