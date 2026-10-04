import { NextRequest, NextResponse } from 'next/server';
import { apiMember } from '@/server/api-auth';
import { cityId } from '@/lib/validation/schemas';
import { check, safeError } from '@/lib/errors';
export async function GET(request: NextRequest) {
  const ctx = await apiMember();
  if (!ctx)
    return NextResponse.json(
      { error: 'Entre e complete seu perfil para continuar.' },
      { status: 401 },
    );
  const { db } = ctx;
  try {
    const city = cityId.parse(request.nextUrl.searchParams.get('cityId'));
    const q = (request.nextUrl.searchParams.get('q') || '').trim().slice(0, 300);
    if (q.length < 3) return NextResponse.json([]);
    const results = check(
      await db
        .from('requests')
        .select('*')
        .eq('city_id', city)
        .eq('status', 'RESOLVED')
        .textSearch('description', q, { type: 'websearch', config: 'portuguese' })
        .order('updated_at', { ascending: false })
        .limit(5),
    );
    return NextResponse.json(results, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    return NextResponse.json(safeError(e), { status: 400 });
  }
}
