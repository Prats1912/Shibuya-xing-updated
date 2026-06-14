import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-5 flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Shibuya Xing"
                width={1920}
                height={1080}
                className="object-contain h-16 w-auto"
              />
              <div>
                <div
                  className="text-2xl font-bold tracking-[0.3em] uppercase mb-0.5 brand-gradient"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Shibuya
                </div>
                <div className="text-xs tracking-[0.7em] uppercase font-light brand-gradient">
                  Xing
                </div>
              </div>
            </div>
            <p className="text-[#787878] text-sm leading-relaxed max-w-xs">
              One crossing. Exotic flavours. Pan-Asian dining inspired by
              Tokyo&apos;s iconic Shibuya intersection, brought to the heart of
              Bangalore.
            </p>
            <p className="text-[#C41230] text-xs tracking-[0.2em] uppercase mt-5 font-medium">
              621/B San-Jose, 12th Main Road, Indiranagar, Bangalore — 560038
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.instagram.com/feastshibuya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E4405F] transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61579749830089"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <span className="text-[#787878] text-xs tracking-[0.2em] uppercase">
                @feastshibuya
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#f5f0eb] text-xs tracking-[0.3em] uppercase mb-5 font-medium">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "Our Story" },
                { href: "/gallery", label: "Gallery" },
                { href: "https://reservations.petpooja.com/form/paidformperpax/f6b98aa9aecea9415aa032c0c57cefaac7ad50cde2469ff09ce9a459c11007258a7380430e0c4abb6912be5a85f35c85971ad72749fc89eef8aebf34050261f98b977b6aa68e06e05b9bde3790ab513d70607ef5be40b8e1a485966a9607a8da", label: "Reservations" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#787878] text-sm hover:text-[#C41230] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[#f5f0eb] text-xs tracking-[0.3em] uppercase mb-5 font-medium">
              Hours
            </h4>
            <div className="space-y-2">
              <div>
                <p className="text-[#787878] text-xs tracking-widest uppercase mb-1">
                  Mon — Thu
                </p>
                <p className="text-[#f5f0eb] text-sm">12:00 PM — 11:30 PM</p>
              </div>
              <div className="pt-2">
                <p className="text-[#787878] text-xs tracking-widest uppercase mb-1">
                  Fri — Sun
                </p>
                <p className="text-[#f5f0eb] text-sm">12:00 PM — 12:00 AM</p>
              </div>
              <div className="pt-4 border-t border-[#262626]">
                <p className="text-[#787878] text-xs mb-1">Reservations</p>
                <div className="space-y-1">
                  <a href="tel:+919845981651" className="text-[#C41230] text-sm hover:text-[#E8394D] transition-colors block">+91 98459 81651</a>
                  <a href="tel:+91984505752" className="text-[#C41230] text-sm hover:text-[#E8394D] transition-colors block">+91 98459 05752</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-gold mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#787878] text-xs tracking-wider">
            &copy; {new Date().getFullYear()} <span className="brand-gradient">Shibuya Xing</span>. All rights reserved.
          </p>
          <p className="text-[#787878] text-xs tracking-widest uppercase">
            One Crossing. Exotic Flavours.
          </p>
        </div>
      </div>
    </footer>
  );
}
