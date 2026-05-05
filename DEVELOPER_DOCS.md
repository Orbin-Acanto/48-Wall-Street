# 48 Wall Street — Developer Documentation

> Last updated: 2026-05-05

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Getting Started](#3-getting-started)
4. [Environment Variables](#4-environment-variables)
5. [Project Structure](#5-project-structure)
6. [Routing & Pages](#6-routing--pages)
7. [Key Components](#7-key-components)
8. [API Routes](#8-api-routes)
9. [External Integrations](#9-external-integrations)
10. [Styling](#10-styling)
11. [3D Floor Plan Viewer](#11-3d-floor-plan-viewer)
12. [Document Signing Flow](#12-document-signing-flow)
13. [Deployment](#13-deployment)
14. [Security](#14-security)

---

## 1. Project Overview

**48 Wall Street** is a marketing and booking website for a historic 1927 event venue in Lower Manhattan, NYC. The site handles:

- Venue showcasing (spaces, gallery, amenities, virtual tour)
- Lead generation (contact forms, rental requests)
- Event planning tools (interactive 3D floor plan editor, flipbooks)
- Digital document signing (AV form, client guidelines, credit card auth, floor plan)
- AI chatbot for visitor inquiries

The project is a **Next.js 15 App Router** application with React 19 and TypeScript.

---

## 2. Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js (App Router) | ^15.5.12 |
| UI Library | React | 19.1.0 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | v4 |
| Animations | Framer Motion | ^12.23.22 |
| 3D Rendering | Three.js | ^0.180.0 |
| PDF Generation | jsPDF, pdf-lib | latest |
| Rate Limiting | @upstash/ratelimit + Redis | latest |
| Analytics | Vercel Analytics, Google Analytics 4 | latest |
| Automation Backend | N8N (self-hosted on Railway) | — |
| Build Tool | Turbopack | built-in |
| Containerization | Docker | multi-stage |

---

## 3. Getting Started

### Prerequisites

- Node.js >= 20
- npm

### Install & Run

```bash
npm install
npm run dev        # Development server with Turbopack
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # Run ESLint
```

The dev server starts at `http://localhost:3000`.

### Docker

```bash
docker build -t 48-wall-street .
docker run -p 3000:3000 --env-file .env.local 48-wall-street
```

The Dockerfile is a 3-stage build (deps → builder → runner) targeting node:20-alpine. During the build stage it downloads 3D GLB model files from GitHub Releases and places them in `public/floor-plans/`.

---

## 4. Environment Variables

Create a `.env.local` file at the project root. All variables below are required for full functionality.

```bash
# ── N8N Automation Backend ──────────────────────────────────────────
N8N_USERNAME=                    # N8N basic auth username
N8N_PASSWORD=                    # N8N basic auth password
N8N_LEAD_WEBHOOK_URL=            # Contact form → N8N workflow
N8N_CHAT_WEBHOOK_URL=            # AI chatbot → N8N workflow
N8N_RENTAL_WEBHOOK_URL=          # Rental request → N8N workflow
N8N_FLIPBOOK_API=                # Flipbook data endpoint
N8N_DOCUSIGN_API=                # Document generation → N8N
N8N_DOCUSIGN_SUBMIT_API=         # Signed document submission → N8N

# ── Site ────────────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=            # Full URL, e.g. https://48wallstreet.com

# ── Google reCAPTCHA v3 ─────────────────────────────────────────────
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=  # Public site key (safe to expose)
RECAPTCHA_SECRET_KEY=            # Server-side secret key (never expose)

# ── Document Signing ────────────────────────────────────────────────
SIGNING_SECRET=                  # Secret for generating/verifying signing tokens

# ── Upstash Redis (rate limiting) ───────────────────────────────────
UPSTASH_REDIS_REST_URL=          # Upstash Redis REST endpoint
UPSTASH_REDIS_REST_TOKEN=        # Upstash Redis auth token
```

> **Note:** `NEXT_PUBLIC_` variables are exposed to the browser. All others are server-only.

---

## 5. Project Structure

```
src/
├── app/                  # Next.js App Router — pages and API routes
│   ├── (pages)/          # Route groups and page directories
│   ├── api/              # Server-side API handlers
│   ├── layout.tsx        # Root layout (Navbar, Footer, Analytics, SEO)
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles + Tailwind imports
│
├── components/           # Reusable UI components
│   └── FloorPlanEditor/  # Multi-file interactive floor plan editor
│
├── sections/             # Full-width page sections used in pages
├── lib/                  # Server-only utilities (rate limiting, helpers)
├── utils/                # Client utilities (PDF export, 3D geometry, etc.)
├── hooks/                # Custom React hooks (floor plan state, interactions)
├── contexts/             # React Context providers (CartContext)
├── types/                # TypeScript type definitions
├── data/                 # Static data (testimonials, amenities, gallery)
├── constants/            # App-wide constants
└── ui/                   # Primitive UI components

public/
├── floor-plans/          # 3D GLB model files (e.glb, f.glb)
├── gallery/              # Photo gallery images
├── videos/               # Background video
└── (other assets)/       # Organized by category
```

---

## 6. Routing & Pages

The app uses the **Next.js App Router**. All routes live under `src/app/`.

### Public Routes

| Path | Description |
|------|-------------|
| `/` | Home page — hero, about, gallery, amenities, contact |
| `/about` | Venue overview |
| `/about/floor-plans` | Interactive 3D floor plan viewer |
| `/about/virtual-tour` | Embedded virtual tour |
| `/about/digital-brochure` | Flipbook brochure |
| `/about/customize-plan` | Floor plan editor |
| `/about/event-video` | Venue video |
| `/about/rules-regulations` | Rules & regulations |
| `/events/corporate` | Corporate events page |
| `/events/weddings` | Weddings page |
| `/events/[type]` | Other event types (conferences, fashion-shows, etc.) |
| `/services/production` | AV/Production services |
| `/services/catering` | Catering services |
| `/services/rentals` | Equipment rental catalog |
| `/spaces/grand-mezzanine` | Grand Mezzanine space details |
| `/spaces/concourse-level` | Concourse Level space details |
| `/gallery` | Full photo gallery |
| `/location` | Map and directions |
| `/contact` | Contact form |
| `/rentals` | Rental request page |
| `/flipbook/[slug]` | Dynamic flipbook viewer |
| `/sign/av-form` | AV equipment sign-off form |
| `/sign/client-guidelines` | Client guidelines sign-off |
| `/sign/credit-card-auth` | Credit card authorization |
| `/sign/floor-plan` | Floor plan sign-off |
| `/thank-you` | Post-submission confirmation |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |

### Admin Routes

| Path | Description |
|------|-------------|
| `/admin/document-request` | Trigger document send to clients |
| `/admin/inventory-preview` | Preview rental inventory |

### Redirects

`next.config.ts` defines 60+ redirects mapping old site URLs to new routes. When adding new pages that replace old slugs, add the redirect there.

---

## 7. Key Components

### Layout Components

| Component | Location | Description |
|-----------|----------|-------------|
| `Navbar` | `components/Navbar.tsx` | Top navigation with responsive mobile menu |
| `Footer` | `components/Footer.tsx` | Site footer with links and contact info |
| `ChatBotWidget` | `components/ChatBotWidget.tsx` | Floating AI chat — proxies to N8N chat webhook |
| `SocialMediaSidebar` | `components/SocialMediaSidebar.tsx` | Fixed social media icon panel |
| `ContactUsSlider` | `components/ContactUsSlider.tsx` | Slide-in contact panel |

### Section Components (used in pages)

| Component | Description |
|-----------|-------------|
| `HeroSection` | Full-screen hero with video background and call-to-action |
| `About` | Venue introduction section |
| `VenueAmenities` | Icon grid of amenities |
| `PhotoGallery` | Masonry photo gallery |
| `Testimonial` | Client testimonials carousel |
| `ParallaxSection` | Video-background parallax divider |
| `CateringParralax` | Catering-focused parallax section |
| `Venuelevels` | Visual floor-level diagram |

### Feature Components

| Component | Description |
|-----------|-------------|
| `FloorPlan3DViewer` | Three.js 3D floor plan with camera controls, labels, highlights |
| `FloorPlanEditor/` | Multi-file canvas-based 2D floor plan designer with drag-and-drop furniture |
| `BookReader` | `react-pageflip` flipbook viewer |
| `GalleryContent` | Filterable photo gallery using `react-grid-gallery` |
| `EventCard` | Reusable event type card with image and description |
| `ContactUs` | Embedded lead generation form with reCAPTCHA |
| `ContactFormModal` | Modal version of the contact form |

### Floor Plan Editor (`components/FloorPlanEditor/`)

The floor plan editor is a large, multi-file feature. Key sub-components:

- `Canvas.tsx` — Main drawing canvas
- `Toolbar.tsx` — Tool palette (select, draw, shapes)
- `Sidebar.tsx` — Properties panel
- `FurniturePanel.tsx` — Drag-and-drop furniture library
- `ExportModal.tsx` — PDF/PNG export dialog

State is managed via custom hooks in `src/hooks/`:
- `useFloorPlanState.ts` — Global editor state
- `useCanvasInteraction.ts` — Mouse/touch handling
- `useDragAndDrop.ts` — Furniture drag-and-drop
- `useKeyboardShortcuts.ts` — Keyboard shortcuts

---

## 8. API Routes

All routes live under `src/app/api/`.

### `POST /api/contact-form`

Handles lead generation form submissions.

**Spam protections (layered):**
1. Honeypot field (`website` field must be empty)
2. Minimum 5-second form fill time
3. Google reCAPTCHA v3 server-side verification
4. Upstash Redis rate limit — **2 submissions per IP per day**

**Payload fields:** `name`, `email`, `company`, `phone`, `eventDate`, `eventTime`, `eventType`, `guestCount`, `message`, `attachments[]`

Forwards to `N8N_LEAD_WEBHOOK_URL` via Basic Auth.

---

### `POST /api/chat` (Edge Runtime)

Proxies chat messages to the N8N chatbot workflow. Supports streaming responses (`text/event-stream`). Handles CORS for cross-origin requests.

---

### `/api/documents/`

Three sub-routes for the document signing flow:

| Route | Method | Purpose |
|-------|--------|---------|
| `generate-token` | POST | Create a time-limited signed token for document access |
| `send` | POST | Trigger N8N to email a signing link to a client |
| `verify-token` | POST | Validate a token before showing the signing form |

Tokens are signed using `SIGNING_SECRET`. See [Document Signing Flow](#12-document-signing-flow) for the full sequence.

---

### `GET /api/drive-image`

Proxies image fetches from Google Drive (avoids CORS issues on the client).

---

### `POST /api/rental`

Accepts rental request form data and forwards it to `N8N_RENTAL_WEBHOOK_URL`.

---

### `POST /api/sign/submit`

Final step of the signing flow — submits the completed signed form to `N8N_DOCUSIGN_SUBMIT_API`.

---

## 9. External Integrations

### N8N (Automation Backend)

N8N runs self-hosted on Railway. It handles all backend workflows:

- **Contact form** → CRM entry + email notification
- **Rental request** → CRM entry + email notification
- **Chat** → AI chatbot responses (likely via OpenAI or Claude)
- **Flipbook data** → Returns PDF/flipbook metadata
- **Document generation** → Produces PDF from template, emails link
- **Document submission** → Receives signed form, stores/emails it

All API routes authenticate to N8N using HTTP Basic Auth (`N8N_USERNAME` / `N8N_PASSWORD`).

### Google reCAPTCHA v3

Used on the contact form. The client renders the widget invisibly and sends a token; the server verifies it at `/api/contact-form`. Score threshold is configurable in the API handler.

### Upstash Redis

Used only for rate limiting the contact form (via `@upstash/ratelimit`). The sliding window is 2 requests per 24 hours per IP.

See `src/lib/rate-limit.ts` for implementation.

### Vercel

- `@vercel/analytics` — Page view and web vitals tracking
- `@vercel/speed-insights` — Core Web Vitals reporting

Both are injected in `src/app/layout.tsx`.

### Google Analytics 4

GA4 and conversion tracking scripts are loaded in the root layout. The measurement ID and conversion IDs are hardcoded in `layout.tsx` — update them there if the GA property changes.

### Calendly

Embedded on relevant pages via `react-calendly`. Update the Calendly URL in the component if the account changes.

---

## 10. Styling

### Tailwind CSS v4

The project uses Tailwind v4 (`@tailwindcss/postcss`). Configuration is primarily handled in `src/app/globals.css` rather than a `tailwind.config.ts`.

### Custom Design Tokens (CSS Variables)

Defined in `globals.css`:

```css
--color-golden: #d2b371      /* Primary brand gold */
--color-whitesmoke: ...
--color-whites: ...
--color-grays: ...
--color-dark-black: ...
```

Use these via Tailwind utilities like `text-golden`, `bg-golden`.

### Custom Fonts

Loaded via Google Fonts in `layout.tsx`:

- `Gilda Display` — serif headings
- `Montserrat` — body / sans-serif

CSS font utilities: `font-gilda`, `font-montserrat`

### Custom Component Classes

```css
.heading-hero      /* Large hero headings */
.text-lead         /* Intro paragraph text */
```

---

## 11. 3D Floor Plan Viewer

Located at `/about/floor-plans`, the viewer renders interactive 3D models of the venue.

**Models:**
- `public/floor-plans/e.glb` — Grand Mezzanine
- `public/floor-plans/f.glb` — Concourse Level

These files are **not tracked in git** — they're downloaded during the Docker build step from GitHub Releases. If you need to update the models:
1. Upload new `.glb` files to the GitHub Release
2. Update the download URLs in `Dockerfile`

**Component:** `src/components/FloorPlan3DViewer.tsx`

Utilities in `src/utils/`:
- `geometryUtils.ts` — Bounding box, center calculation
- `ThreeDviewerutils.tsx` — Camera, lighting, renderer setup
- `conversionUtils.ts` — Unit conversions

---

## 12. Document Signing Flow

The digital signing system allows the admin to send clients a secure, one-time signing link.

### Flow

```
Admin opens /admin/document-request
  └─> Fills in client info + document type
      └─> POST /api/documents/send
          └─> Calls N8N_DOCUSIGN_API
              └─> N8N generates the document PDF
              └─> Calls /api/documents/generate-token → gets signed URL token
              └─> Emails client a link: /sign/[form-type]?token=<token>

Client opens the link
  └─> Page calls POST /api/documents/verify-token
      └─> Token valid → form renders
      └─> Token invalid/expired → error shown

Client fills & submits the form
  └─> POST /api/sign/submit
      └─> Forwards to N8N_DOCUSIGN_SUBMIT_API
          └─> N8N stores signed document + sends confirmation emails
```

**Document types:**
- `av-form` — AV equipment agreement
- `client-guidelines` — Venue rules sign-off
- `credit-card-auth` — Credit card authorization form
- `floor-plan` — Floor plan approval

---

## 13. Deployment

### Vercel (recommended)

1. Push to `main` branch — Vercel auto-deploys.
2. Set all environment variables in the Vercel project dashboard.
3. The `output: 'standalone'` in `next.config.ts` is used for Docker only; Vercel ignores it.

### Docker / Railway

```bash
docker build -t 48-wall-street .
docker run -p 3000:3000 --env-file .env.local 48-wall-street
```

The Dockerfile expects all `.env.local` variables to be passed at runtime (not baked into the image).

### Production Checklist

- [ ] All `.env.local` variables set in the deployment environment
- [ ] `NEXT_PUBLIC_SITE_URL` set to the live domain
- [ ] reCAPTCHA domain allowlist updated for the live domain
- [ ] N8N webhooks reachable from the production server
- [ ] Upstash Redis connection active
- [ ] GLB files available at `public/floor-plans/` (Docker: handled by Dockerfile)

---

## 14. Security

### Rate Limiting

Contact form is limited to **2 submissions per IP per 24 hours** using Upstash Redis sliding window.  
Implementation: `src/lib/rate-limit.ts`

### reCAPTCHA

Google reCAPTCHA v3 is verified server-side in `src/app/api/contact-form/route.ts`. The score threshold and action name are defined there.

### Honeypot

The contact form includes a hidden `website` field. If it is populated (by bots), the submission is silently rejected.

### Document Tokens

Signing tokens are HMAC-signed using `SIGNING_SECRET`. They include an expiry timestamp and the document type. Tokens are verified before the signing form is rendered and before submission is accepted.

### Security Headers

Set in `next.config.ts` for all responses:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Credentials

- Never commit `.env.local` to git (it is in `.gitignore`).
- The N8N admin credentials in `.env.local` grant full access to all automation workflows — rotate them if compromised.
- `SIGNING_SECRET` invalidates all outstanding signing links if rotated — coordinate with any pending document signings.
