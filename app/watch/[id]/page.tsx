import Link from "next/link";
import { notFound } from "next/navigation";
import { getSongById } from "@/songs/list";
import { WatchClient } from "./WatchClient";

const FPS = 30;
const PLAYER_WIDTH = 1280;
const PLAYER_HEIGHT = 720;

type Props = { params: Promise<{ id: string }> };

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  const song = getSongById(id);
  if (!song) notFound();

  const durationInFrames = Math.ceil((song.durationSeconds + 3) * FPS);
  const introOffsetSeconds = song.introOffsetSeconds ?? 0;

  return (
    <main className="min-h-screen flex flex-col">
      <header className="flex items-center gap-4 border-b border-white/10 px-4 py-3 md:px-8">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
        >
          ← All videos
        </Link>
        <span className="text-[var(--text-muted)]">/</span>
        <h1 className="font-display text-lg font-semibold truncate">
          {song.title}
        </h1>
      </header>
      <div className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl">
          <WatchClient
            song={song}
            durationInFrames={durationInFrames}
            introOffsetSeconds={introOffsetSeconds}
            width={PLAYER_WIDTH}
            height={PLAYER_HEIGHT}
            fps={FPS}
          />
        </div>
      </div>
    </main>
  );
}
