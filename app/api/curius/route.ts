export const revalidate = 3600;

export async function GET() {
  const res = await fetch("https://curius.app/api/users/4636/searchLinks", {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    return new Response(null, { status: res.status });
  }
  const data = await res.json();
  return new Response(JSON.stringify({ data }), {
    headers: { "Content-Type": "application/json" },
  });
}
