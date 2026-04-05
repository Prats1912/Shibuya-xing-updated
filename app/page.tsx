"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";
import { ArrowRight, ChevronDown } from "lucide-react";

const CocktailCanvas = dynamic(() => import("@/components/CocktailCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const RamenScrollSection = dynamic(
  () => import("@/components/RamenScrollSection"),
  { ssr: false, loading: () => <div className="h-screen bg-[#080808]" /> }
);

function drawPetal(ctx: CanvasRenderingContext2D, size: number) {
  // Authentic cherry blossom petal: rounded with a notch at the wide end
  ctx.beginPath();
  ctx.moveTo(0, size);                                                          // pointed tip
  ctx.bezierCurveTo(-size * 0.9, size * 0.3, -size * 1.05, -size * 0.5, -size * 0.25, -size * 0.82);
  ctx.bezierCurveTo(-size * 0.08, -size * 1.02, 0, -size * 0.78, 0, -size * 0.78); // left notch
  ctx.bezierCurveTo(0, -size * 0.78, size * 0.08, -size * 1.02, size * 0.25, -size * 0.82);
  ctx.bezierCurveTo(size * 1.05, -size * 0.5, size * 0.9, size * 0.3, 0, size);
  ctx.closePath();
}

function CrossingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    // Cherry blossom colour palette
    const petalColors = [
      "#FFB7C5", // classic sakura pink
      "#FFC4CF", // soft rose
      "#FFDDE5", // pale blush
      "#FF8FA3", // deeper petal
      "#FFF0F3", // near-white with pink
      "#F9C6D0", // dusty rose
    ];

    type Petal = {
      x: number; y: number;
      size: number;
      vx: number; vy: number;
      rot: number; drot: number;
      alpha: number;
      color: string;
      swayA: number; swayF: number; swayP: number;
    };

    const COUNT = 55;
    const petals: Petal[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,          // scatter across screen on load
      size: 5 + Math.random() * 8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: 0.3 + Math.random() * 0.55,
      rot: Math.random() * Math.PI * 2,
      drot: (Math.random() - 0.5) * 0.018,
      alpha: 0.25 + Math.random() * 0.45,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      swayA: 0.25 + Math.random() * 0.6,
      swayF: 0.006 + Math.random() * 0.01,
      swayP: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t++;

      for (const p of petals) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * p.swayF + p.swayP) * p.swayA;
        p.rot += p.drot;

        if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
        if (p.x > W + 20) p.x = -20;
        if (p.x < -20) p.x = W + 20;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        drawPetal(ctx, p.size);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#080808]" />
      {/* Soft breathing glow */}
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background: "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(196,18,48,0.08) 0%, transparent 65%)",
          animationDuration: "5s",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Bottom fade to content */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: "linear-gradient(to top, #080808 0%, transparent 100%)" }}
      />
    </div>
  );
}

const dishes = [
  {
    name: "Surf & Turf Ramen",
    origin: "Japan · Signature",
    desc: "Premium broth with butter-poached lobster, seared scallops, soft egg, nori and bamboo shoots",
    price: "₹725",
    gradient: "from-[#100808] via-[#1e100a] to-[#150a06]",
    image: "/dish-ramen.jpg",
  },
  {
    name: "Teriyaki Sea Bass Yakitori",
    origin: "Japan",
    desc: "Sea bass fillets chargrilled on skewer, glazed with our house teriyaki, finished with sesame",
    price: "₹695",
    gradient: "from-[#1a1208] via-[#2a1e0a] to-[#1e1505]",
    image: "/dish-yakitori.jpg",
  },
  {
    name: "Black Tuna Maki Roll",
    origin: "Japan",
    desc: "Premium tuna in black rice, wrapped in nori with toasted sesame and house soy",
    price: "₹795",
    gradient: "from-[#08100a] via-[#0f1a12] to-[#1a1608]",
    image: "/dish-sushi.jpg",
  },
  {
    name: "Malaysian Rendang Curry",
    origin: "Malaysia",
    desc: "Rich slow-cooked curry with deep spiced coconut gravy, slow-braised to perfection",
    price: "₹749",
    gradient: "from-[#0a0a12] via-[#15101e] to-[#1a0d0d]",
    image: "/dish-curry.jpg",
  },
];

