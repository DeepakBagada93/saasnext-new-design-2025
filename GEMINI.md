# SaaSNext Platform - Project Overview

## 🚀 Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
- **Animations:** [GSAP](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (shadcn/ui), [Lucide React](https://lucide.dev/)
- **Backend & Auth:** [Firebase](https://firebase.google.com/) (Firestore, Authentication)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Email Service:** [Nodemailer](https://nodemailer.com/)

---

## 📁 Project Structure

```text
/
├── public/                 # Static assets (logos, project images, brand assets)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── admin/          # Admin Portal (Analytics, Clients, Invoices, Projects)
│   │   ├── client/         # Client Portal (Dashboard, Requests, Profile, Projects)
│   │   ├── (public)/       # Public routes (Landing, About, Services, Portfolio)
│   │   ├── actions/        # Server Actions (Email notifications, etc.)
│   │   └── api/            # API Routes
│   ├── components/         # React Components
│   │   ├── layout/         # Layout-specific (Header, Footer, Sidebars)
│   │   ├── ui/             # Reusable UI components (shadcn/ui)
│   │   └── sections/       # Page-specific sections (Hero, Features, etc.)
│   ├── firebase/           # Firebase config, providers, and hooks
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and shared data/types
│   └── styles/             # Global styles
├── docs/                   # Project documentation (Blueprint, Backend Schema)
└── firestore.rules         # Firebase Security Rules
```

---

## 🛠 Core Features

### 1. Public Website (Lead Gen)
- **Landing Page:** Professional, high-conversion hero sections and service overviews.
- **Portfolio:** Showcasing previous work with detailed views.
- **Service Catalog:** Detailed descriptions of offerings.
- **Contact/Lead Forms:** Integrated with email notifications.

### 2. Client Portal
- **Dashboard:** Overview of active projects and pending requests.
- **Service Requests:** Submit and track new project inquiries.
- **Project Tracking:** Real-time status updates on active work.
- **Billing:** View and print professional HTML/A4 invoices.
- **Profile Management:** Manage company and contact information.

### 3. Admin Portal (Hidden Access)
- **Management:** Full CRUD on clients, service requests, and projects.
- **Analytics:** Revenue reports, lead conversion, and project health metrics.
- **Invoice Generation:** Create and manage billing for clients.
- **Meeting Management:** Schedule and track client consultations.

---

## 🔐 Database Schema (Firestore)

- `client_profiles/{uid}`: Company and contact details.
- `admin_profiles/{uid}`: Internal staff details and roles.
- `service_requests/{id}`: Leads and initial project inquiries.
- `projects/{id}`: Active and completed work.
- `invoices/{id}`: Billing data linked to projects and clients.
- `roles_admin/{uid}`: Security collection for admin access control.

---

## 🎨 Design System

- **Theme:** Forced Dark Mode (via `dark` class on `html`).
- **Primary Color:** `#29ABE2` (Trust/Reliability)
- **Secondary/Background:** `#E5F5F9` (Clean/Professional)
- **Accent Color:** `#F26A2E` (CTAs/Highlights)
- **Headlines:** `Space Grotesk` (Modern/Tech)
- **Body Text:** `PT Sans` (Readability)

---

## 🔍 SEO & Optimization

- **AI Search Optimization:** Fully optimized for GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization).
- **Structured Data:** Extensive JSON-LD implementation for `LocalBusiness`, `Service`, and `FAQPage`.
- **Analytics:** Integrated Google Ads and Google Analytics tracking.
- **Performance:** Optimized for speed with preconnecting to 3rd-party domains and deferred script loading.

---

## 📝 Development Guidelines

- **Authentication:** Use `src/firebase/auth-provider.tsx` for context.
- **Styling:** Adhere to Tailwind utility classes; use `cn()` utility for conditional classes.
- **Components:** Prefer functional components with TypeScript interfaces for props.
- **Server Actions:** Use for all mutations and side effects (like sending emails).
- **Security:** Always validate data with Zod before processing.
- **Performance:** Utilize Next.js Image component and dynamic imports for heavy components.
