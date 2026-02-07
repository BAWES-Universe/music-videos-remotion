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
    <div className="aspect-video w-full" style={{ aspectRatio: `${width} / ${height}` }}>
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
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
