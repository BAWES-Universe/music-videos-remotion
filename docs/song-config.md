# Song Config Reference

`SongConfig` is defined in `src/types/SongConfig.ts`. All songs use this type.

## Required fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique ID; used as Remotion composition ID (e.g. `"HeartOfWork"`). |
| `title` | `string` | Song title (e.g. for intro/title card). |
| `audioFile` | `string` | Path to audio file relative to `public/` (e.g. `"heart-of-work/audio.mp3"`). |
| `srtFile` | `string` | Path to SRT file relative to `public/` (e.g. `"heart-of-work/lyrics.srt"`). |
| `durationSeconds` | `number` | Total duration in seconds; must be ≥ actual audio length. Used for composition length. |

## Optional metadata

| Field | Type | Description |
|-------|------|-------------|
| `subtitle` | `string` | Optional tagline (e.g. "Brick by Brick"). |

## Theme (`theme`)

Optional overrides for section colors and particle colors.

- **sectionColors** — `Partial<Record<Section, ColorPalette>>`. Override default palettes for `intro`, `verse`, `pre-chorus`, `chorus`, `bridge`, `outro`. Each palette has `bg1`, `bg2`, `bg3`, `accent`.
- **particleColors** — `{ default?, chorus?, bridge? }`. Hex strings for particle effects; `default` is used when section-specific one is not set.

Defaults are in `DEFAULT_SECTION_COLORS` in `SongConfig.ts` (industrial/brick theme).

## Visualization (`visualization`)

Optional audio-reactive visualizer. If omitted, no visualizer is shown.

| Field | Type | Description |
|-------|------|-------------|
| `style` | `"none" \| "radial" \| "bars" \| "wave" \| "full"` | Visual style. `"full"` combines radial + bars + wave. |
| `primaryColor` | `string` | Main color (hex). Defaults to section accent. |
| `secondaryColor` | `string` | Secondary/gradient color. |
| `opacity` | `number` | 0–1; default 0.8. |

## Timing corrections (`timingCorrections`)

Optional map from **exact lyric text** to a timing override. Used when SRT timings are wrong (e.g. Suno exports). Only the **first occurrence** of each line (and, in current logic, first chorus) is corrected.

| Key | Lyric line text exactly as in SRT. |
| Value | `TimingCorrection`: |
| `startMs` | Absolute start time in ms (overrides SRT). |
| `startOffset` | Offset in ms added to SRT start (ignored if `startMs` is set). |
| `duration` | Line duration in ms (overrides “until next caption”). |

Example:

```ts
timingCorrections: {
  "Brick by brick, I breathe, I rise,": { startMs: 58180, duration: 3820 },
  "Heart of work beneath the skies.": { startMs: 62000, duration: 3030 },
}
```

See [Lyrics & Timing](lyrics-and-timing.md) for how sections and first-occurrence rules work.

## Helpers

- **getSectionColors(config)** — Returns `Record<Section, ColorPalette>` (defaults merged with `config.theme.sectionColors`).
- **getParticleColors(config, section)** — Returns hex string for particles for the current section (uses `particleColors.chorus` / `bridge` when applicable, else `default`).
