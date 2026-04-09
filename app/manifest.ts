import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  const icons = [
    { src: '/favicon.png', sizes: '32x32', type: 'image/png' },
    { src: '/favicon.png', sizes: '16x16', type: 'image/png' },
  ];

  return {
    name: siteConfig.brand.name,
    short_name: siteConfig.brand.shortName,
    description: siteConfig.seo.defaultDescription,
    start_url: '/',
    display: 'standalone',
    background_color: siteConfig.theme.colors.background,
    theme_color: siteConfig.seo.themeColor,
    icons,
  };
}
