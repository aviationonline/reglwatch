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
  title:
    "ReglWatch - Veille réglementaire automatisée pour les TPE et PME",

  description:
    "ReglWatch surveille automatiquement les évolutions réglementaires françaises et vous alerte uniquement sur les obligations qui concernent votre entreprise.",

  keywords: [
    "veille réglementaire",
    "conformité",
    "TPE",
    "PME",
    "réglementation",
    "Légifrance",
    "obligations légales",
    "compliance",
    "entreprise",
  ],

  openGraph: {
    title:
      "ReglWatch - Veille réglementaire automatisée",
    description:
      "Ne manquez plus une obligation réglementaire importante.",
    url: "https://reglwatch.fr",
    siteName: "ReglWatch",
    locale: "fr_FR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google:
      "VtXMRTXUV6F1S8P02G50Qlb6j88H6B-og4v7XiNxchw",
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
