# Lyrics & Timing

Lyrics are loaded from SRT files and parsed in `src/lyrics/parseLyrics.ts`. Section labels and optional timing corrections control sections and alignment.

## SRT format

Standard SRT: numbered cues with timestamps and text.

```srt
1
00:00:02,500 --> 00:00:05,000
First line of lyrics.

2
00:00:05,000 --> 00:00:08,000
Second line.
```

Times are `HH:MM:SS,mmm` (comma for milliseconds). The parser uses `@remotion/captions` `parseSrt()` and converts to `LyricLine[]` with `startMs`, `endMs`, `text`, and `section`.

## Section labels

Lines that are **section labels** (not lyrics) are recognized and set the current section for all following lines until the next label. Labels are **not** shown on screen.

Recognized labels:

- `(INTRO)`
- `(VERSE 1)`, `(VERSE 2)`, …
- `(PRE-CHORUS)`
- `(CHORUS)`
- `(BRIDGE)`
- `(OUTRO)`
- `—` (em dash only)
- Empty lines

Example:

```srt
1
00:00:00,000 --> 00:00:01,000
(INTRO)

2
00:00:02,000 --> 00:00:05,000
First lyric line.

3
00:00:05,500 --> 00:00:06,000
(VERSE 1)

4
00:00:06,000 --> 00:00:09,000
Verse lyric here.
```

Section affects:

- **AnimatedBackground** — Uses `sectionColors[section]` for gradients.
- **Particle colors** — Uses `getParticleColors(config, section)` (chorus/bridge overrides when set).

## Timing corrections

When SRT timings are wrong (e.g. Suno exports), use `SongConfig.timingCorrections` to override per line.

- **Key** — Exact lyric text as in the SRT (including punctuation and spaces).
- **Value** — `TimingCorrection`:
  - **startMs** — Absolute start time in ms (overrides SRT).
  - **startOffset** — Offset in ms added to SRT start (used only if `startMs` is not set).
  - **duration** — Line duration in ms (overrides “until next caption”).

Corrections are applied only for the **first occurrence** of each lyric text and (in the current implementation) only during the **first chorus**. Later verses/choruses keep SRT times. This avoids correcting every repeat of a line when only one section (e.g. first chorus) is misaligned.

Example: first chorus is ~3.4 s early in the SRT:

```ts
timingCorrections: {
  "Brick by brick, I breathe, I rise,": { startMs: 58180, duration: 3820 },
  "Heart of work beneath the skies.": { startMs: 62000, duration: 3030 },
}
```

To find `startMs`: play the track, note when the line starts in ms (e.g. from Remotion Studio time), and set that value. Adjust `duration` so the line doesn’t overlap the next.

## Parsed types

- **LyricLine** — `{ startMs, endMs, text, section }`. `section` is `"intro" | "verse" | "pre-chorus" | "chorus" | "bridge" | "outro"`.
- **LyricSection** — `{ section, startMs, endMs, lines: LyricLine[] }`. From `groupLyricsBySection(lyrics)`; used for section-based background and current-section lookup.

## Grouping

`groupLyricsBySection(lyrics)` returns `LyricSection[]`: consecutive lines with the same `section` are grouped. `MusicVideo` uses this to know the current section at any time and to drive background and particle colors.
