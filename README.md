# Archipelago Charter Service — archipelagocharter.se

Static website for Archipelago Charter Service, a private charter boat operating from Strandvägen Kajplats 19, Stockholm.

## Stack

- Static HTML + inline CSS/JS
- Vercel for hosting and serverless functions
- Resend for transactional email

## Project structure

```
/index.html           → Swedish home page (https://www.archipelagocharter.se/)
/en/index.html        → English home page (https://www.archipelagocharter.se/en/)
/api/contact.js       → Vercel serverless function — handles booking form submissions
/brand_assets/        → Logo, photos, og-image
/robots.txt
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

## Deployment

1. Push to GitHub
2. Connect repo to Vercel (Framework preset: **Other**, no build command, root directory: `/`)
3. Add `RESEND_API_KEY` in Vercel environment variables
4. Add custom domain `archipelagocharter.se` in Vercel → Settings → Domains
5. Submit `/sitemap.xml` to Google Search Console after go-live

## Before going live

- [ ] Create `brand_assets/og-image.jpg` (1200×630 px) — crop of hero image with logo overlay
- [ ] Create `brand_assets/apple-touch-icon.png` (180×180 px)
- [ ] Verify the contact form end-to-end on a preview deployment
- [ ] Create a `/privacy-policy/` page (GDPR requirement)
