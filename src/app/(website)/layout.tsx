import type { Metadata } from "next";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




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
            <ToastContainer position="top-right" autoClose={3000} />



            {children}
        </>

    );
}
