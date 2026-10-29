import Layout from "@/components/Layout";
import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Big_Shoulders, Gabarito } from "next/font/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
  variable: "--font-big",
});

const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Flix",
  description: "Find something to watch tonight: trending movies and series.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`dark ${gabarito.variable} ${bigShoulders.variable}`}>
        <body className="bg-background font-sans text-foreground antialiased">
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
