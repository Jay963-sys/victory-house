import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AudioProvider } from "./context/AudioContext";
import AudioPlayer from "./components/AudioPlayer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const siteUrl = "https://rccgvictorychapel.org";

export const metadata: Metadata = {
  title: {
    default: "RCCG Victory Chapel",
    template: "%s | RCCG Victory Chapel",
  },
  description:
    "RCCG Victory Chapel is a vibrant Christian church dedicated to worship, fellowship, and spiritual growth.",

  openGraph: {
    title: "RCCG Victory Chapel",
    description:
      "A Christ-centered church community committed to faith, worship, and growth.",
    url: siteUrl,
    siteName: "RCCG Victory Chapel",
    images: [
      {
        url: `${siteUrl}/rccg.png`,
        width: 1200,
        height: 630,
        alt: "RCCG Victory Chapel",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RCCG Victory Chapel",
    description:
      "A Christ-centered church community committed to worship and spiritual growth.",
    images: [`${siteUrl}/rccg.png`],
  },

  icons: {
    icon: "/rccg.svg",
    apple: "/rccg.png",
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
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-stone-50 text-stone-900`}
      >
        <LenisProvider>
          <AudioProvider>
            <Navbar />
            {children}
            <Footer />
            <AudioPlayer />
          </AudioProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
