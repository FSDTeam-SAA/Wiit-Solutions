"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"


import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { signOut } from "next-auth/react"

const menuItems = [
    {
        title: "Header",
        href: "/dashboard",
    },
    {
        title: "Banner",
        href: "/dashboard/home",
    },
    {
        title: "About Us",
        href: "/dashboard/about-us",
    },
    {
        title: "Mission & Vision",
        href: "/dashboard/mission&vision",
    },
    {
        title: "Nationwide Services",
        href: "/dashboard/nationwide-services",
    },
    {
        title: "Our Comprehensive Services",
        href: "/dashboard/our-comprehensive-services",
    },
    {
        title: "Why Choose us",
        href: "/dashboard/contact-us",
    },
    {
        title: "Footer",
        href: "/dashboard/hear-you",
    },
]

export function DashboardSidebar() {
    const pathname = usePathname()




    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="xl" asChild>
                                <Link href="/">
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <Image src="/image/logo.webp" alt=' ' width={100} height={100} className='w-[80px] h-[80px] rounded-full  ' />
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent className="mt-10">
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild isActive={pathname === item.href}>
                                    <Link href={item.href}>
                                        <span className="text-base font-medium capitalize">{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="text-left w-full ml-2 py-1 mt-10 text-red-600 hover:bg-gray-100 rounded"
                        >
                            Log out
                        </button>
                    </SidebarMenu>
                </SidebarContent>
                
                <SidebarRail />
            </Sidebar>
            <div className="md:hidden fixed top-4 left-4 z-50">
                <SidebarTrigger />
            </div>
        </>
    )
}
