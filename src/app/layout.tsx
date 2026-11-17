import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./(public)/_components/Navbar/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: [ "latin" ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: [ "latin" ],
});

export const metadata: Metadata = {
  title: {
    default: "IronHaul — Industrial Equipment Rental Marketplace",
    template: "%s | IronHaul",
  },
  description:
    "Rent heavy equipment from verified owners. Transparent pricing, nationwide coverage, and industrial-grade machinery for every job.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>

      </head>
      <body className="flex min-h-full flex-col">
        <main id="main-content" className="flex-1">
          <Navbar/>
          {children}
        </main>

      </body>
    </html>
  );
}
