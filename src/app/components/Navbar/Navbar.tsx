"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { MenuSection } from "@/types/home"

export default function Navbar({ navbarData }: { navbarData: MenuSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navLinks = [
    { name: navbarData?.name1, href: navbarData?.link1 },
    { name: navbarData?.name2, href: navbarData?.link2 },
    { name: navbarData?.name3, href: navbarData?.link3 },
    { name: navbarData?.name4, href: navbarData?.link4 },
  ]

  const renderLink = (name: string, href: string) => {
    const isActive = pathname === href
    return (
      <Link
        key={href}
        href={href}
        className="relative block text-xl px-3 py-2 font-medium text-white"
      >
        {name}
        {isActive && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400"></span>
        )}
      </Link>
    )
  }

  return (
    <nav className="bg-black text-white w-full fixed top-0 left-0 z-50">
      <div className="container py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Menus/${navbarData?.logo}`}
              alt="WIIT Logo"
              width={100}
              height={100}
              className="h-[100px] w-[100px]"
              aria-label="Website Logo"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-8">
            {navLinks.map(link => renderLink(link.name, link.href))}
          </div>

          {/* Mobile menu toggle */}
          <div className="sm:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          {navLinks.map(link => renderLink(link.name, link.href))}
        </div>
      )}
    </nav>
  )
}
