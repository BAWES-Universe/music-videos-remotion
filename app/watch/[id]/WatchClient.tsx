"use client";
/* eslint-disable @remotion/non-pure-animation -- Next.js app; no Remotion composition. */

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import type { SongConfig } from "@/types/SongConfig";
import { PlayerErrorBoundary } from "./PlayerErrorBoundary";

const VideoPlayer = dynamic(
  () => import("./VideoPlayer").then((m) => ({ default: m.VideoPlayer })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <span className="text-sm text-[var(--text-muted)]">Loading…</span>
      </div>
    ),
  }
);

const UP_NEXT_COUNT = 15;

type WatchClientProps = {
  song: SongConfig;
  songs: SongConfig[];
  durationInFrames: number;
  introOffsetSeconds: number;
  width: number;
  height: number;
  fps: number;
};

export function WatchClient({
  song,
  songs,
  durationInFrames,
  introOffsetSeconds,
  width,
  height,
  fps,
}: WatchClientProps) {
  const upNext = useMemo(() => {
    const idx = songs.findIndex((s) => s.id === song.id);
    if (idx < 0) return songs.slice(0, UP_NEXT_COUNT);
    const after = songs.slice(idx + 1);
    const before = songs.slice(0, idx);
    const combined = [...after, ...before];
    return combined.slice(0, UP_NEXT_COUNT);
  }, [songs, song.id]);

  return (
    <div className="flex h-screen flex-col bg-[var(--bg)]">
      {/* Top bar: minimal */}
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="shrink-0 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          >
            ← Gallery
          </Link>
          <span className="text-white/30">|</span>
          <h1 className="truncate font-display text-base font-semibold md:text-lg">
            {song.title}
          </h1>
        </div>
        <Link
          href="/"
          className="shrink-0 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
        >
          All videos
        </Link>
      </header>

      {/* Main: video + sidebar — grid so video column always gets space */}
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_20rem]">
        {/* Video area: first column, guaranteed by grid */}
        <div className="relative flex min-h-[300px] min-w-0 flex-col bg-black">
          <div className="flex min-h-[260px] flex-1 items-center justify-center p-2">
            <PlayerErrorBoundary>
              <VideoPlayer
                song={song}
                durationInFrames={durationInFrames}
                introOffsetSeconds={introOffsetSeconds}
                width={width}
                height={height}
                fps={fps}
              />
            </PlayerErrorBoundary>
          </div>
        </div>

        {/* Sidebar: Up next */}
        <aside className="flex w-full flex-col border-t border-white/10 bg-[var(--bg-card)] lg:min-h-0 lg:w-80 lg:border-l lg:border-t-0">
          <div className="flex h-52 flex-col lg:h-full lg:min-h-0">
            <h2 className="shrink-0 border-b border-white/10 px-4 py-3 font-display text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Up next
            </h2>
            <ul className="flex-1 overflow-y-auto py-2">
              {upNext.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/watch/${s.id}`}
                    className="block border-l-2 border-transparent px-4 py-2.5 text-sm transition-colors hover:border-[var(--accent)] hover:bg-white/5 hover:text-white"
                  >
                    <span className="font-medium">{s.title}</span>
                    {s.subtitle && (
                      <span className="mt-0.5 block truncate text-xs text-[var(--text-muted)]">
                        {s.subtitle}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="shrink-0 border-t border-white/10 px-4 py-3">
              <Link
                href="/"
                className="block text-center text-sm font-medium text-[var(--accent)] hover:underline"
              >
                View all {songs.length} videos →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
