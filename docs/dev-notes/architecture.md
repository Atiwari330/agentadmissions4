# Architecture & Constraint Notes (CRM Shell Feature)

This document outlines key architectural observations and constraints identified during the initial codebase reconnaissance for the CRM Shell & Navigation feature, as per user story US-V1.

## 1. Sidebar (`sidebarDocs.txt`, `tailwind.config.ts`, `components/ui/sidebar.tsx`)

*   **Component Source:** The primary sidebar component will be `components/ui/sidebar.tsx`, installed via `pnpm dlx shadcn@latest add sidebar`.
*   **Structure & Composability:** The sidebar is composed of several parts: `SidebarProvider`, `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, and `SidebarTrigger`. It's designed to be composable.
*   **State Management:**
    *   Collapsible state is handled by `SidebarProvider`.
    *   State (open/closed) is persisted to a cookie named `sidebar_state` by default. The `SidebarTrigger` component manages this.
    *   For SSR, `defaultOpen` prop of `SidebarProvider` should be set by reading the cookie on the server (e.g., in `app/layout.tsx` using `next/headers`).
    *   `SidebarTrigger` must be a client component (`"use client"`) as it interacts with `document.cookie`.
*   **Theming & CSS:**
    *   The sidebar is themeable using CSS custom properties (variables) defined in `app/globals.css`.
    *   `sidebarDocs.txt` provides the expected variables: `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, etc.
    *   `tailwind.config.ts` already includes a `sidebar` color palette that maps to these HSL variables (e.g., `DEFAULT: 'hsl(var(--sidebar-background))'`). This confirms the theming strategy.
    *   The shadcn CLI command should add these tokens to `globals.css`. They should be placed within an `@layer base` block to avoid issues with Tailwind's content purging.
*   **Dark Mode:** Supported via the `.dark` class and corresponding CSS variables. `tailwind.config.ts` is set up with `darkMode: ['class']`.
*   **Accessibility:** The sidebar should have `aria-label="Primary"`, and the trigger must be focusable with a visual outline.

## 2. Database (`lib/db/schema.ts`)

*   **ORM:** Drizzle ORM with PostgreSQL.
*   **Existing Schema:**
    *   `User`: Standard user table (id, email, password).
    *   `Chat`, `Message_v2` (and deprecated `Message`): Defines an existing chat application's data structure. `Message_v2` supports rich content via JSON `parts` and `attachments`.
    *   `Document`: Generic document storage (text, code, image, sheet).
    *   `Vote_v2`, `Suggestion`, `Stream` tables also support the chat/document features.
*   **CRM Impact:**
    *   No CRM-specific tables (Patients, Intake, Tasks) exist yet. These will be added later.
    *   The CRM shell must integrate with the existing chat functionality (US-C3), meaning the new layout will frame the chat UI.
    *   The mock data layer (US-M1, US-M2) will provide initial data for the Dashboard, not relying on these DB tables initially.

## 3. Next.js Configuration (`next.config.ts`)

*   **Experimental PPR:** `experimental: { ppr: true }` is enabled (Partial Prerendering). This is a performance feature and shouldn't directly impact shell implementation logic.
*   **Remote Images:** Configured for `avatar.vercel.sh`, likely for user avatars. Not directly relevant to initial CRM shell icons which will use `lucide-react`.
*   **Overall:** The Next.js config is minimal and poses no significant constraints on the CRM shell tasks.

## 4. Tailwind CSS (`tailwind.config.ts`)

*   **Dark Mode:** `darkMode: ['class']` is correctly set up.
*   **Content Paths:** Standard `app`, `components`, `pages` are included.
*   **Custom Fonts:** `geist` and `geist-mono` are configured.
*   **Theming:** Uses CSS HSL variables for colors, standard for shadcn/ui.
*   **Sidebar Colors:** As noted above, a `sidebar` color palette is already defined in the theme, aligning with `sidebarDocs.txt`.
*   **Plugins:** `tailwindcss-animate` and `@tailwindcss/typography` are present.

## 5. General Project Setup & Tooling

*   **Package Manager:** `pnpm` is used (inferred from `pnpm dlx shadcn...` command).
*   **Linting:** `pnpm lint` is mentioned as part of DoD. (Actual linter config e.g. `.eslintrc.json` was not explicitly reviewed under US-V1 but will be adhered to).
*   **TypeScript:** The project uses TypeScript (`.ts`, `.tsx` files, `tsconfig.json`). Strict mode adherence is required.

## TODOs from US-V1:
- [x] Read `lib/db` (specifically `lib/db/schema.ts`)
- [x] Read `next.config.ts`
- [x] Read `tailwind.config.ts`
- [x] Read `sidebarDocs.txt`
- [x] Write findings to `/docs/dev-notes/architecture.md` (this file)
