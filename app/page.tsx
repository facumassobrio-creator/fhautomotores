import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPublishedVehicles } from '@/lib/vehiclePublicService';
import { PublicVehiclesAutoRefresh } from '@/components/PublicVehiclesAutoRefresh';
import { VehicleCard } from '@/components/VehicleCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { buildCanonicalUrl, getDefaultSeoImage, resolveAssetPath, siteConfig } from '@/config/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const defaultOgImage = getDefaultSeoImage();
export const revalidate = 120;

export const metadata: Metadata = {
  title: siteConfig.seo.homeTitle,
  description: siteConfig.seo.homeDescription,
  alternates: {
    canonical: buildCanonicalUrl('/'),
  },
  openGraph: {
    type: 'website',
    url: buildCanonicalUrl('/'),
    title: siteConfig.seo.homeTitle,
    description: siteConfig.seo.homeDescription,
    images: [defaultOgImage],
  },
  twitter: {
    card: siteConfig.seo.twitterCard,
    title: siteConfig.seo.homeTitle,
    description: siteConfig.seo.homeDescription,
    images: [defaultOgImage],
    site: siteConfig.seo.twitterSite,
    creator: siteConfig.seo.twitterCreator,
  },
};

export default async function Home() {
  const vehicles = await getPublishedVehicles();
  const vehiclePreview = vehicles.slice(0, 6);
  const { assets, contact, footer, home, social, theme } = siteConfig;
  const heroImage = resolveAssetPath(assets.hero, assets.placeholders.hero);
  const aboutImage = resolveAssetPath(assets.about, '/nosotros.jpg');

  const whatsappHref = buildWhatsAppUrl(siteConfig.messages.siteWhatsappMessage);
  const phoneHref = `tel:${contact.phone.replace(/\s+/g, '')}`;
  const instagramHref = social.instagramUrl;
  const mailHref = `mailto:${contact.email}`;
  const locationAddress = `${contact.addressLine}, ${contact.city}`;
  const locationMapEmbedSrc = home.location.mapEmbedUrl;
  const locationMapHref = home.location.mapUrl;
  const aboutParagraphs = home.about.paragraphs?.map((p) => p.trim()).filter(Boolean) ?? [];
  const aboutDescription = aboutParagraphs.length > 0
    ? aboutParagraphs.join(' ')
    : 'Simplificamos la compra y venta de vehiculos para que solo te preocupes por elegir el indicado. En FH Automotores trabajamos con unidades seleccionadas, atencion personalizada y procesos claros para que tengas una experiencia segura y rapida.';
  const featuredVehicle = vehiclePreview[0] ?? null;
  const featuredVehicleId = featuredVehicle?.id ?? '';
  const otherShowroomVehicles = vehiclePreview
    .filter((vehicle) => vehicle.id !== featuredVehicleId)
    .slice(0, 3);
  const showcasedVehicleIds = new Set([
    featuredVehicleId,
    ...otherShowroomVehicles.map((vehicle) => vehicle.id),
  ].filter(Boolean));
  const remainingVehicles = vehiclePreview.filter((vehicle) => !showcasedVehicleIds.has(vehicle.id));
  const remainingGridLayoutClass = remainingVehicles.length === 1
    ? 'mx-auto max-w-md grid-cols-1'
    : remainingVehicles.length === 2
      ? 'mx-auto max-w-5xl grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
  const processSteps = [
    {
      title: 'Tasación inicial',
      description: 'Analizamos tu usado y te damos una propuesta real en base a mercado y estado de unidad.',
    },
    {
      title: 'Propuesta y estrategia',
      description: 'Definimos si conviene permuta o consignación, con tiempos y objetivos claros.',
    },
    {
      title: 'Cierre seguro',
      description: 'Gestionamos documentación y coordinación final para concretar sin fricciones.',
    },
  ];

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#05070d] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-24 top-0 h-140 w-140 rounded-full bg-[radial-gradient(circle,rgba(30,58,138,0.44)_0%,rgba(30,58,138,0.16)_42%,rgba(0,0,0,0)_74%)]" />
        <div className="absolute -right-24 top-44 h-125 w-125 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_72%)]" />
      </div>

      <div className="relative z-10">
        <PublicVehiclesAutoRefresh />
        <Navbar />

        <section id="home" className="relative scroll-mt-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              aria-hidden
            />
            <div className="absolute inset-0 bg-black/63" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,0.48)_0%,rgba(5,7,13,0.9)_70%,#05070d_100%)]" />
            <div className="absolute inset-0" style={{ background: theme.overlays.heroAccent }} />
          </div>

          <div className="relative container mx-auto px-4 pb-10 pt-8 sm:px-6 sm:pt-10 lg:px-6 lg:pt-14">
            <div className="mx-auto max-w-7xl rounded-[1.9rem] border border-white/18 bg-black/34 p-5 shadow-[0_25px_70px_-38px_rgba(0,0,0,0.96)] backdrop-blur-md sm:p-8 lg:p-10">
              <div>
                <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-y-2">
                  <div className="hero-reveal-2">
                    <div className="hero-reveal-1 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/85">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.colors.brandPrimary }} />
                      {home.hero.badge}
                    </div>

                    <div className="mt-5 max-w-3xl">
                      <Image
                        src="/logo-navbar.png"
                        alt={siteConfig.brand.name}
                        width={460}
                        height={150}
                        priority
                        className="mb-6 h-44 w-auto object-contain md:mb-8 md:h-60 lg:h-80"
                      />
                      <h1 className="text-[clamp(1.9rem,6vw,3rem)] font-black leading-[0.98] tracking-tight" style={{ color: theme.colors.brandPrimary }}>
                        {home.hero.titleLines[1]}
                      </h1>
                    </div>

                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg">
                      {home.hero.subtitle}
                    </p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <a
                        href="#vehiculos"
                        className="premium-sheen inline-flex min-w-44 items-center justify-center rounded-xl px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-200 hover:opacity-92"
                        style={{ backgroundColor: theme.colors.brandPrimary }}
                      >
                        {home.hero.primaryCtaLabel}
                      </a>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-w-44 items-center justify-center rounded-xl border border-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-200 hover:bg-white hover:text-black"
                      >
                        {home.hero.secondaryCtaLabel}
                      </a>
                    </div>

                  </div>

                  <div className="hero-reveal-4 order-2 lg:order-2">
                    {featuredVehicle ? (
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
                        <div className="relative flex-1 rounded-2xl border border-white/12 bg-black/25 p-2 sm:p-3">
                          <VehicleCard vehicle={featuredVehicle} />
                        </div>

                        <Link
                          href="/vehicles"
                          aria-label="Ir al catalogo completo"
                          className="group inline-flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-3 text-sm font-semibold tracking-[0.01em] text-white/90 transition duration-200 hover:bg-white/5 hover:text-white sm:px-5 lg:w-auto lg:min-w-64 lg:self-center"
                          style={{
                            boxShadow: '0 8px 20px -18px rgba(0,0,0,0.8)',
                          }}
                        >
                          <span>Ver catálogo completo</span>
                          <span
                            aria-hidden
                            className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </Link>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-white/14 bg-black/35 p-8 text-center text-white/70">
                        {home.inventoryIntro.emptyState}
                      </div>
                    )}
                  </div>

                </div>

                {otherShowroomVehicles.length > 0 ? (
                  <div className="hero-reveal-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {otherShowroomVehicles.map((vehicle) => (
                      <div key={vehicle.id} className="rounded-2xl border border-white/12 bg-black/25 p-2 sm:p-3">
                        <VehicleCard vehicle={vehicle} />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              </div>
            </div>
        </section>

        <main id="vehiculos" className="section-reveal container mx-auto scroll-mt-24 px-4 pb-10 pt-16 sm:px-6 lg:px-6 lg:pt-18">
          <div className="rounded-[1.9rem] border border-white/12 bg-[#060b17]/80 p-5 sm:p-7 lg:p-9">
            <div className="grid gap-5 border-b border-white/12 pb-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-8">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: theme.colors.brandPrimary }}>
                  Continuación del stock
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {home.inventoryIntro.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                  {home.inventoryIntro.description}
                </p>
              </div>

              <div className="flex items-center lg:justify-end">
                <Link
                  href="/vehicles"
                  className="premium-sheen inline-flex w-full items-center justify-center rounded-xl border px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:opacity-90 sm:w-auto"
                  style={{
                    color: '#ffffff',
                    borderColor: theme.colors.brandPrimary,
                    backgroundColor: theme.colors.brandPrimary,
                  }}
                >
                  Ver stock completo
                </Link>
              </div>
            </div>

            {vehicles.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-white/12 bg-black/35 p-10 text-center">
                <p className="text-lg text-white/70">{home.inventoryIntro.emptyState}</p>
              </div>
            ) : remainingVehicles.length > 0 ? (
              <div className={`mt-8 grid gap-6 ${remainingGridLayoutClass}`}>
                {remainingVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : null}
          </div>
        </main>

        <section id="nosotros" className="section-reveal container mx-auto scroll-mt-24 px-4 pb-8 pt-12 sm:px-6 lg:px-6 lg:pt-16">
          <div className="overflow-hidden rounded-[1.7rem] border border-white/12 bg-[#070d1a]">
            <article className="relative min-h-70 overflow-hidden border-b border-white/12 sm:min-h-96 lg:min-h-107.5">
              <Image
                src={aboutImage}
                alt={home.about.imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/44" />
              <div className="absolute inset-0 bg-linear-to-t from-[#070d1a] via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-full border border-white/24 bg-black/44 px-4 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/82 sm:left-8 sm:bottom-8">
                FH Automotores
              </div>
            </article>

            <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-9 lg:p-10">
              <article>
                <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: theme.colors.brandPrimary }}>
                  {home.about.eyebrow}
                </p>
                <h2 className="mt-4 text-4xl font-black leading-[0.97] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {home.about.title}
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
                  {aboutDescription}
                </p>
              </article>

              <aside className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {home.about.stats.map((stat) => (
                  <div key={stat.value} className="rounded-2xl border border-white/16 bg-black/30 p-5 sm:p-6">
                    <p className="text-3xl font-black leading-none sm:text-4xl" style={{ color: theme.colors.brandPrimary }}>
                      {stat.value}
                    </p>
                    <p className="mt-3 text-sm leading-snug text-white/78 sm:text-base">{stat.label}</p>
                  </div>
                ))}
              </aside>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {home.benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="premium-sheen grid items-center gap-5 rounded-2xl border border-white/12 bg-black/35 p-5 sm:grid-cols-[68px_1fr_auto] md:grid-cols-1 md:items-start md:gap-4 sm:p-6"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-black/45" style={{ color: theme.colors.brandPrimary }}>
                  {benefit.iconKey === 'shield' && (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l7 4v6c0 5-3.5 7.5-7 8-3.5-.5-7-3-7-8V7l7-4z" /><path d="M9 12l2 2 4-4" /></svg>
                  )}
                  {benefit.iconKey === 'search' && (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.7 6.3a4 4 0 10-5.4 5.9l-4.8 4.8 2.8 2.8 4.8-4.8a4 4 0 005.9-5.4" /></svg>
                  )}
                  {benefit.iconKey === 'document' && (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 7h18M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" /><path d="M8 13h8M8 17h5" /></svg>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl tracking-tight text-white">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/72 sm:text-base">{benefit.description}</p>
                </div>
                <div className="hidden sm:flex md:hidden">
                  <span className="rounded-full border border-white/18 px-4 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/66">
                    FH Standard
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="permutas" className="section-reveal container mx-auto scroll-mt-24 px-4 pb-8 pt-14 sm:px-6 lg:px-6 lg:pt-16">
          <div className="rounded-[1.7rem] border border-white/14 bg-[#071022] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: theme.colors.brandPrimary }}>
                  Permutas y consignaciones
                </p>
                <h2 className="mt-3 text-4xl font-black leading-[0.97] tracking-tight text-white sm:text-5xl">
                  {home.permutas.title}
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/82 sm:text-base">
                  {home.permutas.description}
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-sheen mt-7 inline-flex min-w-52 items-center justify-center rounded-xl px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-200 hover:opacity-92"
                  style={{ backgroundColor: theme.colors.brandPrimary }}
                >
                  {home.permutas.ctaLabel}
                </a>
              </div>

              <div className="space-y-3">
                {processSteps.map((step, index) => (
                  <article key={step.title} className="rounded-2xl border border-white/14 bg-black/34 p-4 sm:p-5">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/60">Paso {index + 1}</p>
                    <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="section-reveal container mx-auto scroll-mt-24 px-4 pb-8 pt-14 sm:px-6 lg:px-6 lg:pt-16">
          <div className="rounded-[1.7rem] border border-white/12 bg-black/45 p-6 sm:p-8 lg:p-10">
            <div className="mb-8 grid gap-3 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: theme.colors.brandPrimary }}>
                  {home.contact.eyebrow}
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  {home.contact.title}
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-white/68 lg:text-right">
                Te respondemos por el canal que prefieras y coordinamos la mejor opción para tu próxima unidad.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-sheen rounded-xl border border-white/10 bg-black/35 p-6 transition duration-300 hover:-translate-y-0.5 hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{ borderColor: theme.colors.brandPrimary }}
              >
                <div className="mb-4" style={{ color: theme.colors.brandPrimary }}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
                </div>
                <h3 className="text-2xl tracking-tight text-white">{footer.whatsappLabel}</h3>
                <p className="mt-2 text-sm text-white/70">{contact.whatsappDisplay}</p>
              </a>

              <a
                href={phoneHref}
                className="premium-sheen rounded-xl border border-white/10 bg-black/35 p-6 transition duration-300 hover:-translate-y-0.5 hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{ borderColor: theme.colors.brandPrimary }}
              >
                <div className="mb-4" style={{ color: theme.colors.brandPrimary }}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.08 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.12.9.32 1.78.6 2.63a2 2 0 01-.45 2.11L8.1 9.91a16 16 0 006 6l1.45-1.15a2 2 0 012.11-.45c.85.28 1.73.48 2.63.6A2 2 0 0122 16.92z" /></svg>
                </div>
                <h3 className="text-2xl tracking-tight text-white">{footer.phoneLabel}</h3>
                <p className="mt-2 text-sm text-white/70">{contact.phone}</p>
              </a>

              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-sheen rounded-xl border border-white/10 bg-black/35 p-6 transition duration-300 hover:-translate-y-0.5 hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{ borderColor: theme.colors.brandPrimary }}
              >
                <div className="mb-4" style={{ color: theme.colors.brandPrimary }}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="6" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
                </div>
                <h3 className="text-2xl tracking-tight text-white">{footer.instagramLabel}</h3>
                <p className="mt-2 text-sm text-white/70">@{social.instagramHandle}</p>
              </a>

              <a
                href={mailHref}
                className="premium-sheen rounded-xl border border-white/10 bg-black/35 p-6 transition duration-300 hover:-translate-y-0.5 hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{ borderColor: theme.colors.brandPrimary }}
              >
                <div className="mb-4" style={{ color: theme.colors.brandPrimary }}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" /><path d="M22 7l-10 7L2 7" /></svg>
                </div>
                <h3 className="text-2xl tracking-tight text-white">{footer.emailLabel}</h3>
                <p className="mt-2 text-sm text-white/70">{contact.email}</p>
              </a>
            </div>
          </div>
        </section>

        <section id="ubicacion" className="section-reveal container mx-auto scroll-mt-24 px-4 pb-20 pt-14 sm:px-6 lg:px-6 lg:pt-16">
          <div className="overflow-hidden rounded-[1.8rem] border border-white/12 bg-[#070d1a]">
            <div className="relative h-82.5 w-full border-b border-white/12 sm:h-102.5 lg:h-125">
              <iframe
                title={home.location.mapTitle}
                src={locationMapEmbedSrc}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/48 via-transparent to-transparent" />
              <a
                href={locationMapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-sheen absolute right-4 top-4 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white sm:right-6 sm:top-6"
                style={{ backgroundColor: theme.colors.brandPrimary }}
              >
                Ir a Maps
              </a>
            </div>

            <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:p-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: theme.colors.brandPrimary }}>
                  {home.location.eyebrow}
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  {home.location.title}
                </h2>
                <p className="mt-5 text-white/78">{locationAddress}</p>
              </div>

              <div className="flex lg:justify-end">
                <a
                  href={locationMapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-200 hover:bg-white hover:text-black sm:w-auto"
                >
                  Abrir en Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
