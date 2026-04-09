"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { buildGeneralWhatsAppInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function Navbar() {
  const { brand, navigation, theme } = siteConfig;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppInquiryMessage());
  const navItemBaseClass = "inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] leading-none transition duration-200";

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070a11]/96 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3 lg:px-6">
        <div className="flex min-h-16 items-center justify-between rounded-2xl border border-white/12 bg-black/35 px-3 py-2 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.95)] md:px-4">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-xl px-2 py-1 transition duration-200 hover:bg-white/5"
          aria-label={brand.name}
          onClick={closeMobileMenu}
        >
          <span className="text-lg font-extrabold uppercase tracking-[0.16em] text-white/90 transition-colors duration-200 hover:text-white md:text-2xl md:tracking-[0.2em] [font-family:var(--font-heading)]">
            FH AUTOMOTORES
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 md:flex">
          <nav className="min-w-0 rounded-xl border border-white/12 bg-white/3 px-3 py-2">
            <div className="flex items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/88 lg:gap-2">
              {navigation.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${navItemBaseClass} text-white/85 hover:bg-white/6 hover:text-white`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:opacity-92"
            style={{ backgroundColor: theme.colors.brandPrimary }}
            aria-label="Consultar por WhatsApp"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
            Consultar
          </a>

          <Link
            href={navigation.admin.href}
            className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/72 transition duration-200 hover:border-white/38 hover:text-white"
          >
            {navigation.admin.label}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 text-white transition duration-200 hover:bg-white/10 md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-admin-menu"
          aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>
      </div>

      {isMobileMenuOpen ? (
        <nav
          id="mobile-admin-menu"
          className="border-t border-white/10 bg-[#080d18] px-4 pb-5 pt-4 md:hidden"
        >
          <div className="flex max-h-[75vh] flex-col gap-2 overflow-y-auto">
            {navigation.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition duration-200 hover:border-white/30 hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: theme.colors.brandPrimary }}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Consultar
            </a>

            <Link
              href={navigation.admin.href}
              onClick={closeMobileMenu}
              className="mt-1 inline-flex w-full items-center justify-center rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/80 transition duration-200 hover:border-white/40 hover:text-white"
            >
              {navigation.admin.label}
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
