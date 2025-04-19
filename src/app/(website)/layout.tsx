import type { Metadata } from "next";
import "../globals.css";
import Navbar from "../components/Navbar/Navbar";



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
        <>
            <Navbar />
            {children}
        </>

    );
}
