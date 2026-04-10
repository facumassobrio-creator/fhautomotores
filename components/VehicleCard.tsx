import Image from 'next/image';
import Link from 'next/link';
import type { VehicleWithImages } from '@/lib/vehicleService';
import { siteConfig } from '@/config/site';
import { buildVehicleWhatsAppUrl } from '@/lib/vehicleContact';

interface VehicleCardProps {
  vehicle: VehicleWithImages;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const { id, brand, model, variant, year, price, currency, primary_image_url } = vehicle;
  const { catalog, home, theme } = siteConfig;
  const vehicleWhatsAppUrl = buildVehicleWhatsAppUrl({ brand, model, variant });
  const vehicleTitle = `${brand} ${model} ${variant ?? ''}`.trim();
  const vehicleFlags = vehicle as VehicleWithImages & {
    is_new?: boolean;
    is_reserved?: boolean;
  };
  const showNewBadge = vehicleFlags.is_new === true;
  const showReservedBadge = vehicleFlags.is_reserved === true;
  const hasPrice = typeof price === 'number' && Number.isFinite(price);
  const formattedPrice = hasPrice ? `${currency} ${price.toLocaleString()}` : 'Consultar precio';

  return (
    <article
      style={{
        backgroundColor: '#1a1d22',
        borderColor: 'rgba(255,255,255,0.12)',
      }}
      className="group relative overflow-hidden rounded-2xl border shadow-[0_12px_28px_-14px_rgba(0,0,0,0.75)] transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ border: `1px solid ${theme.colors.brandPrimary}` }}
        aria-hidden
      />

      <div className="relative aspect-16/10 overflow-hidden bg-[#0d0f12]">
        {showNewBadge || showReservedBadge ? (
          <div className="absolute left-3 top-3 z-20 flex flex-wrap items-center gap-2">
            {showNewBadge ? (
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white"
                style={{ backgroundColor: theme.colors.brandPrimary }}
              >
                Nuevo ingreso
              </span>
            ) : null}
            {showReservedBadge ? (
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white"
                style={{ backgroundColor: theme.colors.brandPrimary }}
              >
                Reservado
              </span>
            ) : null}
          </div>
        ) : null}

        <Link
          href={`/vehicles/${id}`}
          aria-label={`Ver detalle de ${vehicleTitle}`}
          className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2"
          style={{ outlineColor: theme.colors.brandPrimary }}
        >
          <span className="sr-only">Ver detalle</span>
        </Link>

        {primary_image_url ? (
          <Image
            src={primary_image_url}
            alt={vehicleTitle}
            fill
            className="object-cover transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none"
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, (max-width: 1536px) 31vw, 420px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/45">
            <span className="text-sm uppercase tracking-widest">{home.vehicleCard.noImageLabel}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-black/20" />
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">Unidad disponible</p>
          <h3 className="text-xl font-black leading-tight text-white sm:text-2xl">{vehicleTitle}</h3>
          <div className="flex items-end justify-between gap-3 border-t border-white/10 pt-3">
            <p className="text-[1.8rem] font-black leading-none text-white sm:text-[2rem]">{formattedPrice}</p>
            <p className="text-xs uppercase tracking-[0.12em] text-white/65">
              {catalog.card.yearLabel} {year}
            </p>
          </div>
        </div>

        <div className="relative z-20 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/vehicles/${id}`}
            className="premium-sheen inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.13em] text-white transition duration-200 hover:opacity-90"
            style={{ backgroundColor: theme.colors.brandPrimary }}
          >
            Ver detalle
          </Link>

          <a
            href={vehicleWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-sheen inline-flex w-full items-center justify-center rounded-lg border border-white/65 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.13em] text-white transition duration-200 hover:bg-white hover:text-black"
          >
            {catalog.card.inquiryLabel}
          </a>
        </div>

        <p className="pt-1 text-[11px] uppercase tracking-[0.12em] text-white/45">
          {home.vehicleCard.premiumBadge}
        </p>
      </div>
    </article>
  );
}