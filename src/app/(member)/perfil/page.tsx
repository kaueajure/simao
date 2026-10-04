import Link from 'next/link';
import { member } from '@/server/auth';
import { check } from '@/lib/errors';
import { ProfileForm } from '@/components/profile-form';
import { Avatar } from '@/components/ui';
import { logout } from '@/server/actions';
export const metadata = { title: 'Meu perfil' };
export default async function MyProfile() {
  const { db, profile, admin, user } = await member();
  const avatar = user.user_metadata.avatar_url;
  const googlePhotoAvailable =
    typeof avatar === 'string' && /^https:\/\/lh[0-9]+\.googleusercontent\.com\//.test(avatar);
  const [cityResult, statsResult] = await Promise.all([
    db.from('cities').select('*').eq('id', profile.home_city_id).single(),
    db.rpc('profile_stats', { p_username: profile.username }),
  ]);
  const city = check(cityResult),
    stats = check(statsResult);
  return (
    <div className="form-page">
      <div className="profile-heading">
        <Avatar name={profile.display_name} url={profile.avatar_url} size={72} />
        <div>
          <p className="eyebrow">Seu lugar na comunidade</p>
          <h1>{profile.display_name}</h1>
          <p className="muted">@{profile.username}</p>
        </div>
      </div>
      <div className="profile-stats">
        <p>
          <strong>{stats.points}</strong> pontos
        </p>
        <p>
          <strong>{stats.confirmations}</strong> indicações confirmadas
        </p>
      </div>
      <nav className="profile-links">
        <Link href={'/perfil/' + profile.username}>Ver perfil público ↗</Link>
        <Link href="/atividades?tab=confirmed">Histórico de pontos ↗</Link>
        {admin ? <Link href="/admin">Administração ↗</Link> : null}
      </nav>
      <h2>Seus dados</h2>
      <ProfileForm profile={profile} city={city} googlePhotoAvailable={googlePhotoAvailable} />
      <form action={logout} className="logout-form">
        <button className="button secondary">Sair da conta</button>
      </form>
    </div>
  );
}
