import Script from 'next/script';

// If experimental_ppr is still desired for this specific segment
export const experimental_ppr = true;

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is now a child of app/(crm)/layout.tsx,
  // which provides the main SidebarProvider, AppSidebar, etc.
  // So, this chat-specific layout should only provide elements
  // unique to the chat section within the main content area, or just pass children through.
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}
