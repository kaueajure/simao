import type { MetadataRoute } from 'next';
import { appUrl } from '@/lib/env';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/privacidade', '/termos'],
      disallow: [
        '/entrar',
        '/cadastro',
        '/recuperar-senha',
        '/nova-senha',
        '/app',
        '/pedidos',
        '/perfil',
        '/atividades',
        '/ranking',
        '/admin',
        '/onboarding',
        '/api',
        '/auth',
      ],
    },
    sitemap: appUrl() + '/sitemap.xml',
  };
}
