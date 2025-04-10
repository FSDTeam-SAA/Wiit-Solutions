"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {  Home,Settings, Users } from "lucide-react"

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

const menuItems = [
  
    {
        title: "Home Page",
        icon: Home,
        href: "/dashboard/home",
    },
    {
        title: "Users",
        icon: Users,
        href: "/users",
    },
    {
        title: "Settings",
        icon: Settings,
        href: "/settings",
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
                            <SidebarMenuButton size="lg" asChild>
                                <Link href="/">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                        <Home className="size-4" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-semibold">My Dashboard</span>
                                        <span className="text-xs text-muted-foreground">v1.0.0</span>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild isActive={pathname === item.href}>
                                    <Link href={item.href}>
                                        <item.icon className="size-4" />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
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
