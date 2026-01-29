# Music Video Documentation

Remotion-based music video project with multi-song support, lyric-driven visuals, and audio-reactive visualization.

## Contents

- **[Architecture](architecture.md)** — Project structure, how compositions and configs work
- **[Adding a Song](adding-a-song.md)** — Step-by-step guide to add a new song
- **[Song Config Reference](song-config.md)** — `SongConfig` fields, theme, timing, visualization
- **[Lyrics & Timing](lyrics-and-timing.md)** — SRT format, section labels, timing corrections
- **[Audio Visualization](visualization.md)** — Visualizer styles and configuration

## Quick Start

```bash
npm i
npm run dev
```

Then pick a composition (e.g. **Heart of Work**) in Remotion Studio. To render:

```bash
npx remotion render HeartOfWork out/HeartOfWork.mp4
```

## Concepts

- **Song config** — Each song has a `SongConfig` in `src/songs/<song-id>/config.ts` defining metadata, assets, duration, theme, and optional timing corrections and visualization.
- **Compositions** — `src/Root.tsx` registers one Remotion composition per song; each uses the same `MusicVideo` component with that song’s config.
- **Lyrics** — SRT files in `public/<song-folder>/lyrics.srt` with optional section labels `(VERSE 1)`, `(CHORUS)`, etc. Timing can be overridden per line via `timingCorrections`.
- **Visualization** — Optional audio-reactive visualizer (radial, bars, wave, or full) driven by `config.visualization`.
