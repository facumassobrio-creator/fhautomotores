import type { MetadataRoute } from 'next';
import { buildCanonicalUrl, siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/*', '/api', '/api/*'],
    },
    sitemap: buildCanonicalUrl('/sitemap.xml'),
    host: siteConfig.seo.siteUrl,
  };
}
