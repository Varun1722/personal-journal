const VERCEL_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

// Set NEXT_PUBLIC_ROOT_URL once a custom domain is connected. Until then,
// Vercel's deployment URL keeps canonical URLs, OG images, and sitemaps public.
export const SITE_URL =
  process.env.NEXT_PUBLIC_ROOT_URL ?? VERCEL_URL ?? "http://localhost:3000";
export const SITE_NAME = "Varun Goyal";
export const SITE_DESCRIPTION =
  "Notes, projects, and curiosities by Varun Goyal.";
