import { getContactAddress, siteConfig } from '@/config/site';

export function Footer() {
  const { brand, contact, footer, social } = siteConfig;
  const address = getContactAddress();

  return (
    <footer className="border-t border-white/10 bg-linear-to-b from-[#05070d] via-[#04060b] to-[#030409] text-white">
      <div className="container mx-auto px-4 py-12 lg:px-6 lg:py-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          <article className="rounded-2xl border border-white/12 bg-[#0a0f1a] p-5 sm:p-6">
            <h3 className="border-l-3 pl-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/88" style={{ borderColor: '#1E3A8A' }}>
              {footer.scheduleLabel}
            </h3>
            <div className="mt-4 space-y-2">
              {contact.businessHours.map((businessHour) => (
                <p key={businessHour.label} className="text-sm leading-relaxed text-white/72">
                  {businessHour.label}: {businessHour.value}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/12 bg-[#0a0f1a] p-5 sm:p-6">
            <h3 className="border-l-3 pl-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/88" style={{ borderColor: '#1E3A8A' }}>
              {footer.locationLabel}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/72">{address}</p>
          </article>

          <article className="rounded-2xl border border-white/12 bg-[#0a0f1a] p-5 sm:p-6">
            <h3 className="border-l-3 pl-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/88" style={{ borderColor: '#1E3A8A' }}>
              {footer.contactLabel}
            </h3>
            <div className="mt-4 space-y-2 text-sm leading-relaxed text-white/72">
              <p>{footer.whatsappLabel}: {contact.whatsappDisplay}</p>
              <p>{footer.phoneLabel}: {contact.phone}</p>
              <p>{footer.emailLabel}: {contact.email}</p>
            </div>
          </article>

          <article className="rounded-2xl border border-white/12 bg-[#0a0f1a] p-5 sm:p-6">
            <h3 className="border-l-3 pl-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/88" style={{ borderColor: '#1E3A8A' }}>
              {footer.socialLabel}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/72">{footer.instagramLabel}: @{social.instagramHandle}</p>
          </article>
        </div>

        <div className="mt-8 border-t border-white/12 pt-6 text-center text-[11px] uppercase tracking-[0.22em] text-white/62">
          {footer.bottomText || brand.commercialName || brand.name}
        </div>

        {footer.showAgencyCredit ? (
          <div className="mt-4 border-t border-white/10 pt-5 text-center text-xs text-white/58">
            {footer.creditText}{' '}
            {footer.creditHighlightText ? (
              <span className="font-semibold" style={{ color: '#1E3A8A' }}>{footer.creditHighlightText}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
