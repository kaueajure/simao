import type { MetadataRoute } from 'next';
import { appUrl } from '@/lib/env';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/privacidade', '/termos'].map((path) => ({
    url: appUrl() + path,
    changeFrequency: 'monthly',
    priority: path ? 0.3 : 1,
  }));
}
