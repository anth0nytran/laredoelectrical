import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.landersoelectrical.com'),
  title: "Houston Electrician | Panel Upgrades, Lighting & Generators | Landeros Electrical",
  description: "Houston's trusted electrician for panel upgrades, lighting installation, generators & emergency repairs. Serving Pearland, Pasadena, Sugar Land & Bay Area. Call (832) 812-0189.",
  keywords: ["Houston Electrician", "Panel Upgrade", "Generator Installation", "Lighting Installation", "Electrical Repair", "South Houston Electrician", "Pearland Electrician", "Pasadena Electrician", "League City Electrician", "Sugar Land Electrician"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Houston Electrician | Lighting, Panels & Generators | Landeros Electrical",
    description: "Expert home electrical service in Houston & Bay Area. Emergency repairs, lighting design, panel upgrades & generators. Licensed & insured.",
    url: 'https://www.landersoelectrical.com',
    siteName: 'Landeros Electrical Services',
    images: [
      {
        url: '/images/laredohero.jpg',
        width: 1200,
        height: 630,
        alt: 'Landeros Electrical Services - Houston Electrician',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Houston Electrician | Landeros Electrical Services",
    description: "Emergency repairs, lighting, panels & generators. Serving Houston, Pearland, Pasadena & Bay Area. Call (832) 812-0189.",
    images: ['/images/laredohero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/reallaredo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/images/reallaredo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Electrician",
              "name": "Landeros Electrical Services",
              "image": "https://www.landersoelectrical.com/images/reallaredo.svg",
              "logo": "https://www.landersoelectrical.com/images/reallaredo.svg",
              "url": "https://www.landersoelectrical.com",
              "telephone": "+18328120189",
              "description": "Houston's trusted electrician. Professional service upgrades, lighting installation, generator solutions, and troubleshooting.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Houston Area",
                "addressLocality": "Houston",
                "addressRegion": "TX",
                "postalCode": "77001",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.7604,
                "longitude": -95.3698
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "48",
                "bestRating": "5",
                "worstRating": "1"
              },
              "areaServed": [
                { "@type": "City", "name": "Houston" },
                { "@type": "City", "name": "South Houston" },
                { "@type": "City", "name": "Pasadena" },
                { "@type": "City", "name": "Pearland" },
                { "@type": "City", "name": "League City" },
                { "@type": "City", "name": "Sugar Land" },
                { "@type": "City", "name": "Deer Park" },
                { "@type": "City", "name": "La Porte" },
                { "@type": "City", "name": "Webster" },
                { "@type": "City", "name": "Clear Lake" },
                { "@type": "City", "name": "Alvin" },
                { "@type": "City", "name": "Manvel" },
                { "@type": "City", "name": "Brookside Village" },
                { "@type": "City", "name": "Katy" },
                { "@type": "City", "name": "Richmond" },
                { "@type": "City", "name": "Cypress" },
                { "@type": "City", "name": "The Woodlands" }
              ],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "17:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "08:00",
                  "closes": "12:00"
                }
              ],
              "priceRange": "$$",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Electrical Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Service Panel Upgrades" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Generator Installation & ATS" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lighting & Fixture Installation" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Electrical Troubleshooting" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Emergency Repairs" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "EV Charger Installation" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wiring & Rewiring" } }
                ]
              }
            })
          }}
        />
        {/* Google Analytics 4 - TODO: Replace G-XXXXXXXXXX with your real GA4 Measurement ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        {/* Google Search Console - TODO: Replace with your verification code from Search Console */}
        <meta name="google-site-verification" content="Your_Verification_Code_Here" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
