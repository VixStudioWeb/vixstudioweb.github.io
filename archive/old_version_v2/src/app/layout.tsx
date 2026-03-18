import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vixstudioweb.github.io"),
  title: {
    default: "VIX | Web design immersif pour commerçants indépendants",
    template: "%s | VIX",
  },
  description:
    "VIX conçoit des sites vitrines immersifs pour commerçants indépendants : design premium, interactions mémorables et impact business.",
  keywords: [
    "web design commerçants",
    "site vitrine immersif",
    "agence digitale indépendante",
    "expérience interactive",
    "branding commerce local",
  ],
  authors: [{ name: "VIX" }],
  creator: "VIX",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://vixstudioweb.github.io",
    siteName: "VIX",
    title: "VIX | Web design immersif pour commerçants indépendants",
    description:
      "VIX conçoit des sites vitrines immersifs pour commerçants indépendants.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Vix Studio Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VIX | Studio web design immersif",
    description:
      "Sites vitrines immersifs pour commerçants indépendants. Performance, esthétique et résultat.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
