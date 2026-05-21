# 🖥️ Dashboards

## 👤 Client Portal
The Client Portal is designed to provide a seamless experience for clients to manage their relationship with SaaSNext.

### Core Features
- **Dashboard Overview:** Summary of active projects, recent invoices, and quick actions.
- **Service Requests:** Submit new project inquiries and track their status.
- **Project Tracking:** Detailed view of active projects with progress updates.
- **Billing & Invoices:** View, download, and pay invoices. Supports professional A4 HTML layouts.
- **Meeting Management:** Schedule consultations and view upcoming meetings.
- **Profile Management:** Update company details and contact information.
- **Onboarding:** A guided flow for new clients to set up their accounts.

### Optimization Goals (Client)
- **Real-time Updates:** Implement Supabase real-time subscriptions for project status and meeting updates.
- **Interactive Timeline:** Replace static project status with an interactive GSAP-animated timeline.
- **Unified Request Flow:** Streamline the service request process into a multi-step form with instant validation.
- **Document Hub:** Centralize all project-related assets and deliverables.
- **Component Modularization:** Break down the large `page.tsx` into smaller, reusable dashboard widgets (e.g., `ProjectStatusCard`, `NextMeetingWidget`).

---

## 🔐 Admin Portal
The Admin Portal provides full control over the platform's operations and data.

### Core Features
- **Global Analytics:** Revenue tracking, lead conversion rates, and project health metrics.
- **Client Management:** CRM-like interface to manage client profiles and history.
- **Project Management:** Full CRUD operations on projects, including task assignments.
- **Invoice Generation:** Tooling to create, send, and manage billing.
- **Meeting Orchestration:** Calendar view for managing all client consultations.
- **Request Triage:** Interface for reviewing and approving/rejecting service requests.
- **Package Management:** Define and update service packages and pricing.

### Optimization Goals (Admin)
- **Advanced Data Viz:** Use Recharts for more granular financial reporting and growth forecasting.
- **Bulk Actions:** Implement bulk status updates and automated invoice generation.
- **AI-Powered Insights:** Integrate LLM-based summaries for project health and lead quality assessment.
- **Audit Logs:** Track all administrative actions for security and accountability.
- **Performance Tuning:** Refactor the main dashboard `page.tsx` to use React Server Components for data fetching and client components only for interactivity.

---

## 🎨 Design & UX Standards
- **Consistency:** Both dashboards must adhere to the core design system (Space Grotesk, PT Sans, Forced Dark Mode).
- **Navigation:** Left-sidebar navigation with collapsible categories for mobile responsiveness.
- **Performance:** Utilize Next.js 15 Partial Prerendering (PPR) for dynamic dashboard widgets.
- **Accessibility:** Ensure all dashboard elements meet WCAG 2.1 AA standards.
