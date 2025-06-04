# AgentAdmissions – CRM Shell & Navigation
*A self-contained backlog of **one-story-point** tasks that an execution agent can follow verbatim.*

---
## 1. Epic & Feature Breakdown (User-Story Mapping)
• **Layout Framework**  
  – Create shared `app/(crm)/layout.tsx` housing sidebar + top bar.  
  – Ensure full-height flex/grid, dark-mode support, and responsive collapse.

• **Sidebar Navigation**  
  – Install shadcn `sidebar.tsx` via CLI.  
  – Inject custom CSS tokens in `app/globals.css`.  
  – Hard-code first menu group with Dashboard, Patients, Intake, Tasks.  
  – Persist open/closed state to cookie.

• **Command Palette**  
  – Add palette dialog component using `cmdk`.  
  – Register nav actions + keyboard shortcut ⌘-K / Ctrl-K.

• **Route Skeletons**  
  – Dashboard stub page.  
  – Patients stub page.  
  – Intake stub page.  
  – Tasks stub page.

• **Mock Data Layer**  
  – API route `/api/mock/dashboard` returning JSON metrics.  
  – Dashboard card fetching via SWR.

• **Documentation & Review**  
  – README quick-start section.  
  – Human walkthrough checkpoint.

---
## 2. One-Story-Point User Stories
*(All are prepended with an unchecked box for progress tracking.)*

### Layout Framework
- [x] **US-L1 – Shell Wrapper**  
  *As an end-user I want every page framed by a consistent shell so that navigation feels seamless.*  
  **Acceptance**: Visiting any of the stub routes shows a left sidebar, slim top bar, and a content area that fills the viewport without outer scrollbars.

- [x] **US-L2 – Viewport Height**  
  *As an end-user I want the shell to occupy 100 vh so that vertical scroll occurs only inside the main content area.*  
  **Acceptance**: `document.body` shows no extra scroll when sample content height < viewport.

### Sidebar Navigation
- [x] **US-S1 – Install Sidebar Component**  
  *As a developer I want to install `sidebar.tsx` via shadcn CLI so that I avoid writing boilerplate.*  
  **Acceptance**: Running `pnpm dlx shadcn@latest add sidebar` generates `components/ui/sidebar.tsx` and adds color tokens to `globals.css` without errors.

- [x] **US-S2 – Base Menu Items**  
  *As a user I can click Dashboard, Patients, Intake, and Tasks in the sidebar so that I can move between core areas.*  
  **Acceptance**: Each link routes using Next App Router; the active page link has distinct foreground color.

- [x] **US-S3 – Collapse & Persist**  
  *As a user I can collapse the sidebar to icon-only mode and have it remain collapsed after refresh.*  
  **Acceptance**: Clicking `<SidebarTrigger>` toggles width; cookie `sidebar_state=true|false` is set; state restored on reload.

- [x] **US-S4 – Active Link Styling**  
  *As a user I can see which page I am on because the corresponding sidebar item is highlighted.*  
  **Acceptance**: The link whose `href` matches `usePathname()` receives `bg-muted` (light) or `bg-muted/20` (dark); switching routes updates highlighting.

### Command Palette
- [x] **US-C1 – Palette Dialog**  
  *As a power-user I can open a command palette with ⌘-K so that I can navigate faster.*  
  **Acceptance**: Pressing ⌘-K (or Ctrl-K on Windows) opens a modal with focus trap; Esc closes it.

- [x] **US-C2 – Palette Actions**  
  *As a user I can select “Go to Patients” from the palette to navigate without the mouse.*  
  **Acceptance**: Selecting an action pushes a new route and closes the palette.

- [x] **US-C3 – Chat Wrapped in Shell**  
  *As a user I can open the AI Chat and still see the sidebar and top bar so that navigation remains consistent.*  
  **Acceptance**: Move existing `(chat)` route under the new `(crm)` layout; chat UI streams as before while framed by the shell.

### Route Skeletons
- [x] **US-R0 – Root Redirect**  
  *As a visitor I hit `/` and am taken to the Dashboard so that the CRM shell is the first thing I see.*  
  **Acceptance**: `app/page.tsx` server component calls `redirect('/dashboard')`; visiting `/` returns a 308/302 to `/dashboard`.

- [x] **US-R1 – Dashboard Page**  
  *As a stakeholder I want a visible Dashboard stub so that I can demo route switching.*  
  **Acceptance**: `/dashboard` renders `<h2>Dashboard</h2>` and a Tailwind card.

- [x] **US-R2 – Patients / Intake / Tasks Pages**  
  *As a stakeholder I want stub pages for Patients, Intake, and Tasks so that the nav feels complete.*  
  **Acceptance**: Visiting `/patients`, `/intake`, `/tasks` shows unique headings and returns 200.

### Mock Data Layer
- [x] **US-M1 – Mock API Endpoint**  
  *As a developer I need an API route returning dashboard metrics so that the UI can fetch dynamic content.*  
  **Acceptance**: `GET /api/mock/dashboard` responds `{"newInquiries":57,"conversionRate":0.89}` (numbers may vary).

