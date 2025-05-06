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
  const closeMenu = () => setIsMenuOpen(false)

  const navLinks = [
    { name: navbarData?.name1, href: navbarData?.link1 },
    { name: navbarData?.name2, href: navbarData?.link2 },
    { name: navbarData?.name3, href: navbarData?.link3 },
    { name: navbarData?.name4, href: navbarData?.link4 },
  ].filter(link => link.name && link.href)

  const renderLink = (name: string, href: string) => {
    const isActive = pathname === href
    return (
      <Link
        key={href}
        href={href}
        onClick={closeMenu}
        className="block text-xl px-3 py-2 font-medium text-white"
        aria-current={isActive ? "page" : undefined}
      >
        {name}
      </Link>
    )
  }

  return (
    <nav className="bg-black text-white w-full fixed top-0 left-0 z-50" role="navigation" aria-label="Main Navigation">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-8">
            {navLinks.map(link => renderLink(link.name, link.href))}
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Menus/${navbarData?.logo}`}
              alt="Website Logo"
              width={100}
              height={100}
              className="h-[60px] w-[60px] sm:h-[100px] sm:w-[100px] object-contain"
            />
          </div>

          {/* Mobile menu toggle */}
          <div className="sm:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`block text-xl px-3 py-2 font-medium text-white`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}