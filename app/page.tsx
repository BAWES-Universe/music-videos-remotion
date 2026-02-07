import type { Metadata } from "next";
import Link from "next/link";
import { songs } from "@/songs/list";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Browse and watch ${songs.length} music videos.`,
  openGraph: {
    title: "Gallery | Music Videos",
    description: `Browse and watch ${songs.length} music videos.`,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Music Videos",
    description: `Browse and watch ${songs.length} music videos.`,
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-white/10 px-6 py-6 md:px-12">
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          Music Videos
        </h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          {songs.length} videos
        </p>
      </header>
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:px-12 md:py-10 lg:grid-cols-3 xl:grid-cols-4">
        {songs.map((song, i) => (
          <Link
            key={song.id}
            href={`/watch/${song.id}`}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-[var(--bg-card)] p-5 transition-all duration-200 hover:border-[var(--accent)]/50 hover:shadow-[0_0_30px_-5px_var(--accent)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <h2 className="font-display text-lg font-semibold tracking-tight text-white group-hover:text-[var(--accent)]">
              {song.title}
            </h2>
            {song.subtitle && (
              <p className="mt-1 line-clamp-2 text-sm text-[var(--text-muted)]">
                {song.subtitle}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
