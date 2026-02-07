"use client";

import dynamic from "next/dynamic";
import type { SongConfig } from "@/types/SongConfig";

const VideoPlayer = dynamic(
  () => import("./VideoPlayer").then((m) => ({ default: m.VideoPlayer })),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-video w-full items-center justify-center bg-black/50 text-[var(--text-muted)]">
        Loading player…
      </div>
    ),
  }
);

type WatchClientProps = {
  song: SongConfig;
  durationInFrames: number;
  introOffsetSeconds: number;
  width: number;
  height: number;
  fps: number;
};

export function WatchClient({
  song,
  durationInFrames,
  introOffsetSeconds,
  width,
  height,
  fps,
}: WatchClientProps) {
  return (
    <VideoPlayer
      song={song}
      durationInFrames={durationInFrames}
      introOffsetSeconds={introOffsetSeconds}
      width={width}
      height={height}
      fps={fps}
    />
  );
}
