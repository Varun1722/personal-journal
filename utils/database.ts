import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type SqlClient = NeonQueryFunction<false, false>;

let client: SqlClient | null = null;
let clientConnectionString: string | null = null;

function isPostgresConnectionString(
  value: string | undefined
): value is string {
  if (!value || value === "[SENSITIVE]") return false;

  try {
    const url = new URL(value);
    return url.protocol === "postgres:" || url.protocol === "postgresql:";
  } catch {
    return false;
  }
}

/**
 * Creates the Neon client only when a server request needs it. This keeps
 * external CI builds compatible with Vercel's redacted sensitive variables.
 */
export function getDatabase(): SqlClient {
  const connectionString = process.env.POSTGRES_URL;
  if (!isPostgresConnectionString(connectionString)) {
    throw new Error("POSTGRES_URL is unavailable or invalid");
  }

  if (!client || clientConnectionString !== connectionString) {
    client = neon(connectionString);
    clientConnectionString = connectionString;
  }

  return client;
}