const galleryItems = [
  { label: "Ambiance", className: "col-span-2 row-span-2", grad: "from-[#0a0810] via-[#180f18] to-[#0d080a]", image: "/gallery/DSC_0948.jpg" },
  { label: "Sushi Bar", className: "col-span-1 row-span-1", grad: "from-[#08100a] via-[#0e1810] to-[#080d07]", image: "/gallery/DSC_0839.jpg" },
  { label: "Cocktails", className: "col-span-1 row-span-1", grad: "from-[#100808] via-[#1e0f0a] to-[#12070a]", image: "/gallery/DSC_0984.jpg" },
  { label: "Dim Sum", className: "col-span-1 row-span-1", grad: "from-[#0a0a12] via-[#12101c] to-[#0a080e]", image: "/gallery/Ramen.jpg" },
  { label: "The Bar", className: "col-span-1 row-span-1", grad: "from-[#0f1005] via-[#1a180a] to-[#0d0c05]", image: "/gallery/DSC_0894.jpg" },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      >
        <CrossingBackground />

        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <Image
              src="/logo.png"
              alt="Shibuya Xing"
              width={1920}
              height={1080}
              className="object-contain h-36 w-auto"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-[#C41230] text-[10px] uppercase mb-10 font-medium tracking-[0.4em]"
          >
            Indiranagar · 12th Main Road · Bangalore
          </motion.p>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(56px,12vw,130px)] font-black uppercase leading-none tracking-tight text-[#f5f0eb]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Shibuya
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(56px,12vw,130px)] font-black uppercase leading-none tracking-tight text-shimmer"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Xing
            </motion.h1>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="divider-gold max-w-md mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-[#f5f0eb]/55 text-sm md:text-base tracking-[0.35em] uppercase mb-12 font-light"
          >
            One Crossing. Exotic Flavours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/menu"
              className="border border-[#C41230] text-[#C41230] px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-medium hover:bg-[#C41230] hover:text-[#080808] transition-all duration-300 flex items-center gap-2 justify-center group"
            >
              Explore Menu
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="https://reservations.petpooja.com/form/paidformperpax/f6b98aa9aecea9415aa032c0c57cefaac7ad50cde2469ff09ce9a459c11007258a7380430e0c4abb6912be5a85f35c85971ad72749fc89eef8aebf34050261f98b977b6aa68e06e05b9bde3790ab513d70607ef5be40b8e1a485966a9607a8da" target="_blank" rel="noopener noreferrer"
              className="bg-[#C41230] text-[#080808] px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#E8394D] transition-all duration-300 flex items-center justify-center"
            >
              Reserve a Table
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="text-[#787878] text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-[#C41230]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ COCKTAIL 3D FEATURE ═══════════════ */}
      <section className="relative py-0 overflow-hidden bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[700px]">
            {/* Text */}
            <AnimatedSection direction="left" className="py-24 lg:py-0 order-2 lg:order-1">
              <p className="text-[#C41230] text-[10px] tracking-[0.5em] uppercase mb-6 font-medium">
                Sake Cocktails
              </p>
              <h2
                className="text-[clamp(36px,5vw,60px)] font-bold text-[#f5f0eb] leading-tight mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                The{" "}
                <span className="italic text-[#C41230]">Sake Blossom</span>
              </h2>
              <div className="divider-gold max-w-[80px] mb-6" />
              <p className="text-[#787878] text-base leading-[1.9] mb-4">
                Japanese sake with delicate floral notes and cherry blossom essence. Every pour
                at Shibuya Xing is a small story of Asia in a glass — delicate, bold, and utterly memorable.
              </p>
              <p className="text-[#787878] text-sm leading-[1.9] mb-10">
                Drag the glass. Tilt it. It's yours for a moment.
              </p>
              <Link
                href="/menu"
                className="text-[#C41230] text-xs tracking-[0.3em] uppercase font-medium flex items-center gap-3 group hover:gap-4 transition-all duration-300"
              >
                See Cocktail Menu <ArrowRight size={14} />
              </Link>
            </AnimatedSection>

            {/* 3D Canvas */}
            <AnimatedSection direction="right" delay={0.1} className="order-1 lg:order-2">
              <div
                className="relative w-full"
                style={{ height: "clamp(340px, 55vw, 620px)" }}
              >
                <CocktailCanvas />
                {/* Glow beneath */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(196,18,48,0.18) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* THE CROSSING STORY */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <AnimatedSection direction="left">
            <p className="text-[#C41230] text-[10px] tracking-[0.5em] uppercase mb-6 font-medium">
              Our Story
            </p>
            <h2
              className="text-[clamp(36px,5vw,60px)] font-bold text-[#f5f0eb] leading-tight mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              From Tokyo&apos;s Most Famous{" "}
              <span className="italic text-[#C41230]">Crossing</span> to
              Bangalore&apos;s Heart
            </h2>
            <p className="text-[#787878] text-base leading-[1.9] mb-6">
              Shibuya Xing was born from a simple, soul-stirring idea — to recreate the
              electric energy of Tokyo&apos;s iconic Shibuya Crossing and weave it into
              every dish, every corner, and every moment of your dining experience.
            </p>
            <p className="text-[#787878] text-base leading-[1.9] mb-10">
              Where cultures converge, magic happens. Our kitchen is that crossing —
              Japanese precision, Chinese soul, Korean boldness, Thai vibrancy — all
              meeting at one table in the heart of Indiranagar.
            </p>
            <Link
              href="/about"
              className="text-[#C41230] text-xs tracking-[0.3em] uppercase font-medium flex items-center gap-3 group hover:gap-4 transition-all duration-300"
            >
              Read Our Story <ArrowRight size={14} />
            </Link>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="text-[#C41230]/[0.05] text-[280px] font-black select-none leading-none"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  ×
                </div>
              </div>
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#C41230]/25" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#C41230]/25" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#C41230]/25" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#C41230]/25" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
                {[
                  { num: "7+", label: "Asian Cuisines" },
                  { num: "80+", label: "Signature Dishes" },
                  { num: "1", label: "Iconic Address" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="text-5xl font-bold text-[#C41230] leading-none"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {stat.num}
                    </div>
                    <div className="text-[#787878] text-xs tracking-[0.35em] uppercase mt-2">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="divider-gold max-w-7xl mx-auto px-6" />

      {/* SIGNATURE DISHES */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-[#C41230] text-[10px] tracking-[0.5em] uppercase mb-4 font-medium">
            From Our Kitchen
          </p>
          <h2
            className="text-[clamp(32px,4.5vw,54px)] font-bold text-[#f5f0eb]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Signature Creations
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {dishes.map((dish) => (
            <StaggerItem key={dish.name}>
              <div className="border border-[#262626] bg-[#111111] group card-hover overflow-hidden">
                <div className={`h-52 bg-gradient-to-br ${dish.gradient} relative overflow-hidden`}>
                  {dish.image && (
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  )}
                  {/* dark overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-[#080808]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white/60 text-[9px] tracking-[0.4em] uppercase">
                      {dish.origin}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="text-[#f5f0eb] text-base font-semibold leading-tight"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {dish.name}
                    </h3>
                  </div>
                  <p className="text-[#787878] text-xs leading-relaxed">{dish.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="text-center mt-12" delay={0.2}>
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 border border-[#262626] text-[#f5f0eb]/60 px-8 py-3.5 text-xs tracking-[0.25em] uppercase hover:border-[#C41230] hover:text-[#C41230] transition-all duration-300 group"
          >
            View Full Menu
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </section>

      {/* ═══════════════ RAMEN SCROLL 3D ═══════════════ */}
      <RamenScrollSection />

      {/* THE EXPERIENCE */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#C41230] text-[10px] tracking-[0.5em] uppercase mb-4 font-medium">
              What We Offer
            </p>
            <h2
              className="text-[clamp(32px,4.5vw,54px)] font-bold text-[#f5f0eb]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Shibuya Experience
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e1e1e]">
            {[
              {
                num: "01",
                title: "Authentic Flavours",
                desc: "Every dish is a passport — sourced with precision, prepared with reverence for each cuisine's heritage. From Sichuan heat to Japanese umami.",
              },
              {
                num: "02",
                title: "Curated Ambiance",
                desc: "Dark, minimal, alive. Our space mirrors the Shibuya night — electric yet intimate, where strangers become part of the same story.",
              },
              {
                num: "03",
                title: "Heartfelt Service",
                desc: "We believe every table deserves to feel like the only table. Our team brings the warmth of Asian hospitality to every interaction.",
              },
            ].map((item) => (
              <StaggerItem key={item.num}>
                <div className="bg-[#0d0d0d] p-10 group hover:bg-[#111111] transition-colors duration-300 h-full">
                  <div
                    className="text-[#C41230]/15 text-6xl font-black leading-none mb-8 group-hover:text-[#C41230]/25 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {item.num}
                  </div>
                  <h3
                    className="text-[#f5f0eb] text-xl font-semibold mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#787878] text-sm leading-[1.9]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <AnimatedSection className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-[#C41230] text-[10px] tracking-[0.5em] uppercase mb-4 font-medium">
              Inside Shibuya Xing
            </p>
            <h2
              className="text-[clamp(32px,4.5vw,54px)] font-bold text-[#f5f0eb]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Space
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-[#C41230] text-xs tracking-[0.3em] uppercase font-medium flex items-center gap-2 group hover:gap-3 transition-all duration-300"
          >
            View Gallery <ArrowRight size={13} />
          </Link>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-3 h-[340px] md:h-[500px]">
          {galleryItems.map((item, i) => (
            <StaggerItem key={i} className={i === 0 ? "col-span-2 row-span-1 md:row-span-2" : "col-span-1 row-span-1"}>
              <div
                className={`h-full bg-gradient-to-br ${item.grad} relative overflow-hidden group cursor-pointer`}
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 crossing-grid opacity-20" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[#f5f0eb] text-xs tracking-[0.35em] uppercase border border-[#f5f0eb]/30 px-4 py-2 backdrop-blur-sm">
                    {item.label}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* RESERVE CTA */}
      <section className="py-32 relative overflow-hidden bg-[#080808]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(196,18,48,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 crossing-grid opacity-40" />
        <AnimatedSection className="relative z-10 text-center px-6">
          <p className="text-[#C41230] text-[10px] tracking-[0.5em] uppercase mb-6 font-medium">
            Join Us
          </p>
          <h2
            className="text-[clamp(36px,6vw,80px)] font-bold text-[#f5f0eb] leading-tight mb-6 max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Reserve Your Table
          </h2>
          <p className="text-[#787878] text-base max-w-xl mx-auto mb-12 leading-relaxed">
            Experience the soul of Shibuya in the heart of Bangalore. Book your seat at the crossing.
          </p>
          <Link
            href="https://reservations.petpooja.com/form/paidformperpax/f6b98aa9aecea9415aa032c0c57cefaac7ad50cde2469ff09ce9a459c11007258a7380430e0c4abb6912be5a85f35c85971ad72749fc89eef8aebf34050261f98b977b6aa68e06e05b9bde3790ab513d70607ef5be40b8e1a485966a9607a8da" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#C41230] text-[#080808] px-10 py-4 text-xs tracking-[0.3em] uppercase font-semibold hover:bg-[#E8394D] transition-all duration-300 group"
          >
            Make a Reservation
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
