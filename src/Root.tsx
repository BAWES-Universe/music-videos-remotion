import "./index.css";
import { Composition, staticFile } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { MusicVideo } from "./MusicVideo";
import type { MusicVideoProps } from "./MusicVideo";
import { parseLyricsFromSrt } from "./lyrics/parseLyrics";
import { heartOfWorkConfig, theFissureConfig, stillnessWeaponizedConfig, pressureButIDontBreakConfig, whenGiantsWakeConfig, reenergizeWhenISeeYouAgainConfig, theArchitectConfig, orbitConfig, brainExeConfig, theUnmovedMoverConfig, lightspeedConfig, walkingThroughFireConfig, theyNeverFeltItMoveConfig, gravityWontHoldMeConfig } from "./songs";
import type { SongConfig } from "./types/SongConfig";

const MIN_TITLE_SECONDS = 3;

const FPS = 30;
const WIDTH = 3840;
const HEIGHT = 2160;

// All songs to register as compositions
const songs: SongConfig[] = [
  heartOfWorkConfig,
  theFissureConfig,
  stillnessWeaponizedConfig,
  pressureButIDontBreakConfig,
  whenGiantsWakeConfig,
  reenergizeWhenISeeYouAgainConfig,
  theArchitectConfig,
  orbitConfig,
  brainExeConfig,
  theUnmovedMoverConfig,
  lightspeedConfig,
  walkingThroughFireConfig,
  theyNeverFeltItMoveConfig,
  gravityWontHoldMeConfig,
];

// Auto-detect duration; when first lyric is before MIN_TITLE_SECONDS, push music and add intro
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

  let introOffsetSeconds = 0;
  try {
    const srtRes = await fetch(staticFile(props.config.srtFile));
    const srtContent = await srtRes.text();
    const lyrics = parseLyricsFromSrt(srtContent, props.config.timingCorrections, props.config.lyricsOffsetMs);
    const firstLyricStartSec = lyrics.length > 0 ? lyrics[0].startMs / 1000 : MIN_TITLE_SECONDS;
    if (firstLyricStartSec < MIN_TITLE_SECONDS) {
      introOffsetSeconds = MIN_TITLE_SECONDS;
      durationSeconds += introOffsetSeconds;
    }
  } catch {
    // If SRT fetch/parse fails, no push
  }

  return {
    durationInFrames: Math.ceil(durationSeconds * FPS),
    props: {
      ...props,
      introOffsetSeconds: introOffsetSeconds > 0 ? introOffsetSeconds : undefined,
    },
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
