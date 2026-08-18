import { NextRequest } from "next/server";
import { checkAdminAuth } from "@/utils/adminAuth";
import { getDatabase } from "@/utils/database";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;

  const body = await request.json();
  const content = (body.body || "").trim().slice(0, 700);
  if (!content) {
    return new Response(JSON.stringify({ error: "Thought cannot be empty" }), {
      status: 400,
    });
  }

  try {
    const sql = getDatabase();
    const result =
      await sql`INSERT INTO tweets(content, created_at) VALUES(${content}, NOW()) RETURNING *`;
    return new Response(JSON.stringify({ error: null, tweet: result[0] }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Error inserting tweet" }), {
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;

  const body = await request.json();
  const id = body.id;

  try {
    const sql = getDatabase();
    await sql`DELETE FROM tweets WHERE id = ${id}`;
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Error deleting tweet" }), {
      status: 500,
    });
  }
}
