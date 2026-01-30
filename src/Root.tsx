import "./index.css";
import { Composition, staticFile } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { MusicVideo } from "./MusicVideo";
import type { MusicVideoProps } from "./MusicVideo";
import { heartOfWorkConfig, theFissureConfig } from "./songs";
import type { SongConfig } from "./types/SongConfig";

const FPS = 30;
const WIDTH = 3840;
const HEIGHT = 2160;

// All songs to register as compositions
const songs: SongConfig[] = [
  heartOfWorkConfig,
  theFissureConfig,
];

// Auto-detect duration from audio file; fall back to config.durationSeconds if it fails
const calculateMetadata: CalculateMetadataFunction<MusicVideoProps> = async ({
  props,
}) => {
  let durationSeconds: number;
  try {
    durationSeconds = await getAudioDurationInSeconds(
      staticFile(props.config.audioFile)
    );
  } catch {
    durationSeconds = props.config.durationSeconds;
  }
  return {
    durationInFrames: Math.ceil(durationSeconds * FPS),
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {songs.map((song) => (
        <Composition
          key={song.id}
          id={song.id}
          component={MusicVideo}
          durationInFrames={Math.ceil(song.durationSeconds * FPS)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{
            config: song,
          }}
          calculateMetadata={calculateMetadata}
        />
      ))}
    </>
  );
};
