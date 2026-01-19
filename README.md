# Elisa Rocha Real Estate Website

A professional real estate agent website for Elisa Rocha, built with Next.js and deployed on Cloudflare Workers.

## Live Website

**[https://elisa.visibleseed.com](https://elisa.visibleseed.com)**

## Features

- **Home Page** - Hero section with agent profile, stats, featured listings, and testimonials
- **About** - Detailed agent bio and professional background
- **Listings** - Browse active, sold, and leased properties with filtering
- **Listing Details** - Full property information with image gallery
- **Reviews** - Client testimonials and ratings
- **Recommendations** - Professional endorsements
- **Neighborhoods** - Area guides for Houston neighborhoods
- **Contact** - Contact form with Discord webhook notifications (demo mode)

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Hosting:** Cloudflare Workers (via OpenNext)
- **Database:** Supabase PostgreSQL (currently using mock data for demo)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── listings/          # Listings pages
│   │   ├── page.tsx       # All listings
│   │   └── [id]/          # Listing detail
│   ├── reviews/           # Reviews page
│   ├── recommendations/   # Recommendations page
│   ├── neighborhoods/     # Neighborhood pages
│   │   ├── page.tsx       # All neighborhoods
│   │   └── [slug]/        # Neighborhood detail
│   ├── contact/           # Contact page
│   └── api/
│       └── contact/       # Contact form API
├── components/            # Reusable UI components
├── lib/
│   ├── data.ts           # Mock data (demo mode)
│   ├── supabase.ts       # Data access layer
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Utility functions
└── styles/
    └── globals.css       # Global styles
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Building for Production

```bash
# Build with OpenNext for Cloudflare
npx opennextjs-cloudflare build
```

## Deployment

The site is deployed to Cloudflare Workers:

```bash
# Deploy to Cloudflare
npx wrangler deploy
```

**Current deployment:**
- Workers URL: `elisa-realtor.coog-planner.workers.dev`
- Custom domain: `elisa.visibleseed.com`

## Configuration

### wrangler.toml

```toml
name = "elisa-realtor"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]
main = ".open-next/worker.js"

[assets]
directory = ".open-next/assets"

[[routes]]
pattern = "elisa.visibleseed.com/*"
zone_id = "7f46227ce3dcd75bad3f266ebdb82f32"
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `DISCORD_CONTACT_WEBHOOK` | Discord webhook for contact form (optional) |

## Design

**Color Palette:**
- Primary (Navy Blue): `#1e3a5f`
- Accent (Gold): `#c9a227`
- Background: `#ffffff`
- Text: `#333333`

**Typography:** Inter font family

## Demo Mode

Currently running in demo mode with mock data. To switch to database mode:

1. Ensure Supabase tables are created (schema in `setup-db.mjs`)
2. Set `USE_SUPABASE = true` in `src/lib/supabase.ts`
3. Configure `SUPABASE_ANON_KEY` environment variable

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Submit contact form |

### Contact Form Request

```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "message": "string"
}
```

## Future Enhancements

- [ ] HAR.com data sync service (Playwright-based)
- [ ] Admin panel for content management
- [ ] Email notifications (replacing Discord webhook)
- [ ] Status monitoring integration

## License

Private - All rights reserved.
