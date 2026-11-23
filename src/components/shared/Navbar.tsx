"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, ArrowUpRight, Sparkles } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Naru", href: "/products" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#eee3d3] bg-[#fffaf1]/95 backdrop-blur-xl">
        <nav className="container flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#49301f] text-[#e8c58a]">
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#49301f]">
                Naru<span className="text-[#c58a35]">House.</span>
              </h1>
              <p className="text-[9px] font-medium uppercase tracking-[2px] text-[#8c7c6b]">
                Taste of Tradition
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#665343] transition-colors hover:text-[#c58a35]"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/customize"
              className="text-sm font-medium text-[#665343] transition-colors hover:text-[#c58a35]"
            >
              Customize
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#eee3d3] text-[#49301f] transition hover:bg-[#f7eddd]"
            >
              <ShoppingBag size={19} />
            </Link>

            <Link
              href="/customize"
              className="btn-primary !min-h-[44px] !px-5 !text-sm"
            >
              Create Your Naru
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#49301f]"
            >
              <ShoppingBag size={21} />
            </Link>

            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7eddd] text-[#49301f]"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-[#eee3d3] bg-[#fffaf1] px-4 pb-6 pt-4 lg:hidden">
            <div className="container flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-[#49301f] transition hover:bg-[#f7eddd]"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/customize"
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#49301f] transition hover:bg-[#f7eddd]"
              >
                Customize Your Naru
              </Link>

              <Link
                href="/customize"
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-3 w-full"
              >
                Create Your Naru
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
