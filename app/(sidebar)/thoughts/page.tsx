import { Metadata } from "next";
import ThoughtsClient from "./ThoughtsClient";
import type { Thought } from "@/types/thoughts";
import { getDatabase } from "@/utils/database";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "thoughts",
  description: "unfiltered thoughts, stream of consciousness",
};

const INITIAL_LIMIT = 100;

async function getInitialThoughts(): Promise<Thought[]> {
  const sql = getDatabase();
  return sql`
    SELECT id, content, created_at
    FROM tweets
    ORDER BY id DESC
    LIMIT ${INITIAL_LIMIT}
  ` as unknown as Thought[];
}

export default async function ThoughtsPage() {
  const thoughts = await getInitialThoughts();
  return <ThoughtsClient initialThoughts={thoughts} />;
}
