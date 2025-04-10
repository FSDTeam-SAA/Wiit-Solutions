"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "@/../../public/image/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white w-full sticky top-0 left-0 z-50">
      <div className=" container py-10 ">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-[30px] w-[30px]" aria-hidden="true" />
              ) : (
                <Menu className="block h-[30px] w-[30px]" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop menu button (hidden on larger screens) */}
          <div className="hidden sm:block">
            <div className="flex  items-center gap-10">
              <button
                type="button"
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                <Menu className="block h-6 w-6 md:hidden" aria-hidden="true" />
              </button>

              <div className="hidden sm:block flex-1">
                <div className="flex justify-center space-x-8 ">
                  <Link
                    href="/"
                    className="text-white hover:text-gray-300 text-xl px-3 py-2  font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-white hover:text-gray-300 px-3 py-2 text-xl font-medium"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/services"
                    className="text-white hover:text-gray-300 px-3 py-2 text-xl font-medium"
                  >
                    Nationwide Services
                  </Link>
                  <Link
                    href="/contact"
                    className="text-white hover:text-gray-300 px-3 py-2 text-xl font-medium"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links - centered on desktop */}

          {/* Logo on the right */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                src={logo}
                alt="WIIT Logo"
                width={100}
                height={100}
                className="h-[100px] w-[100px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Nationwide Services
          </Link>
          <Link
            href="/contact"
            className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
