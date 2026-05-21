# 🖥️ Dashboards — Updated Spec

> **Changes summary:** Removed redundant nav items, merged overlapping sections, and folded the client onboarding flow directly into the dashboard experience instead of treating it as a separate section.

---

## 👤 Client Portal

The Client Portal gives clients a single, coherent workspace to manage their relationship with SaaSNext. New clients are guided through setup inline — no separate onboarding screen.

### Navigation (merged)

| Before | After | Reason |
|---|---|---|
| Dashboard Overview | **Home** | Renamed for clarity |
| Service Requests | merged into **Home** quick-actions | Redundant top-level item |
| Project Tracking | **Projects** | Kept as-is |
| Billing & Invoices | **Billing** | Kept as-is |
| Meeting Management | merged into **Home** next-meeting widget | Low-traffic; doesn't warrant its own nav item |
| Profile Management | **Settings** | Standard UX pattern |
| Onboarding | removed as nav item — see below | Integrated into first-run Home experience |

**Final nav (5 items):** Home · Projects · Billing · Documents · Settings

### Onboarding — integrated into Home

Instead of a standalone onboarding flow, first-time clients see a contextual setup banner on the **Home** screen that guides them through the same steps inline:

1. **Complete your company profile** → opens Settings panel in a drawer
2. **Submit your first service request** → opens the request form in-page
3. **Schedule your intro call** → opens meeting picker inline
4. **Review your welcome invoice** → links to Billing

The banner auto-dismisses once all steps are complete. Returning clients never see it.

### Core Features

- **Home:** Summary of active projects, next meeting widget, quick-action bar (new request, pay invoice, schedule call). First-run clients see the onboarding checklist here.
- **Projects:** Detailed view of active projects with progress updates and deliverable downloads.
- **Billing:** View, download, and pay invoices. Supports professional A4 HTML layouts.
- **Documents:** Centralized hub for all project-related assets and deliverables.
- **Settings:** Company details, contact info, notification preferences.

### Optimization Goals

- **Real-time updates:** Supabase subscriptions for project status and meeting changes.
- **Interactive timeline:** GSAP-animated project progress replacing static status badges.
- **Inline request form:** Multi-step service request with instant field validation — no page navigation.
- **Component modularization:** Break `page.tsx` into `ProjectStatusCard`, `NextMeetingWidget`, `OnboardingChecklist`, `QuickActionBar`.

---

## 🔐 Admin Portal

The Admin Portal provides full operational control. Navigation is consolidated to reduce context-switching between closely related functions.

### Navigation (merged)

| Before | After | Reason |
|---|---|---|
| Global Analytics | **Analytics** | Kept as-is |
| Client Management | **Clients** | Kept as-is |
| Project Management | merged into **Clients** detail view | Projects are always scoped to a client |
| Invoice Generation | merged into **Billing** | One place for all financial actions |
| Meeting Orchestration | merged into **Clients** detail view | Meeting context belongs with the client record |
| Request Triage | merged into **Clients** request tab | Requests are client-scoped |
| Package Management | **Settings → Packages** | Low-frequency config; doesn't need top-level nav |

**Final nav (4 items):** Analytics · Clients · Billing · Settings

### Core Features

- **Analytics:** Revenue tracking, lead conversion rates, project health metrics, growth forecasting (Recharts).
- **Clients:** CRM-style list with drill-down to full client record. Each record consolidates: active projects, service requests, meeting history, and invoice trail.
- **Billing:** Invoice creation, sending, and management across all clients. Bulk invoice generation supported.
- **Settings:** Package definitions, pricing, team access, audit logs.

### Optimization Goals

- **Advanced data viz:** Recharts for granular financial reporting and growth forecasting in Analytics.
- **Bulk actions:** Multi-select for status updates and batch invoice generation in Clients and Billing.
- **AI-powered insights:** LLM summaries for project health and lead quality surfaced in the client detail view.
- **Audit logs:** All admin actions logged and viewable under Settings → Audit.
- **Performance:** Refactor `page.tsx` using React Server Components for data fetching; client components only for interactive elements.

---

## 🎨 Design & UX Standards

Applies to both portals without exception.

- **Typography:** Space Grotesk (headings) + PT Sans (body). Forced dark mode.
- **Navigation:** Left sidebar, collapsible on mobile. Max 5 items per portal — no nested sub-menus beyond one level.
- **Performance:** Next.js 15 Partial Prerendering (PPR) for all dynamic dashboard widgets.
- **Accessibility:** WCAG 2.1 AA across all elements and interaction states.
- **Consistency:** Shared component library used by both portals — no duplicate implementations of cards, modals, or form elements.