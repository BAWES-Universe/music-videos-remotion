import "./index.css";
import { Composition } from "remotion";
import { MusicVideo } from "./MusicVideo";
import { heartOfWorkConfig } from "./songs";
import type { SongConfig } from "./types/SongConfig";

const FPS = 30;
const WIDTH = 3840;
const HEIGHT = 2160;

// All songs to register as compositions
const songs: SongConfig[] = [
  heartOfWorkConfig,
  // Add more songs here:
  // anotherSongConfig,
];

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
        />
      ))}
    </>
  );
};
