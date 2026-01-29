import "./index.css";
import { Composition, staticFile } from "remotion";
import { MyComposition, CompositionProps } from "./Composition";

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

// Song duration from SRT: last lyric ends at ~3:11 (191 seconds)
// Adding buffer for fade out
const SONG_DURATION_SECONDS = 195;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeartOfWork"
        component={MyComposition}
        durationInFrames={Math.ceil(SONG_DURATION_SECONDS * FPS)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          audioSrc: staticFile("thebrick-heartofwork.mp3"),
          srtSrc: staticFile("lyrics.srt"),
        }}
      />
    </>
  );
};
