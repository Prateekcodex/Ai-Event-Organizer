<div align="center">

<img src="public/spott.png" alt="Spot Logo" width="120" />

### AI-Powered Event Management Platform

*Discover. Create. Connect.*

</div>

---

## 📌 Overview

**Spot** is a full-stack, production-grade event management SaaS application that reimagines how events are created, discovered, and managed. At its core, Spot uses **Google Gemini AI** to generate complete event details from a single line of text - making event creation effortless for organizers of all kinds.

From personalized discovery feeds and QR-code-based ticketing to real-time dashboards and seamless attendee check-ins, Spot is built to handle the entire event lifecycle end-to-end.

---

## ✨ Features

### 🤖 AI-Powered Event Creation
Type a single prompt and watch Spot auto-generate a complete event — title, description, category, capacity, ticket type, pricing, and more — using the **Google Gemini API**. You can then review, edit, and publish in seconds.

### 🎯 Personalized Event Discovery
New users go through a guided onboarding flow where they select their **interests** and **location**. The explore page then curates:
- Featured events (carousel)
- Events near you (local)
- Events by category
- Popular events nationwide

### 🔐 Authentication & User Management
Powered by **Clerk**, Spot handles:
- Secure sign-in and sign-up flows
- Protected routes via middleware
- User profile management
- Dark mode preference

### 🎟️ QR Code Ticketing System
Each registered attendee receives a **unique QR-coded ticket**. Organizers can scan these at the venue using the built-in camera scanner (powered by `html5-qrcode`) or enter codes manually for check-in.

### 📊 Real-Time Organizer Dashboard
Organizers get a powerful dashboard with live data (via Convex):
- Total registrations & check-in count
- Revenue earned
- Check-in rate percentage
- Time remaining to event
- Attendee list with search and tab filtering (All / Checked-in / Pending)
- CSV export of all registrations

### 💳 Subscription Plans (Free & Pro)
Billing is handled through **Clerk Billing**:

| Feature | Free | Pro |
|---|---|---|
| Events you can create | 1 | Unlimited |
| AI event generation | ✅ | ✅ |
| Custom event theme colors | ❌ | ✅ |
| QR ticketing & check-in | ✅ | ✅ |
| Analytics dashboard | ✅ | ✅ |

### 🖼️ Cover Image via Unsplash
A beautiful image picker powered by the **Unsplash API** is integrated into event creation, letting organizers search and select high-quality cover photos without leaving the app.

