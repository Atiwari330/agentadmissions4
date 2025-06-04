import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate some dynamic numbers
  const newInquiries = Math.floor(Math.random() * 100) + 1; // e.g., 57
  const conversionRate = Math.random() * (0.95 - 0.5) + 0.5; // e.g., 0.89

  return NextResponse.json({
    newInquiries: newInquiries,
    conversionRate: parseFloat(conversionRate.toFixed(2)),
  });
}
