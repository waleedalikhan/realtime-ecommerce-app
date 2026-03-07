import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { SiteLayout } from "@/components/SiteLayout";

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
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  );
}
