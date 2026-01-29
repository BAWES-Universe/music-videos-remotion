# Audio Visualization

The project includes an optional **audio-reactive visualizer** that uses frequency data from the track. It is driven by `SongConfig.visualization` and implemented in `src/components/AudioVisualizer.tsx` using `@remotion/media-utils` (`useAudioData`, `visualizeAudio`).

## Enabling the visualizer

Set `config.visualization` in the song config:

```ts
visualization: {
  style: "full",           // see styles below
  primaryColor: "#ee4540",
  secondaryColor: "#f39422",
  opacity: 0.7,
}
```

If `visualization` is omitted or `style` is `"none"`, no visualizer is rendered.

## Styles

| Style | Description |
|-------|-------------|
| `"radial"` | Circular bars around the center; frequency mapped to bar height. |
| `"bars"` | Horizontal bar strip (e.g. bottom); frequency bars. |
| `"wave"` | Waveform-style line from frequency data. |
| `"full"` | Combines radial + bars + wave for a dense, reactive look. |

Styles are implemented as sub-components in `AudioVisualizer.tsx` and composed for `"full"`.

## Configuration

| Field | Type | Description |
|-------|------|-------------|
| `style` | `"none" \| "radial" \| "bars" \| "wave" \| "full"` | Which visual to show. |
| `primaryColor` | `string` (hex) | Main color for bars/wave. Defaults to section accent if not set. |
| `secondaryColor` | `string` (hex) | Used for gradients/secondary elements. |
| `opacity` | `number` (0–1) | Overall opacity; default 0.8. |

Colors can be omitted to use the current section’s accent from the theme.

## How it works

1. **MusicVideo** passes `config.audioFile` (as `staticFile(config.audioFile)`), `config.visualization.style`, and colors/opacity into **AudioVisualizer**.
2. **AudioVisualizer** uses `useAudioData(staticFile(audioSrc))` to get audio metadata and `visualizeAudio()` in a loop to get frequency data for the current frame.
3. Frequency data is sampled and mapped to bar heights or waveform points; colors and opacity come from the config.
4. The visualizer is rendered in a layer (e.g. behind or in front of lyrics) so it doesn’t obscure the main content; exact placement is in `MusicVideo.tsx`.

## Dependencies

- **@remotion/media-utils** — `useAudioData`, `visualizeAudio`.
- **@remotion/media** — Used by Remotion for audio decoding.

If you add a new style (e.g. `"rings"`), extend `VisualizerStyle` in `src/types/SongConfig.ts`, implement the style in `AudioVisualizer.tsx`, and handle it in the component’s switch/composition so `"full"` can include it if desired.
