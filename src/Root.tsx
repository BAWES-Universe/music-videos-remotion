import "./index.css";
import { Composition, staticFile } from "remotion";
import { MyComposition, CompositionProps } from "./Composition";

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

// Song duration: 3:32
const SONG_DURATION_SECONDS = 3 * 60 + 32; // 212

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
