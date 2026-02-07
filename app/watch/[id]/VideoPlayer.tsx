"use client";

import { Player } from "@remotion/player";
import { MusicVideo } from "@/MusicVideo";
import type { SongConfig } from "@/types/SongConfig";

type VideoPlayerProps = {
  song: SongConfig;
  durationInFrames: number;
  introOffsetSeconds: number;
  width: number;
  height: number;
  fps: number;
};

export function VideoPlayer({
  song,
  durationInFrames,
  introOffsetSeconds,
  width,
  height,
  fps,
}: VideoPlayerProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <div
        className="h-full w-full shrink-0"
        style={{
          aspectRatio: `${width} / ${height}`,
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        <Player
          component={MusicVideo}
          inputProps={{
            config: song,
            introOffsetSeconds,
          }}
          durationInFrames={durationInFrames}
          compositionWidth={width}
          compositionHeight={height}
          fps={fps}
          controls
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>
    </div>
  );
}
