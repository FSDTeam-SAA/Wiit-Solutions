// app/layout.tsx or app/(your-layout)/layout.tsx
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Providerswrapper } from "./components/SessionProvider/SessionProvider";
 // adjust path if needed

const RobotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Wiit Solutions",
  description: "Wiit Solutions provides cutting-edge web and mobile development services, specializing in React, Next.js, and custom software solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${RobotoCondensed.className} antialiased`}>
        <Providerswrapper>
          {children}
        </Providerswrapper>
      </body>
    </html>
  );
}
