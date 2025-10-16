import { Poppins, Inter } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Turner Ventures AZ - Professional Demolition & Junk Removal in Gilbert",
  description:
    "Expert demolition, concrete removal, and junk removal services in Gilbert, Arizona. Licensed, insured, and offering free estimates. Serving Phoenix metro area.",
  keywords: "demolition, junk removal, concrete removal, Gilbert Arizona, Phoenix, flooring removal, landscape removal",
  openGraph: {
    title: "Turner Ventures AZ - Demolition & Junk Removal",
    description: "Professional demolition and removal services in Gilbert, Arizona",
    type: "website",
    locale: "en_US",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Turner Ventures AZ",
              image: "https://example.com/logo.png",
              description: "Professional demolition and junk removal services in Gilbert, Arizona",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gilbert",
                addressRegion: "AZ",
                addressCountry: "US",
              },
              telephone: "(480) 555-0123",
              email: "turnerventuresaz@gmail.com",
              areaServed: ["Gilbert", "Phoenix", "Chandler", "Tempe", "Mesa", "Scottsdale"],
              priceRange: "$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "500",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
