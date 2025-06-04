import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CrmSidebarTrigger } from "@/components/crm-sidebar-trigger";
import { auth } from "@/app/(auth)/auth";
import { CommandPalette } from "@/components/command-palette"; // Added CommandPalette import
// Removed import of User from "@/lib/db/schema"

export default async function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user; // Simplified user assignment

  const cookieStore = await cookies(); // Added await based on TS error
  // Default cookie name for sidebar state is "sidebar_state"
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <CommandPalette /> {/* Added CommandPalette component */}
      <div className="flex h-screen bg-background text-foreground">
        <AppSidebar user={user} />
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Placeholder for Top Bar */}
          <header className="h-14 shrink-0 border-b flex items-center px-4">
            <CrmSidebarTrigger />
            <span className="ml-4 font-semibold">AgentAdmissions CRM</span> {/* Placeholder title */}
          </header>
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
