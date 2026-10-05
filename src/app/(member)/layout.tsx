import Link from 'next/link';
import { DesktopNavigation, MobileNavigation } from '@/components/navigation';
import { member } from '@/server/auth';
import { Brand, Avatar } from '@/components/ui';
import { Icon } from '@/components/icon';
import { ViewportContent } from '@/components/viewport-content';
export const metadata = { robots: { index: false, follow: false } };
export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const { profile, admin } = await member();
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="wrap">
          <Brand />
          <DesktopNavigation admin={admin} />
          <div className="header-account">
            <Link href="/perfil" className="profile-link" aria-label="Meu perfil">
              <Avatar name={profile.display_name} url={profile.avatar_url} size={36} />
              <span className="profile-copy">
                <strong>{profile.display_name.split(' ')[0]}</strong>
                <span>@{profile.username}</span>
              </span>
              <Icon name="chevron" size={14} />
            </Link>
            <MobileNavigation admin={admin} />
          </div>
        </div>
      </header>
      <main id="conteudo" className="app-main wrap">
        <ViewportContent>{children}</ViewportContent>
      </main>
    </div>
  );
}
