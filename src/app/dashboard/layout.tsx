// app/(admin)/dashboard/layout.tsx or app/dashboard/layout.tsx (depending on your routes)
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/Sidebar";
import AuthWrapper from "@/components/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Simple responsive dashboard with sidebar navigation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <AuthWrapper>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-white">
            <DashboardSidebar />
            <main className="flex-1">{children}</main>
          </div>
        </SidebarProvider>
      </AuthWrapper>
    </div>
  );
}
