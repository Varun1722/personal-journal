# Deployment pipeline

GitHub Actions is the single deployment controller. Vercel is only the runtime
that hosts the build artifact; do not connect this repository using Vercel's
automatic Git deployment.

```text
non-main push  → checks → Vercel preview
main push      → checks → Vercel production
```

## One-time setup

1. Create a Vercel project using the CLI, not the GitHub import screen:

   ```sh
   pnpm dlx vercel@latest login
   pnpm dlx vercel@latest link
   ```

2. In the Vercel project, add the runtime variables from `.env.local` to both
   Preview and Production. At minimum this site needs `POSTGRES_URL`,
   `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`,
   `R2_PUBLIC_URL`, and a strong `ADMIN_SECRET`.

3. Create a Vercel access token, then add these three GitHub repository
   secrets under **Settings → Secrets and variables → Actions**:

   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

   The latter two are in `.vercel/project.json` after `vercel link`. Never
   commit that directory.

4. Push a non-`main` branch to create a Preview deployment. Merge to `main`
   only after the Preview looks correct; that push makes the Production
   deployment.

5. After buying a domain, set `NEXT_PUBLIC_ROOT_URL` in Vercel for both
   environments and redeploy. Until then the assigned Vercel URL is used.

## How to inspect a deployment

Open the repository's **Actions** tab. Each run shows dependency install,
linting, tests, Vercel environment retrieval, framework build, and artifact
upload separately. The Vercel dashboard supplies runtime logs and lets you
roll back by promoting an earlier deployment.
