import { NextResponse } from 'next/server';
import { getFoodItemById } from '@/lib/foodData';

export async function GET(request, { params }) {
  const { id } = await params;
  const item = getFoodItemById(id);

  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json({
    item,
    timestamp: new Date().toISOString(),
  });
}