- [x] **US-M2 – SWR Integration**  
  *As a user I want the dashboard card to display numbers pulled from the mock API so that reloads show live data.*  
  **Acceptance**: Open DevTools → Network; see request; UI reflects latest JSON.

### Documentation & Human Review
- [x] **US-D1 – README Update**  
  *As a new engineer I can read quick-start steps to run the shell in under 2 min.*  
  **Acceptance**: README includes install, shadcn sidebar install, and routes list.

- [ ] **US-H1 – PM Walkthrough Checkpoint**  
  *As the PM I can review the running shell and sign-off before deeper feature work starts.*  
  **Acceptance**: PM verifies nav, palette, mock data; leaves 👍 comment; story closed.

### Assumption Validation
- [x] **US-V1 – Codebase Recon**  
  *As an engineer I will read `lib/db`, `next.config.ts`, `tailwind.config.ts`, and `sidebarDocs.txt` to document constraints before coding.*  
  **Acceptance**: Findings written to `/docs/dev-notes/architecture.md` with no TODOs left blank.

---
## 3. Prioritisation & Sequencing (Light WSJF)
1. L1 – shell wrapper  
2. S1 – install sidebar  
3. L2 – viewport height  
4. S2 – base menu  
5. R0 – root redirect  
6. R1 – dashboard page  
7. C1 – palette dialog  
8. S3 – collapse/persist  
9. S4 – active link  
10. C2 – palette actions  
11. R2 – remaining pages  
12. C3 – chat in shell  
13. M1 – mock endpoint  
14. M2 – SWR card  
15. D1 – README  
16. V1 – recon note  
17. H1 – review checkpoint
(Highest business value delivered first while maintaining smallest batch size.)

---
## 4. Dependency Notes
• **L1** precedes all sidebar tasks.  
• **S2** depends on **S1**.  
• **C2** depends on **C1** and **R2**.  
• **M2** depends on **M1** and **R1**.

---
## 5. Definition of Done (applies to every story)
1. Code committed, passes `pnpm lint` and Playwright smoke tests.  
2. PR reviewed by another engineer, no critical comments.  
3. Story checkbox changed to `[x]` in this file.  
4. README or relevant docs updated if behaviour changed.  
5. For UI stories, visual verified in both light & dark modes.

---
## 6. Roadmap Integration
**Sprint 1 (~8 pts)**  
  L1, L2, S1, S2, R0, R1  
**Sprint 2 (~8 pts)**  
  C1, S3, S4, C2, R2, C3, M1, M2, D1, V1, H1

Demo to client at end of Sprint 2.

---
## 7. Sidebar Implementation Guidance (Read *before* coding)
1. **Study `sidebarDocs.txt`** – Understand component tree: `SidebarProvider` ➝ `Sidebar` ➝ `SidebarHeader|Content|Footer` and `<SidebarTrigger>` cookie logic.  
2. **Install via CLI** – `pnpm dlx shadcn@latest add sidebar` adds the component and color tokens automatically; verify colors inside `app/globals.css`.  
3. **CSS Tokens** – Ensure the `:root` and `.dark` `--sidebar-*` vars are present; if Tailwind’s `content` layer purge removes them, add a `/* sidebar-token */` comment to keep.  
4. **Provider Placement** – Wrap the entire `(crm)` layout:  
   ```tsx
   <SidebarProvider>
     <AppSidebar />
     <main className="flex-1 min-h-dvh">
       <SidebarTrigger />
       {children}
     </main>
   </SidebarProvider>
   ```
5. **Collapse Behaviour** – The trigger toggles `open` in context and sets a cookie `sidebar_state=true|false`; do **not** add additional state.  
6. **Accessibility** – Sidebar should have `aria-label="Primary"` and trigger must be focusable with visual outline.  
7. **Icons & Links** – Use `lucide-react` icons inside `<SidebarMenuButton asChild>`. For now, use `<Link>` from `next/link` without dynamic highlights—active styling can be added later.
8. **SSR Safety** – `document.cookie` is only available client-side; ensure `SidebarTrigger` resides in a `"use client"` component.
9. **Dark-Mode** – The sidebar colors flip automatically based on `.dark` class. Confirm pages work with `prefers-color-scheme`.
10. **Common Pitfall** – Forgetting to include `<SidebarContent>` results in no scroll; always place it even if empty.

---
## 8. Execution Tips for the Agent
• **Read before edit** – Always open files with `view_file` to confirm context.  
• **Single edit_file call** – Combine multiple line edits per file into one call.  
• **Avoid global CSS purge** – When adding tokens, do so inside an `@layer base` block.  
• **Follow TS strict mode** – New components must satisfy `tsc --noEmit`.  
• **Use SWR fetcher helper** – `lib/utils.ts` already exports `fetcher`; reuse it.

---
*End of backlog – keep this file in sync with progress.*
