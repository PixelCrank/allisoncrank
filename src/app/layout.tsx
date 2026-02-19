import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-cormorant',
});

const neuzeit = localFont({
  src: [
    {
      path: "../../fonts/NeuzeitSLTW01-Book.31a5a41.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/NeuzeitSLTW01-BookHeavy.39df4f5.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-neuzeit",
});

const montreal = localFont({
  src: [
    {
      path: '../../fonts/montrealbook.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/montreal.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-montreal',
});

const crankFont = localFont({
  src: "../../fonts/crankreg.ttf",
  variable: "--font-crank",
});

const crankLineFont = localFont({
  src: "../../fonts/crankline.ttf",
  variable: "--font-crank-line",
});

export const metadata: Metadata = {
  title: "Allison Crank",
  description:
    "Designer and researcher based in Paris. Founder of Crank Studio. Working at the intersection of architecture, immersive technology, and intelligent systems.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  openGraph: {
    title: "Allison Crank",
    description:
      "Designer and researcher based in Paris. Founder of Crank Studio.",
    url: "https://allisoncrank.com",
    siteName: "Allison Crank",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allison Crank",
    description:
      "Designer and researcher based in Paris. Founder of Crank Studio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${neuzeit.variable} ${crankFont.variable} ${crankLineFont.variable} ${montreal.variable} ${cormorant.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
