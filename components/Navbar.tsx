"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram, MapPin } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navBg =
    !isHome || scrolled
      ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#262626]"
      : "bg-transparent";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="Shibuya Xing"
            width={1920}
            height={1080}
            className="object-contain h-14 w-auto"
            priority
          />
          <div className="flex flex-col leading-none">
            <span
              className="text-[#f5f0eb] text-lg font-bold tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Shibuya
            </span>
            <span className="text-[#C41230] text-[10px] tracking-[0.6em] uppercase font-light -mt-0.5">
              Xing
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs tracking-[0.18em] uppercase font-medium transition-colors duration-300 group"
                style={{ color: active ? "#C41230" : "rgba(245,240,235,0.65)" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-[#C41230] transition-all duration-300 group-hover:w-full"
                  style={{ width: active ? "100%" : "0%" }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop right: icons + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.instagram.com/feastshibuya"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[rgba(245,240,235,0.5)] hover:text-[#C41230] transition-colors duration-300"
          >
            <Instagram size={17} />
          </a>
          <a
            href="https://maps.app.goo.gl/s3HhUMNRr2EmVPf78"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Maps"
            className="text-[rgba(245,240,235,0.5)] hover:text-[#C41230] transition-colors duration-300"
          >
            <MapPin size={17} />
          </a>
          <div className="w-px h-4 bg-[#262626]" />
          <Link
            href="https://reservations.petpooja.com/form/paidformperpax/f6b98aa9aecea9415aa032c0c57cefaac7ad50cde2469ff09ce9a459c11007258a7380430e0c4abb6912be5a85f35c85971ad72749fc89eef8aebf34050261f98b977b6aa68e06e05b9bde3790ab513d70607ef5be40b8e1a485966a9607a8da" target="_blank" rel="noopener noreferrer"
            className="border border-[#C41230] text-[#C41230] px-5 py-2 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-[#C41230] hover:text-[#080808] transition-all duration-300"
          >
            Reserve a Table
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#f5f0eb] hover:text-[#C41230] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden bg-[#080808]/98 backdrop-blur-md border-t border-[#262626] overflow-hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="text-base tracking-[0.2em] uppercase font-medium transition-colors"
                    style={{
                      color:
                        pathname === link.href
                          ? "#C41230"
                          : "rgba(245,240,235,0.7)",
                      fontFamily: "var(--font-playfair)",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.3 }}
                className="pt-2"
              >
                <Link
                  href="https://reservations.petpooja.com/form/paidformperpax/f6b98aa9aecea9415aa032c0c57cefaac7ad50cde2469ff09ce9a459c11007258a7380430e0c4abb6912be5a85f35c85971ad72749fc89eef8aebf34050261f98b977b6aa68e06e05b9bde3790ab513d70607ef5be40b8e1a485966a9607a8da" target="_blank" rel="noopener noreferrer"
                  className="inline-block border border-[#C41230] text-[#C41230] px-6 py-3 text-xs tracking-[0.25em] uppercase hover:bg-[#C41230] hover:text-[#080808] transition-all duration-300"
                >
                  Reserve a Table
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.07, duration: 0.3 }}
                className="flex items-center gap-5 pt-2 border-t border-[#262626]"
              >
                <a
                  href="https://www.instagram.com/feastshibuya"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center gap-2 text-[rgba(245,240,235,0.45)] hover:text-[#C41230] transition-colors duration-300"
                >
                  <Instagram size={16} />
                  <span className="text-[10px] tracking-[0.3em] uppercase">@feastshibuya</span>
                </a>
                <a
                  href="https://maps.app.goo.gl/s3HhUMNRr2EmVPf78"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps"
                  className="flex items-center gap-2 text-[rgba(245,240,235,0.45)] hover:text-[#C41230] transition-colors duration-300"
                >
                  <MapPin size={16} />
                  <span className="text-[10px] tracking-[0.3em] uppercase">Find Us</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
