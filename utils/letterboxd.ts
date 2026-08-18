const LETTERBOXD_USERNAME = "neptune17";

export const LETTERBOXD_PROFILE_URL = `https://letterboxd.com/${LETTERBOXD_USERNAME}/`;
const LETTERBOXD_RSS_URL = `${LETTERBOXD_PROFILE_URL}rss/`;

export interface LetterboxdEntry {
  title: string;
  year: string | null;
  rating: number | null;
  watchedDate: string | null;
  posterUrl: string | null;
  url: string;
}

function readTag(item: string, tag: string) {
  const match = item.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i")
  );
  return match?.[1]?.trim() ?? null;
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16))
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function readPosterUrl(item: string) {
  const description = readTag(item, "description");
  const image = description?.match(/<img\s+src="([^"]+)"/i)?.[1];

  // The RSS feed is public, but only permit Letterboxd-hosted HTTPS images.
  return image?.startsWith("https://a.ltrbxd.com/") ? image : null;
}

function parseEntry(item: string): LetterboxdEntry | null {
  const title = readTag(item, "letterboxd:filmTitle");
  const url = readTag(item, "link");
  if (!title || !url) return null;

  const rating = Number(readTag(item, "letterboxd:memberRating"));

  return {
    title: decodeXml(title),
    year: readTag(item, "letterboxd:filmYear"),
    rating: Number.isFinite(rating) ? rating : null,
    watchedDate: readTag(item, "letterboxd:watchedDate"),
    posterUrl: readPosterUrl(item),
    url,
  };
}

export async function getRecentLetterboxdEntries(limit = 4) {
  try {
    const response = await fetch(LETTERBOXD_RSS_URL, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];

    const feed = await response.text();
    return [...feed.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
      .map((match) => parseEntry(match[1]))
      .filter(
        (entry): entry is LetterboxdEntry =>
          entry !== null && entry.rating !== null
      )
      .slice(0, limit);
  } catch {
    return [];
  }
}
