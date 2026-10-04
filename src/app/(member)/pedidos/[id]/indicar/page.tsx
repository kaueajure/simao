import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { member } from '@/server/auth';
import { uuid } from '@/lib/validation/schemas';
import { check } from '@/lib/errors';
import { PlaceSearch } from '@/components/place-search';
export const metadata = { title: 'Indicar um local' };
export default async function Indicate({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!uuid.safeParse(id).success) notFound();
  const { db, user } = await member();
  const result = await db.from('requests').select('*').eq('id', id).maybeSingle();
  const request = result.data;
  if (!request) notFound();
  if (request.requester_id === user.id || request.status !== 'OPEN') redirect('/pedidos/' + id);
  const own = await db
    .from('indications')
    .select('id')
    .eq('request_id', id)
    .eq('user_id', user.id)
    .maybeSingle();
  if (own.data) redirect('/pedidos/' + id);
  const city = check(await db.from('cities').select('*').eq('id', request.city_id).single());
  return (
    <div className="form-page">
      <Link href={'/pedidos/' + id} className="back-link">
        ← Voltar para o pedido
      </Link>
      <p className="eyebrow">Você conhece um caminho?</p>
      <h1>Indicar um local</h1>
      <p className="request-quote">“{request.description}”</p>
      <PlaceSearch requestId={id} cityId={city.id} cityName={city.name} />
    </div>
  );
}
