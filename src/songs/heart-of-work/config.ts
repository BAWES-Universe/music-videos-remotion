import type { SongConfig } from "../../types/SongConfig";

export const heartOfWorkConfig: SongConfig = {
  // Metadata
  id: "HeartOfWork",
  title: "Heart of Work",
  subtitle: "Brick by Brick",
  
  // Files
  audioFile: "heart-of-work/audio.mp3",
  srtFile: "heart-of-work/lyrics.srt",
  
  // Duration: 3:32
  durationSeconds: 3 * 60 + 32,
  
  // Visual theme (using defaults - industrial/brick)
  theme: {
    particleColors: {
      default: "#e94560",
      chorus: "#ee4540",
      bridge: "#f5af19",
    },
  },
  
  // Timing corrections for first chorus (Suno SRT was ~3.4s early)
  timingCorrections: {
    "Brick by brick, I breathe, I rise,": { startMs: 58180, duration: 3820 },
    "Heart of work beneath the skies.": { startMs: 62000, duration: 3030 },
    "When the world forgets its name,": { startMs: 65030, duration: 2870 },
    "I remember — I remain.": { startMs: 67900, duration: 4100 },
  },
};
