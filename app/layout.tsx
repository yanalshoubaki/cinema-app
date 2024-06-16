import Layout from "@/components/Layout";
import Providers from "@/providers/Providers";
import clsx from "clsx";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Gabarito } from "next/font/google";
import "./globals.css";

const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cinema App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={clsx(gabarito.className)}>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
