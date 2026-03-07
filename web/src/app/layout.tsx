import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Realtime Commerce",
  description: "Checkout and order tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="min-h-screen bg-[#0c0c0f] text-stone-100 antialiased flex flex-col">
            <Header />
            <section className="flex-1 pt-24 pb-12">{children}</section>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
