"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram, Facebook, MapPin } from "lucide-react";

const navLinks = [
  { href: "/", label: "The Crossing" },
  { href: "/about", label: "Our Soul" },
  { href: "/gallery", label: "Moments" },
  { href: "/contact", label: "Come Over" },
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
        <Link href="/" className="flex items-center group flex-shrink-0 max-w-[120px] md:max-w-none">
          <Image
            src="/logo.jpg"
            alt="Shibuya Xing"
            width={1920}
            height={1080}
            className="object-contain md:h-16 h-10 w-auto"
            priority
          />
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
            className="transition-all duration-300 hover:scale-110"
            style={{ color: "#E4405F", filter: "drop-shadow(0 0 6px rgba(228,64,95,0.6))" }}
            onMouseEnter={e => (e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(228,64,95,0.9))")}
            onMouseLeave={e => (e.currentTarget.style.filter = "drop-shadow(0 0 6px rgba(228,64,95,0.6))")}
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61579749830089"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition-all duration-300 hover:scale-110"
            style={{ color: "#1877F2", filter: "drop-shadow(0 0 6px rgba(24,119,242,0.55))" }}
            onMouseEnter={e => (e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(24,119,242,0.9))")}
            onMouseLeave={e => (e.currentTarget.style.filter = "drop-shadow(0 0 6px rgba(24,119,242,0.55))")}
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://maps.app.goo.gl/s3HhUMNRr2EmVPf78"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Maps"
            className="transition-all duration-300 hover:scale-110"
            style={{ color: "#F5C200", filter: "drop-shadow(0 0 6px rgba(245,194,0,0.55))" }}
            onMouseEnter={e => (e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(245,194,0,0.9))")}
            onMouseLeave={e => (e.currentTarget.style.filter = "drop-shadow(0 0 6px rgba(245,194,0,0.55))")}
          >
            <MapPin size={20} />
          </a>
          <div className="w-px h-4 bg-[#262626]" />
          <Link
            href="https://reservations.petpooja.com/form/paidformperpax/f6b98aa9aecea9415aa032c0c57cefaac7ad50cde2469ff09ce9a459c11007258a7380430e0c4abb6912be5a85f35c85971ad72749fc89eef8aebf34050261f98b977b6aa68e06e05b9bde3790ab513d70607ef5be40b8e1a485966a9607a8da"
            target="_blank" rel="noopener noreferrer"
            className="bg-[#C41230] text-[#080808] px-6 py-3 text-sm tracking-[0.25em] uppercase font-semibold hover:bg-[#E8394D] transition-all duration-300"
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
                    onClick={() => setMobileOpen(false)}
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
                  className="inline-block bg-[#C41230] text-[#080808] px-6 py-3 text-sm tracking-[0.25em] uppercase font-semibold hover:bg-[#E8394D] transition-all duration-300"
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
                  className="flex items-center gap-2 transition-all duration-300"
                  style={{ color: "#E4405F", filter: "drop-shadow(0 0 5px rgba(228,64,95,0.45))" }}
                >
                  <Instagram size={18} />
                  <span className="text-[11px] tracking-[0.3em] uppercase font-medium">@feastshibuya</span>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61579749830089"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center gap-2 transition-all duration-300"
                  style={{ color: "#1877F2", filter: "drop-shadow(0 0 5px rgba(24,119,242,0.45))" }}
                >
                  <Facebook size={18} />
                  <span className="text-[11px] tracking-[0.3em] uppercase font-medium">Facebook</span>
                </a>
                <a
                  href="https://maps.app.goo.gl/s3HhUMNRr2EmVPf78"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps"
                  className="flex items-center gap-2 transition-all duration-300"
                  style={{ color: "#F5C200", filter: "drop-shadow(0 0 5px rgba(245,194,0,0.45))" }}
                >
                  <MapPin size={18} />
                  <span className="text-[11px] tracking-[0.3em] uppercase font-medium">Find Us</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
