import { getPostMetadata } from "@/utils/content/posts";
import { getWikiMetadata } from "@/utils/content/wiki";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/config/site";

export const dynamic = "force-static";

// https://llmstxt.org — a plain-text site index for LLM consumers.
export async function GET() {
  const posts = getPostMetadata();
  const wiki = getWikiMetadata();

  const recent = posts
    .slice(0, 100)
    .map((p) => `- [${p.title}](${SITE_URL}/posts/${p.slug}): ${p.date}`)
    .join("\n");

  const wikiLinks = wiki
    .map((w) => `- [${w.title}](${SITE_URL}/wiki/${w.slug})`)
    .join("\n");

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION} ${posts.length} published blog posts.

## key pages

- [all posts](${SITE_URL}/posts)
- [about](${SITE_URL}/about)
- [now](${SITE_URL}/now)
- [rss feed](${SITE_URL}/api/rss)

## recent posts

${recent}
${wikiLinks ? `\n## wiki\n\n${wikiLinks}` : ""}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
