import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/crm/dashboard'); // Updated to redirect to /crm/dashboard
  // Although redirect() is called, Next.js requires a component to return JSX or null.
  // In practice, the redirect happens before rendering, but to satisfy types:
  return null;
}