### 🔍 Search & Location Filtering
A debounced search bar and location selector (state + city) let users find exactly what they're looking for. Powered by the `country-state-city` npm package.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [ShadCN UI](https://ui.shadcn.com/) |
| **Database** | [Convex](https://convex.dev/) (Realtime, reactive) |
| **Auth & Billing** | [Clerk](https://clerk.dev/) |
| **AI** | [Google Gemini API](https://ai.google.dev/) |
| **Images** | [Unsplash API](https://unsplash.com/developers) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **QR Codes** | `react-qr-code` (generation) + `html5-qrcode` (scanning) |

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/                  # Sign-in & Sign-up pages (Clerk)
│   ├── (main)/                  # Protected user pages
│   │   ├── create-event/        # Event creation form + AI creator modal
│   │   ├── my-events/           # Organizer event list & dashboard
│   │   └── my-tickets/          # Attendee ticket viewer
│   ├── (public)/                # Publicly accessible pages
│   │   ├── events/[slug]/       # Individual event detail page
│   │   └── explore/             # Event discovery / explore page
│   ├── api/
│   │   └── generate-event/      # Server-side Gemini API route
│   ├── ConvexClientProvider.jsx # Convex context provider
│   └── layout.js                # Root layout with theme & auth
│
├── components/
│   ├── ui/                      # ShadCN UI base components
│   ├── event-card.jsx           # Reusable event card (grid/list)
│   ├── header.jsx               # Global navigation header
│   ├── footer.jsx               # Global footer
│   ├── onboarding-modal.jsx     # Interest + location onboarding
│   ├── search-location-bar.jsx  # Search bar + location picker
│   ├── unsplash-image-picker.jsx# Cover photo modal (Unsplash)
│   └── upgrade-modal.jsx        # Pro upgrade prompt modal
│
├── convex/
│   ├── schema.js                # Database schema (users, events, registrations)
│   ├── users.js                 # User queries & mutations
│   ├── events.js                # Event CRUD operations
│   ├── registrations.js         # Registration & check-in logic
│   ├── dashboard.js             # Organizer dashboard data
│   ├── explore.js               # Explore/discovery queries
│   ├── search.js                # Full-text search index
│   └── seed.js                  # Seed data for development
│
├── hooks/
│   ├── use-store-user.jsx       # Syncs Clerk user with Convex DB
│   ├── use-onboarding.jsx       # Onboarding state management
│   └── use-convex-query.js      # Abstracted Convex query hook
│
└── lib/
    ├── data.js                  # Static data (categories, etc.)
    ├── location-utils.js        # City/state helpers
    └── utils.js                 # General utility functions
```

---

## 🗄️ Database Schema

### `users`
| Field | Type | Description |
|---|---|---|
| `name` | string | Full name |
| `email` | string | Email address |
| `tokenIdentifier` | string | Clerk token (indexed) |
| `imageUrl` | string? | Profile image |
| `hasCompletedOnboarding` | boolean | Onboarding status |
| `location` | object | `{ city, state }` |
| `interests` | array | Selected categories |
| `freeEventsCreated` | number | Free tier usage counter |

### `events`
| Field | Type | Description |
|---|---|---|
| `title` | string | Event title |
| `slug` | string | URL-friendly identifier (indexed) |
| `description` | string | Full event description |
| `organizerId` | string | Reference to user (indexed) |
| `category` | string | Event category (indexed) |
| `tags` | array | Searchable tags |
| `startDate` / `endDate` | number | Unix timestamps |
| `timeZone` | string | Timezone string |
| `location` | object | `{ city, state, country }` |
| `capacity` | number | Max attendees |
| `ticketType` | string | `free` or `paid` |
| `ticketPrice` | number? | Price in USD |
| `coverImage` | string | Image URL |
| `themeColor` | string? | Hex color (Pro only) |
| `registrationCount` | number | Current registrations |

### `registrations`
| Field | Type | Description |
|---|---|---|
| `eventId` | string | Reference to event (indexed) |
| `userId` | string | Reference to user (indexed) |
| `attendeeName` | string | Name at registration |
| `attendeeEmail` | string | Email at registration |
| `qrCode` | string | Unique QR code value (indexed) |
| `checkedIn` | boolean | Check-in status |
| `checkedInAt` | number? | Check-in timestamp |
| `status` | string | `confirmed` or `cancelled` |

---

## 🔌 Core API Reference

| Function | Type | Description |
|---|---|---|
| `createEventMutation` | Mutation | Creates event; enforces free-tier limits |
| `getFeaturedEvents` | Query | Top events sorted by registration count |
| `getEventsByLocation` | Query | Events filtered by user's city/state |
| `getEventsByCategory` | Query | Events filtered by category |
| `searchEvents` | Query | Full-text search on event titles |
| `completeOnboarding` | Mutation | Saves user interests and location |
| `registerForEvent` | Mutation | Registers user; generates unique QR code |
| `cancelRegistration` | Mutation | Cancels a registration |
| `checkInAttendee` | Mutation | Marks attendee as checked-in via QR |
| `getEventDashboard` | Query | Organizer stats, attendee list, revenue |
| `generateEventAI` | API Route | Calls Gemini to generate event details |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Convex](https://convex.dev/) account
- A [Clerk](https://clerk.dev/) account
- Google Gemini API key
- Unsplash API access key

### 1. Clone the Repository

```bash
git clone https://github.com/Saket22-CS/Ai_Event_Organizer.git
cd spot-event-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Unsplash
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

### 4. Initialize Convex

```bash
npx convex dev
```

This will set up your Convex backend and push the schema automatically.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment

### Vercel (Frontend)

1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com/).
3. Add all environment variables from `.env.local` in the Vercel dashboard.
4. Deploy - Vercel auto-detects Next.js and configures the build.

### Convex (Backend)

```bash
npx convex deploy
```

This pushes your schema and functions to Convex's production environment. Update your `NEXT_PUBLIC_CONVEX_URL` in Vercel to point to the production deployment URL.

---

## 📱 Key User Flows

### For Attendees
1. **Sign up** → Complete **onboarding** (pick interests + location)
2. **Explore** personalized events → View event details
3. **Register** for an event → Receive a **QR-coded ticket**
4. View tickets in **My Tickets** → Show QR at the venue

### For Organizers
1. **Create an event** — manually or via **AI prompt**
2. Pick a cover image from **Unsplash**
3. Share the event link with attendees
4. **Dashboard** — track registrations, check-in attendees via **QR scanner**, export CSV

---

## 🧠 AI Event Generation

The AI creation flow is powered by **Google Gemini**. Here's how it works:

1. The user types a prompt (e.g., *"Tech networking night in San Francisco for startup founders"*)
2. The frontend sends the prompt to `/api/generate-event`
3. The Next.js API route calls Gemini with a structured system prompt requesting JSON output
4. The response is parsed and injected directly into the event creation form
5. The user reviews and adjusts before publishing

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Spot:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push and open a Pull Request

Please open an issue first for major changes.

---

<div align="center">

Built with ❤️ using Next.js, Convex, Clerk, and Google Gemini

</div>
