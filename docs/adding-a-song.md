# Adding a Song

Follow these steps to add a new song to the project.

## 1. Add assets

Create a folder under `public/` (e.g. `public/my-song/`) and add:

- **audio.mp3** — The track (any name is fine; reference it in config).
- **lyrics.srt** — SRT file with timestamps. Optionally include section labels like `(VERSE 1)`, `(CHORUS)` so the parser can set section-based colors and effects.

Example `public/my-song/lyrics.srt`:

```srt
1
00:00:00,000 --> 00:00:02,500
(INTRO)

2
00:00:02,500 --> 00:00:05,000
First line of lyrics here.

3
00:00:05,000 --> 00:00:08,000
(VERSE 1)

4
...
```

## 2. Create song config

Create `src/songs/my-song/config.ts`:

```ts
import type { SongConfig } from "../../types/SongConfig";

export const mySongConfig: SongConfig = {
  id: "MySong",           // Used as Remotion composition ID
  title: "My Song",
  subtitle: "Optional tagline",

  audioFile: "my-song/audio.mp3",
  srtFile: "my-song/lyrics.srt",

  durationSeconds: 3 * 60 + 30,  // 3:30 — must match or exceed audio

  // Optional: theme overrides
  theme: {
    particleColors: {
      default: "#e94560",
      chorus: "#ee4540",
      bridge: "#f5af19",
    },
  },

  // Optional: audio visualization
  visualization: {
    style: "full",  // "radial" | "bars" | "wave" | "full" | "none"
    primaryColor: "#ee4540",
    secondaryColor: "#f39422",
    opacity: 0.7,
  },

  // Optional: fix lyric timings (e.g. if SRT from Suno is off)
  timingCorrections: {
    "Exact lyric text here": { startMs: 45000, duration: 2500 },
  },
};
```

Paths in `audioFile` and `srtFile` are relative to the `public/` folder.

## 3. Register the song

1. **Export the config** in `src/songs/index.ts`:

   ```ts
   export { heartOfWorkConfig } from "./heart-of-work/config";
   export { mySongConfig } from "./my-song/config";
   ```

2. **Add to the compositions list** in `src/Root.tsx`:

   ```ts
   const songs: SongConfig[] = [
     heartOfWorkConfig,
     mySongConfig,
   ];
   ```

## 4. Verify

- Run `npm run dev` and open Remotion Studio.
- Select the composition by your `id` (e.g. **MySong**).
- Check that audio plays, lyrics appear at the right times, and background/particles/visualizer match the sections. If some lyrics are early or late, add or adjust entries in `timingCorrections` (see [Lyrics & Timing](lyrics-and-timing.md)).

## 5. Render

```bash
npx remotion render MySong out/MySong.mp4
```

See [Song Config Reference](song-config.md) for all config options and [Lyrics & Timing](lyrics-and-timing.md) for SRT format and timing correction rules.
