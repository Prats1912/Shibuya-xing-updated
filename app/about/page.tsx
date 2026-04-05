"use client";

import Image from "next/image";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-44 pb-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(196,18,48,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 crossing-grid opacity-30" />
        <AnimatedSection className="relative z-10 max-w-7xl mx-auto">
          <p className="text-[#C41230] text-[10px] tracking-[0.5em] uppercase mb-4 font-medium">
            Our Story
          </p>
          <h1
            className="text-[clamp(48px,8vw,96px)] font-black text-[#f5f0eb] uppercase leading-none tracking-tight mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            About
          </h1>
          <div className="divider-gold max-w-xs mb-6" />
          <p
            className="text-[#f5f0eb]/60 text-lg md:text-xl italic max-w-xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;One Crossing. Exotic Flavours.&rdquo;
          </p>
        </AnimatedSection>
      </section>

      {/* The Crossing Story */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <AnimatedSection direction="left">
            <p className="text-[#C41230] text-[10px] tracking-[0.5em] uppercase mb-6 font-medium">
              The Idea
            </p>
            <h2
              className="text-[clamp(32px,4vw,50px)] font-bold text-[#f5f0eb] leading-tight mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Born at the World&apos;s Most Famous{" "}
              <span className="italic text-[#C41230]">Intersection</span>
            </h2>
            <p className="text-[#787878] text-base leading-[1.9] mb-6">
              Every day, hundreds of thousands of people from every corner of the globe
              converge at Shibuya Crossing in Tokyo — and for a brief, beautiful moment,
              their stories intersect. Strangers become part of the same scene. Cultures
              collide. Energy radiates.
            </p>
            <p className="text-[#787878] text-base leading-[1.9] mb-6">
              That image — of convergence, of energy, of diverse stories meeting at one
              point — is the soul of Shibuya Xing. Our founders wanted to bring that same
              spirit to Bangalore, to Indiranagar&apos;s bustling 12th Main Road, where the city
              comes alive at night.
            </p>
            <p className="text-[#787878] text-base leading-[1.9]">
              The name says it all: Shibuya, for that iconic Japanese crossing. Xing,
              because this is where flavours, cultures, and people cross paths.
            </p>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative">
              <div
                className="relative h-[280px] md:h-[500px] overflow-hidden"
                style={{
                  borderTop: "1px solid rgba(196,18,48,0.2)",
                  borderLeft: "1px solid rgba(196,18,48,0.2)",
                }}
              >
                <Image
                  src="/shibuya-scramble.jpg"
                  alt="Shibuya Crossing, Tokyo"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* dark overlay to keep it moody */}
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(8,8,8,0.35)" }}
                />
                {/* bottom gradient + caption */}
                <div
                  className="absolute inset-x-0 bottom-0 pt-16 pb-8 px-8"
                  style={{ background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 100%)" }}
                >
                  <p
                    className="text-[#f5f0eb]/60 text-sm italic leading-relaxed"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    &ldquo;Where every culture crosses, magic is made.&rdquo;
                  </p>
                  <p className="text-white/25 text-[9px] tracking-[0.5em] uppercase mt-2">
                    Shibuya Crossing · Tokyo, Japan
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-[#C41230]/20" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="divider-gold max-w-7xl mx-auto px-6" />

      {/* Vision & Mission */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-[#C41230] text-[10px] tracking-[0.5em] uppercase mb-4 font-medium">
            What Drives Us
          </p>
          <h2
            className="text-[clamp(32px,4.5vw,54px)] font-bold text-[#f5f0eb]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Vision & Mission
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection direction="left" delay={0.1}>
            <div
              className="border border-[#262626] p-6 md:p-10 h-full relative overflow-hidden group hover:border-[#C41230]/30 transition-colors duration-500"
            >
              <div className="absolute top-6 right-8 text-[#C41230]/[0.06] text-8xl font-black select-none"
                style={{ fontFamily: "var(--font-playfair)" }}>
                V
              </div>
              <span className="text-[#C41230] text-[9px] tracking-[0.5em] uppercase font-medium block mb-4">
                Our Vision
              </span>
              <h3
                className="text-[#f5f0eb] text-2xl font-bold mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                To Be the Crossing Where the World Meets at the Table
              </h3>
              <p className="text-[#787878] text-sm leading-[2]">
                Inspired by the spirit of Tokyo&apos;s Shibuya — where millions of lives intersect
                in a single moment — our vision is to create a dining destination that transcends
                geography. We see Shibuya Xing as more than a restaurant; it is a living
                intersection of cultures, traditions, and stories, where every guest arrives
                as a stranger and leaves as part of something larger. We envision a Bangalore
                where world-class Pan-Asian cuisine is not a luxury, but a shared experience —
                elegant, emotional, and deeply human.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div
              className="border border-[#262626] p-6 md:p-10 h-full relative overflow-hidden group hover:border-[#C41230]/30 transition-colors duration-500"
            >
              <div className="absolute top-6 right-8 text-[#C41230]/[0.06] text-8xl font-black select-none"
                style={{ fontFamily: "var(--font-playfair)" }}>
                M
              </div>
              <span className="text-[#C41230] text-[9px] tracking-[0.5em] uppercase font-medium block mb-4">
                Our Mission
              </span>
              <h3
                className="text-[#f5f0eb] text-2xl font-bold mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                To Craft Experiences That Transcend Taste
              </h3>
              <p className="text-[#787878] text-sm leading-[2]">
                Every dish we serve is an act of intention. Our mission is to honour the
                soul of each Asian culinary tradition — its ingredients, its technique, its
                history — while weaving it into an experience that feels entirely of this
                moment. Through elegance in presentation, warmth in service, and depth in
                flavour, we strive to make every visit to Shibuya Xing a memory that
                lingers long after the last bite. We exist to bring people together — across
                borders, backgrounds, and beliefs — at one table, one crossing, one
                unforgettable meal at a time.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#C41230] text-[10px] tracking-[0.5em] uppercase mb-4 font-medium">
              What We Stand For
            </p>
            <h2
              className="text-[clamp(32px,4.5vw,54px)] font-bold text-[#f5f0eb]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Philosophy
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
            {[
              {
                symbol: "一",
                label: "Unity",
                text: "Seven Asian cuisines. One table. The crossing teaches us that diversity creates beauty.",
              },
              {
                symbol: "魂",
                label: "Soul",
                text: "Every ingredient carries the memory of where it came from. We cook with that reverence.",
              },
              {
                symbol: "道",
                label: "Craft",
                text: "From the fold of a dumpling to the flame under a wok — technique is a form of poetry.",
              },
              {
                symbol: "縁",
                label: "Connection",
                text: "A meal shared is a story written together. We create the conditions for those stories.",
              },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="text-center group">
                  <div
                    className="text-5xl text-[#C41230]/40 mb-5 group-hover:text-[#C41230]/70 transition-colors duration-500"
                    style={{ fontFamily: "serif" }}
                  >
                    {item.symbol}
                  </div>
                  <h4
                    className="text-[#f5f0eb] text-base font-semibold mb-3 tracking-wider uppercase text-sm"
                  >
                    {item.label}
                  </h4>
                  <p className="text-[#787878] text-sm leading-[1.9]">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Location callout */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <AnimatedSection className="border border-[#262626] p-12 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 crossing-grid opacity-20" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[#C41230] text-[10px] tracking-[0.5em] uppercase mb-4 font-medium">
                Find Us
              </p>
              <h3
                className="text-[#f5f0eb] text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Indiranagar, Bangalore
              </h3>
              <p className="text-[#787878] text-sm leading-relaxed">
                12th Main Road, Indiranagar<br />
                Bangalore, Karnataka 560038
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="https://reservations.petpooja.com/form/paidformperpax/f6b98aa9aecea9415aa032c0c57cefaac7ad50cde2469ff09ce9a459c11007258a7380430e0c4abb6912be5a85f35c85971ad72749fc89eef8aebf34050261f98b977b6aa68e06e05b9bde3790ab513d70607ef5be40b8e1a485966a9607a8da" target="_blank" rel="noopener noreferrer"
                className="bg-[#C41230] text-[#080808] px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#E8394D] transition-all duration-300 flex items-center gap-2 group whitespace-nowrap"
              >
                Reserve a Table
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="border border-[#262626] text-[#f5f0eb]/60 px-8 py-3.5 text-xs tracking-[0.25em] uppercase hover:border-[#C41230] hover:text-[#C41230] transition-all duration-300 text-center"
              >
                Get Directions
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
