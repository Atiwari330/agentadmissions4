'use client';

import type { User } from 'next-auth';
import { useRouter, usePathname } from 'next/navigation'; // Added usePathname
import clsx from 'clsx'; // Added clsx

import { PlusIcon } from '@/components/icons';
import { SidebarHistory } from '@/components/sidebar-history';
import { SidebarUserNav } from '@/components/sidebar-user-nav';
import { Button } from '@/components/ui/button';
import {
  Sidebar, // Keep one Sidebar import
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  // Added for CRM Nav
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  // End Added
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { LayoutDashboard, Users, FilePlus2, ListTodo } from 'lucide-react'; // Added icons

const crmMenuItems = [
  {
    title: "Dashboard",
    href: "/crm/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    href: "/crm/patients",
    icon: Users,
  },
  {
    title: "Intake",
    href: "/crm/intake",
    icon: FilePlus2,
  },
  {
    title: "Tasks",
    href: "/crm/tasks",
    icon: ListTodo,
  },
];

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname
  const { setOpenMobile, state: sidebarState } = useSidebar(); // Get sidebar state
  const isCollapsed = sidebarState === 'collapsed';

  return (
    <Sidebar className="group-data-[side=left]:border-r-0" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <div className={clsx("flex flex-row items-center", isCollapsed ? "justify-center" : "justify-between")}>
            <Link
              href="/"
              onClick={() => {
                setOpenMobile(false);
              }}
              className="flex flex-row gap-3 items-center"
            >
              {/* TODO: Consider a logo/icon for collapsed state if "Chatbot" text is hidden */}
              <span className={clsx("text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer", isCollapsed && "hidden")}>
                Chatbot
              </span>
            </Link>
            {/* The New Chat button is already an icon, so it might be okay. Tooltip might be an issue when collapsed. */}
            {/* Let's ensure tooltip content doesn't show when parent is hidden or button is not easily accessible */}
            <Tooltip open={isCollapsed ? false : undefined}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  type="button"
                  className="p-2 h-fit"
                  onClick={() => {
                    setOpenMobile(false);
                    router.push('/');
                    router.refresh();
                  }}
                >
                  <PlusIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end">New Chat</TooltipContent>
            </Tooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {crmMenuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={clsx(
                        "w-full justify-start",
                        isActive && "bg-muted dark:bg-muted/20"
                      )}
                    >
                      <Link href={item.href} onClick={() => setOpenMobile(false)}>
                        <item.icon className={clsx("mr-2 h-4 w-4", isActive && "text-foreground")} />
                        <span className={clsx(isActive && "text-foreground")}>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {!isCollapsed && <SidebarHistory user={user} />}
      </SidebarContent>
      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter> 
      {/* Removed isCollapsed prop as SidebarUserNav does not accept it */}
    </Sidebar>
  );
}
