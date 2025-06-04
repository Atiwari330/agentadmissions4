'use client'; // Make it a client component

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import useSWR from 'swr';
import { fetcher } from '@/lib/utils'; // Import fetcher

interface DashboardData {
  newInquiries: number;
  conversionRate: number;
}

export default function DashboardPage() {
  const { data, error, isLoading } = useSWR<DashboardData>('/api/mock/dashboard', fetcher);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
            <CardDescription>Live data from our mock API.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && <p>Loading metrics...</p>}
            {error && <p className="text-red-500">Error loading metrics.</p>} 
            {/* Simplified error message for now, error.message might not always be suitable for UI */}
            {data && (
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">New Inquiries:</span> {data.newInquiries}
                </p>
                <p>
                  <span className="font-semibold">Conversion Rate:</span> {(data.conversionRate * 100).toFixed(0)}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Example of another card for layout demonstration
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Summary of recent activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Chart or other data will go here.</p>
          </CardContent>
        </Card>
        */}
      </div>
    </div>
  );
}
