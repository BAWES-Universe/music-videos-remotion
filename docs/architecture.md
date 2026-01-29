# Architecture

## Overview

The project is a **config-driven** Remotion app: one `MusicVideo` component is used for all songs. Each song is defined by a `SongConfig` and gets its own Remotion composition (ID = `config.id`).

## Project Structure

```
music-video/
├── public/                    # Static assets (served as /)
│   └── heart-of-work/
│       ├── audio.mp3
│       └── lyrics.srt
├── src/
│   ├── Root.tsx               # Registers compositions from songs array
│   ├── MusicVideo.tsx         # Main composition; receives config
│   ├── index.ts / index.css
│   ├── types/
│   │   └── SongConfig.ts      # SongConfig, defaults, helpers
│   ├── songs/
│   │   ├── index.ts           # Exports all song configs
│   │   └── heart-of-work/
│   │       └── config.ts      # heartOfWorkConfig
│   ├── lyrics/
│   │   └── parseLyrics.ts     # SRT → LyricLine[], timing corrections
│   ├── components/
│   │   ├── AnimatedBackground.tsx  # Section-based gradient background
│   │   ├── LyricDisplay.tsx       # Title + lyric lines
│   │   ├── BrickParticles.tsx     # Particle effects
│   │   └── AudioVisualizer.tsx    # Frequency-based visualization
│   └── utils/
│       └── getAudioDuration.ts
├── docs/
└── package.json
```

## Data Flow

1. **Root** — Imports `songs: SongConfig[]` and maps each to a `<Composition>` with `component={MusicVideo}` and `defaultProps={{ config: song }}`.
2. **MusicVideo** — Loads SRT via `staticFile(config.srtFile)`, parses with `parseLyricsFromSrt(srtContent, config.timingCorrections)`, groups by section, and drives:
   - **AnimatedBackground** — Section colors from `getSectionColors(config)`.
   - **LyricDisplay** — Current lyric lines and title from config.
   - **BrickParticles** — Particle colors from `getParticleColors(config, section)`.
   - **AudioVisualizer** — Rendered when `config.visualization` is set; uses `config.visualization.style` and colors.
3. **Lyrics** — Parsed into `LyricLine[]` (startMs, endMs, text, section). Section labels in the SRT (e.g. `(CHORUS)`) set `section` for subsequent lines. Timing corrections override SRT times for matching lines (first occurrence only, by default for first chorus).

## Key Dependencies

- **Remotion** — Composition, `useCurrentFrame`, `useVideoConfig`, `staticFile`, `Sequence`, `Audio`.
- **@remotion/captions** — `parseSrt` for SRT parsing.
- **@remotion/media-utils** — `useAudioData`, `visualizeAudio` for the audio visualizer.
- **@remotion/media** — `Audio` for playback.

## Adding New Behavior

- **New song** — Add a config under `src/songs/<id>/config.ts`, export from `src/songs/index.ts`, and add to the `songs` array in `Root.tsx`. Put `audio.mp3` and `lyrics.srt` in `public/<folder>/`.
- **New section type** — Extend `LyricLine["section"]` and `DEFAULT_SECTION_COLORS` in `SongConfig.ts`, and handle the label in `parseLyrics.ts` (`getSectionFromLabel`).
- **New visualizer style** — Add a style in `SongConfig.VisualizerStyle`, implement in `AudioVisualizer.tsx`, and pass through from `MusicVideo`.
