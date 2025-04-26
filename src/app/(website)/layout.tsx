import type { Metadata } from "next";
import "../globals.css";




export const metadata: Metadata = {
    title: "Wiit Solutions",
    description: "Wiit Solutions provides cutting-edge web and mobile development services, specializing in React, Next.js, and custom software solutions.",
  icons: {
  icon: "/image/logo.png",
  apple: "/image/apple-touch-icon.png", // 180x180 pixels, circular with transparent background
},
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>

    );
}
