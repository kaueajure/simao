import type { Metadata } from 'next';
import { headers } from 'next/headers';
import '@fontsource-variable/inter';
import './globals.css';
import { appUrl } from '@/lib/env';
export const metadata: Metadata = {
  metadataBase: new URL(appUrl()),
  title: { default: 'Descoberta local · Pergunte à sua cidade', template: '%s · Descoberta local' },
  description:
    'Publique o que você procura, receba indicações de lugares reais e confirme onde encontrou. Conhecimento de pessoas da sua cidade.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Pergunte para quem conhece sua cidade',
    description: 'Pessoas indicam. Você encontra. Quem ajudou ganha pontos.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await headers();
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
