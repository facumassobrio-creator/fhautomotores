import type { Metadata } from 'next';
import { PublicVehiclesAutoRefresh } from '@/components/PublicVehiclesAutoRefresh';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { VehicleCard } from '@/components/VehicleCard';
import { getPublishedVehicles } from '@/lib/vehiclePublicService';
import { buildCanonicalUrl, buildSeoTitle, getDefaultSeoImage, siteConfig } from '@/config/site';

const listingTitle = buildSeoTitle(siteConfig.catalog.list.title);
const listingDescription = siteConfig.seo.vehiclesMetaDescription;
const listingSocialDescription = siteConfig.seo.vehiclesSocialDescription;
const defaultOgImage = getDefaultSeoImage();
export const revalidate = 120;

export const metadata: Metadata = {
  title: listingTitle,
  description: listingDescription,
  alternates: {
    canonical: buildCanonicalUrl('/vehicles'),
  },
  openGraph: {
    type: 'website',
    url: buildCanonicalUrl('/vehicles'),
    title: listingTitle,
    description: listingSocialDescription,
    images: [defaultOgImage],
  },
  twitter: {
    card: siteConfig.seo.twitterCard,
    title: listingTitle,
    description: listingSocialDescription,
    images: [defaultOgImage],
    site: siteConfig.seo.twitterSite,
    creator: siteConfig.seo.twitterCreator,
  },
};

export default async function VehiclesPage() {
  const vehicles = await getPublishedVehicles();
  const { catalog } = siteConfig;

  return (
    <div className="min-h-screen bg-brand-black text-white">
      <PublicVehiclesAutoRefresh />
      <Navbar />
      <main className="container mx-auto px-4 py-10 lg:px-6 lg:py-14">
        <section className="rounded-2xl border border-white/10 bg-black/35 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)] sm:p-8">
          <header className="mb-8 border-b border-white/10 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">{catalog.list.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{catalog.list.title}</h1>
            <p className="mt-3 max-w-3xl text-sm text-white/70 sm:text-base">
              {catalog.list.description}
            </p>
          </header>

          {vehicles.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-black/30 px-5 py-10 text-center text-white/70">
              {catalog.list.emptyState}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
