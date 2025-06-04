'use client';

import React, { useState, useEffect } from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup, // Added
  CommandItem,  // Added
} from 'cmdk';
import { useRouter } from 'next/navigation'; // Added
import { LayoutDashboard, Users, FilePlus2, ListTodo, MessageCircle } from 'lucide-react'; // Added icons, MessageCircle

// Define command actions
const commandActions = [
  {
    title: "Go to Dashboard",
    href: "/crm/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Go to Patients",
    href: "/crm/patients",
    icon: Users,
  },
  {
    title: "Go to Intake",
    href: "/crm/intake",
    icon: FilePlus2,
  },
  {
    title: "Go to Tasks",
    href: "/crm/tasks",
    icon: ListTodo,
  },
  {
    title: "Go to Chat",
    href: "/crm/chat",
    icon: MessageCircle,
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter(); // Added router

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((currentOpen) => !currentOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // The onOpenChange callback for CommandDialog expects a boolean argument.
  // We can directly use setOpen here.
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {commandActions.map((action) => (
            <CommandItem
              key={action.href}
              onSelect={() => {
                router.push(action.href);
                setOpen(false);
              }}
              value={action.title} // Add a value for filtering
            >
              <action.icon className="mr-2 h-4 w-4" />
              <span>{action.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
