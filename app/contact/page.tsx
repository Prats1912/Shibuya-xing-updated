"use client";

import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-44 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(196,18,48,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 crossing-grid opacity-30" />
        <AnimatedSection className="relative z-10 max-w-7xl mx-auto">
          <p className="text-[#C41230] text-[clamp(22px,2.5vw,36px)] tracking-[0.12em] uppercase mb-3 font-bold">
            Reach Us
          </p>
          <h1
            className="text-base font-semibold text-[#f5f0eb] uppercase leading-none tracking-tight mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Contact
          </h1>
          <div className="divider-gold max-w-xs mb-6" />
          <p className="text-[#787878] text-base max-w-lg leading-relaxed">
            We&apos;d love to hear from you. Visit us, call us, or drop us a line.
          </p>
        </AnimatedSection>
      </section>

      {/* Contact details + Map */}
      <section className="pb-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Details */}
          <AnimatedSection direction="left">
            <StaggerContainer className="space-y-8">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  content: (
                    <>
                      <p className="text-[#f5f0eb] text-sm leading-relaxed">
                        621/B, San-Jose, 4th &amp; 5th Floor<br />
                        12th Main Road, HAL II Stage<br />
                        Indiranagar, Bangalore — 560038
                      </p>
                      <a
                        href="https://maps.app.goo.gl/s3HhUMNRr2EmVPf78"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C41230] text-xs tracking-[0.25em] uppercase mt-2 inline-block hover:underline"
                      >
                        Get Directions →
                      </a>
                    </>
                  ),
                },
                {
                  icon: Phone,
                  label: "Phone",
                  content: (
                    <div className="space-y-2">
                      <a href="tel:+919845981651" className="text-[#C41230] text-sm hover:text-[#E8394D] transition-colors block">
                        +91 98459 81651
                      </a>
                      <a href="tel:+91984505752" className="text-[#C41230] text-sm hover:text-[#E8394D] transition-colors block">
                        +91 98459 05752
                      </a>
                    </div>
                  ),
                },
                {
                  icon: Mail,
                  label: "Email",
                  content: (
                    <a href="mailto:hospitality@shibuyaxing.com" className="text-[#C41230] text-sm hover:text-[#E8394D] transition-colors">
                      hospitality@shibuyaxing.com
                    </a>
                  ),
                },
                {
                  icon: Clock,
                  label: "Opening Hours",
                  content: (
                    <div className="space-y-2">
                      {[
                        { day: "Mon — Thu", time: "12:00 PM – 11:30 PM" },
                        { day: "Fri — Sun", time: "12:00 PM – 12:00 AM" },
                      ].map((h) => (
                        <div key={h.day} className="flex justify-between items-center gap-8">
                          <span className="text-[#787878] text-xs tracking-wide">{h.day}</span>
                          <span className="text-[#f5f0eb] text-sm">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ].map((item) => (
                <StaggerItem key={item.label}>
                  <div className="flex gap-5 items-start border-b border-[#1a1a1a] pb-8">
                    <div className="w-10 h-10 border border-[#262626] flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-[#C41230]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#787878] text-[10px] tracking-[0.35em] uppercase mb-2">
                        {item.label}
                      </p>
                      {item.content}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Social */}
            <AnimatedSection delay={0.4} className="mt-10">
              <p className="text-[#787878] text-[10px] tracking-[0.35em] uppercase mb-4">Follow Us</p>
              <div className="flex gap-4">
                {[
                  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/feastshibuya", color: "#E4405F" },
                  { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61579749830089", color: "#1877F2" },
                ].map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border flex items-center justify-center transition-all duration-300"
                    style={{ borderColor: color, color }}
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Right: Map placeholder */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="h-[500px] bg-[#111111] border border-[#262626] relative overflow-hidden">
              <div className="absolute inset-0 crossing-grid opacity-40" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(196,18,48,0.04) 0%, transparent 70%)",
                }}
              />
              {/* Pin marker */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border border-[#C41230]/50 flex items-center justify-center">
                  <MapPin size={20} className="text-[#C41230]" />
                </div>
                <div className="text-center">
                  <p
                    className="text-[#f5f0eb] text-lg font-semibold"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    <span className="brand-gradient">Shibuya Xing</span>
                  </p>
                  <p className="text-[#787878] text-xs tracking-widest mt-1">
                    12th Main Road, Indiranagar
                  </p>
                  <p className="text-[#787878] text-xs tracking-widest">
                    Bangalore 560038
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/s3HhUMNRr2EmVPf78"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 border border-[#C41230] text-[#C41230] px-6 py-2.5 text-[10px] tracking-[0.3em] uppercase hover:bg-[#C41230] hover:text-[#080808] transition-all duration-300"
                >
                  Open in Google Maps
                </a>
              </div>
              {/* Grid lines for map feel */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0"
                  style={{
                    top: `${(i + 1) * (100 / 7)}%`,
                    height: "1px",
                    background: "rgba(196,18,48,0.06)",
                  }}
                />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${(i + 1) * (100 / 7)}%`,
                    width: "1px",
                    background: "rgba(196,18,48,0.06)",
                  }}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

    </>
  );
}
