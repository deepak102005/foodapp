import { NextResponse } from 'next/server';
import { foodItems } from '@/lib/foodData';

export async function GET() {
  return NextResponse.json({
    items: foodItems,
    count: foodItems.length,
    timestamp: new Date().toISOString(),
  });
}
