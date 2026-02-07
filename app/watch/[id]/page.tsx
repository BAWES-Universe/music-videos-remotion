import { notFound } from "next/navigation";
import { getSongById, songs } from "@/songs/list";
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
    <WatchClient
      song={song}
      songs={songs}
      durationInFrames={durationInFrames}
      introOffsetSeconds={introOffsetSeconds}
      width={PLAYER_WIDTH}
      height={PLAYER_HEIGHT}
      fps={FPS}
    />
  );
}
