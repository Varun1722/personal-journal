import type { Metadata } from "next";
import Image from "next/image";
import Clock from "@/components/ui/Clock";
import {
  getRecentLetterboxdEntries,
  LETTERBOXD_PROFILE_URL,
} from "@/utils/letterboxd";

export const metadata: Metadata = {
  title: "now",
  description: "What Varun Goyal is focused on right now.",
};

export default async function NowPage() {
  const recentFilms = await getRecentLetterboxdEntries(6);

  return (
    <div>
      <article className="prose">
        <p>
          this is a <a href="https://sive.rs/nowff">now</a> page
        </p>
        <p>
          Location: Bengaluru, India
          <br />
          Time: <Clock />
        </p>
        <ul className="list-disc">
          <li>
            building governance and guardrails for ITSM agents at @{" "}
            <a href="https://virima.com/">Virima</a>
          </li>
          <li>finding balance between work, badminton, and the gym</li>
          <li>trying to think and research more</li>
          <li>being lively and enjoying this phase of life</li>
        </ul>
        <section className="not-prose mt-10 border-t border-rule pt-6 dark:border-night-rule">
          <p className="mb-3 text-xs text-ink-muted dark:text-chalk-muted">
            ◉ recently watched
          </p>
          {recentFilms.length ? (
            <div className="grid max-w-[492px] grid-cols-3 gap-3 sm:grid-cols-6">
              {recentFilms.map((film) => (
                <a
                  key={film.url}
                  href={film.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="letterboxd-film group min-w-0 no-underline text-inherit"
                  title={`${film.title}${film.year ? ` (${film.year})` : ""}`}
                >
                  {film.posterUrl ? (
                    <Image
                      src={film.posterUrl}
                      alt={`Poster for ${film.title}`}
                      width={72}
                      height={108}
                      className="h-[108px] w-[72px] rounded-xs object-cover shadow-sm transition-opacity group-hover:opacity-80"
                      unoptimized
                    />
                  ) : (
                    <div className="h-[108px] w-[72px] rounded-xs bg-paper-sunken dark:bg-night-raised" />
                  )}
                  <p className="mt-1 line-clamp-2 text-xs leading-tight text-ink-muted dark:text-chalk-muted">
                    {film.title}
                  </p>
                </a>
              ))}
            </div>
          ) : (
            <a
              href={LETTERBOXD_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink underline underline-offset-4 dark:text-chalk"
            >
              Follow my film diary on Letterboxd →
            </a>
          )}
        </section>
        <p className="text-sm text-ink/60 dark:text-chalk/60 mt-6">
          Last updated: August 14, 2026
        </p>
      </article>
    </div>
  );
}
