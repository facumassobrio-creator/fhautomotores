import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { buildCanonicalUrl, getDefaultSeoImage, siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
});

const defaultOgImage = getDefaultSeoImage();
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
const metadataBase = siteConfig.seo.siteUrl ? new URL(siteConfig.seo.siteUrl) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  alternates: {
    canonical: buildCanonicalUrl('/'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: buildCanonicalUrl('/'),
    siteName: siteConfig.brand.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: siteConfig.brand.name,
      },
    ],
  },
  twitter: {
    card: siteConfig.seo.twitterCard,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [defaultOgImage],
    site: siteConfig.seo.twitterSite,
    creator: siteConfig.seo.twitterCreator,
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: siteConfig.seo.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}', { send_page_view: false });
              `}
            </Script>
          </>
        ) : null}

        {metaPixelId ? (
          <>
            <Script id="meta-pixel-init" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        ) : null}

        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
