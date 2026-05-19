# Archipelago Charter Service — archipelagocharter.se

Static website for Archipelago Charter Service, a private charter boat operating from Strandvägen Kajplats 19, Stockholm.

## Stack

- Static HTML + inline CSS/JS
- Vercel for hosting and serverless functions
- Resend for transactional email

## Project structure

```
/index.html                          → Swedish home page
/en/index.html                       → English home page
/hyra-bat-stockholm/                 → SV: Hyra Båt i Stockholm
/batcharter-stockholm/               → SV: Båtcharter Stockholm
/foretagsevent-stockholm/            → SV: Företagsevent på Båt
/battransporter-stockholm/           → SV: Båttransporter Stockholm
/en/rent-boat-stockholm/             → EN: Rent a Boat in Stockholm
/en/boat-charter-stockholm/          → EN: Boat Charter Stockholm
/en/corporate-events-stockholm/      → EN: Corporate Events
/en/boat-transfers-stockholm/        → EN: Boat Transfers
/api/contact.js                      → Vercel serverless function (booking form)
/brand_assets/                       → Logo, photos, og-image
/cookie-consent.js                   → Cookie consent banner (auto-detects SV/EN)
/sitemap.xml
/favicon.svg
```

## Local development

```bash
node serve.mjs        # Serves the project at http://localhost:3000
```

## Required environment variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) — used by `/api/contact.js` to send booking emails |

Add `RESEND_API_KEY` in Vercel under **Project → Settings → Environment Variables** (scope: Production + Preview). Redeploy after adding.

Never commit `.env` or `.env.local` files — they are in `.gitignore`.

## Branch strategy

| Branch | Purpose | URL |
|--------|---------|-----|
| `main` | Production — live site | `archipelagocharter.se` |
| `staging` | Customer preview — safe to share | Vercel Preview URL (see below) |

**Rule:** never commit directly to `main`. All work goes to `staging` first, then merges to `main` after customer approval.

---

## Preview / staging workflow

### 1. Work on staging

```bash
git checkout staging          # switch to staging
git pull origin staging       # get latest
# … make changes …
git add <files>
git commit -m "describe what changed"
git push origin staging
```

### 2. Get the preview URL

After pushing, Vercel automatically builds a preview deployment. Two ways to find the URL:

**Option A — Vercel dashboard**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard) → your project
2. Click **Deployments**
3. Find the deployment tagged `staging` → click it → copy the URL at the top
   - Format: `archipelago-charter-git-staging-we3d1n.vercel.app`

**Option B — GitHub (if you open a PR)**
1. Open a Pull Request from `staging` → `main` on GitHub
2. Vercel posts a comment with the preview URL automatically
3. Share that URL with the customer

### 3. Assign a permanent staging domain (optional but recommended)

If you want a stable URL like `preview.archipelagocharter.se` instead of a hash-based URL:

1. In Vercel → Project → **Settings → Domains**
2. Click **Add domain** → type `preview.archipelagocharter.se`
3. Under **Git Branch**, select `staging`
4. Add the DNS record at your registrar (Vercel shows you the exact value)

From then on, `preview.archipelagocharter.se` always shows the latest `staging` deployment.

### 4. Customer approves → merge to production

```bash
git checkout main
git merge staging
git push origin main
```

Vercel detects the push to `main` and deploys to `archipelagocharter.se` within ~30 seconds.

---

## Deployment (first-time setup)

1. Push to GitHub
2. Connect repo to Vercel (Framework preset: **Other**, no build command, root directory: `/`)
3. Add `RESEND_API_KEY` in Vercel environment variables (scope: **Production + Preview**)
4. Add custom domain `archipelagocharter.se` in Vercel → Settings → Domains → assign to branch `main`
5. Submit `/sitemap.xml` to Google Search Console after go-live

## Before going live

- [ ] Create `brand_assets/og-image.jpg` (1200×630 px) — crop of hero image with logo overlay
- [ ] Create `brand_assets/apple-touch-icon.png` (180×180 px)
- [ ] Verify the contact form end-to-end on a preview deployment
- [ ] Create a `/privacy-policy/` page (GDPR requirement)
