"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const TOTAL_FRAMES = 240;
const BG_COLOR = "#0c0c0c";

function frameSrc(index: number): string {
  return `/frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.png`;
}

/* ─────────────────────────────────────────────
   TEXT OVERLAYS
   from/to are scroll progress values (0–1)
───────────────────────────────────────────── */
interface Overlay {
  from: number;
  to: number;
  label: string;
  heading: string;
  sub?: string;
  cta?: boolean;
}

const OVERLAYS: Overlay[] = [
  {
    from: 0,
    to: 0.22,
    label: "Surf & Turf Ramen",
    heading: "An Experience\nUnlike Any Other.",
    sub: "Our most celebrated bowl. Every ingredient chosen, every element placed with intention.",
  },
  {
    from: 0.27,
    to: 0.50,
    label: "The Ingredients",
    heading: "Butter-Poached Lobster.\nSeared Scallops.\nHandpulled Noodles.",
  },
  {
    from: 0.55,
    to: 0.78,
    label: "The Philosophy",
    heading: "Crafted Slowly.\nServed Once.",
    sub: "No shortcuts. No compromises. Just the bowl as it was meant to be.",
  },
  {
    from: 0.84,
    to: 1.0,
    label: "Shibuya Xing · Indiranagar",
    heading: "Reserve Your Table.",
    cta: true,
  },
];

function computeOpacity(progress: number, from: number, to: number): number {
  const fade = 0.045;
  if (progress <= from || progress >= to) return 0;
  if (progress < from + fade) return (progress - from) / fade;
  if (progress > to - fade) return (to - progress) / fade;
  return 1;
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function RamenScrollSection() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const framesRef    = useRef<HTMLImageElement[]>([]);
  const rafRef       = useRef<number>(0);
  const progressRef  = useRef(0);
  const lastFrameRef = useRef(-1);

  const [loaded,         setLoaded]         = useState(false);
  const [loadProgress,   setLoadProgress]   = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile,       setIsMobile]       = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── 1. Preload all frames ── */
  useEffect(() => {
    let completed = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      const onDone = () => {
        completed++;
        setLoadProgress(Math.round((completed / TOTAL_FRAMES) * 100));
        if (completed === TOTAL_FRAMES) setLoaded(true);
      };
      img.onload  = onDone;
      img.onerror = onDone; // fail silently, keep going
      images[i] = img;
    }
    framesRef.current = images;
  }, []);

  /* ── 2. Draw a single frame (contain + centred) ── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = framesRef.current[index];
    if (!img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, cw, ch);

    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth  * scale;
    const dh = img.naturalHeight * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);

    // ── Cover Veo watermark (bottom-right corner of every frame) ──
    // Watermark is at approx x:1180–1280, y:678–720 in 1280×720 image space.
    // We cover generously and extend all the way to the canvas edge.
    // Sample a 5×5 block to the left of the patch for an accurate bg colour.
    const wmX = dx + (1160 / 1280) * dw;
    const wmY = dy + (672 / 720)  * dh;
    const wmW = cw - wmX;   // canvas right edge
    const wmH = ch - wmY;   // canvas bottom edge

    // Average a small block just to the left of the watermark
    const sX = Math.max(0, Math.floor(wmX) - 10);
    const sY = Math.max(0, Math.floor(wmY + wmH * 0.3));
    const sampleData = ctx.getImageData(sX, sY, 5, 5).data;
    let r = 0, g = 0, b = 0;
    for (let p = 0; p < 25; p++) {
      r += sampleData[p * 4];
      g += sampleData[p * 4 + 1];
      b += sampleData[p * 4 + 2];
    }
    ctx.fillStyle = `rgb(${Math.round(r / 25)},${Math.round(g / 25)},${Math.round(b / 25)})`;
    ctx.fillRect(wmX, wmY, wmW, wmH);
  }, []);

  /* ── 3. Resize canvas to viewport ── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const idx = lastFrameRef.current >= 0 ? lastFrameRef.current : 0;
    drawFrame(idx);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  /* ── 4. Scroll → RAF loop ── */
  useEffect(() => {
    if (!loaded) return;

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect     = section.getBoundingClientRect();
      const range    = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      progressRef.current = Math.max(0, Math.min(1, scrolled / range));
    };

    const tick = () => {
      const p = progressRef.current;
      setScrollProgress(p);

      const idx = Math.min(TOTAL_FRAMES - 1, Math.floor(p * TOTAL_FRAMES));
      if (idx !== lastFrameRef.current) {
        lastFrameRef.current = idx;
        drawFrame(idx);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    drawFrame(0); // draw first frame immediately

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, drawFrame]);

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      style={{ height: "400vh", position: "relative", background: BG_COLOR }}
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100vh", background: BG_COLOR }}
      >
        {/* ── Canvas ── */}
        <canvas
          ref={canvasRef}
          style={{ display: "block", position: "absolute", inset: 0 }}
        />

        {/* ── Loading state ── */}
        {!loaded && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center"
            style={{ background: BG_COLOR }}
          >
            <p
              className="text-white/20 text-[9px] tracking-[0.7em] uppercase mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Shibuya Xing
            </p>

            {/* Progress bar */}
            <div className="relative w-48 h-px bg-white/8 overflow-hidden mb-5">
              <div
                className="absolute inset-y-0 left-0 bg-[#C41230]"
                style={{
                  width: `${loadProgress}%`,
                  transition: "width 0.12s linear",
                }}
              />
            </div>

            <p className="text-white/20 text-[9px] tracking-[0.45em] uppercase">
              {loadProgress < 100 ? `Preparing · ${loadProgress}%` : "Ready"}
            </p>
          </div>
        )}

        {/* ── Desktop: left dark panel ── */}
        {loaded && !isMobile && (
          <div
            className="absolute inset-y-0 left-0 pointer-events-none"
            style={{
              width: "clamp(280px, 42vw, 560px)",
              background: "linear-gradient(to right, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.88) 55%, transparent 100%)",
            }}
          />
        )}

        {/* ── Mobile: bottom dark panel ── */}
        {loaded && isMobile && (
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: "52%",
              background: "linear-gradient(to top, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.85) 55%, transparent 100%)",
            }}
          />
        )}

        {/* ── Text overlays ── */}
        {loaded && OVERLAYS.map((overlay, i) => {
          const opacity = computeOpacity(scrollProgress, overlay.from, overlay.to);
          if (opacity === 0) return null;

          /* ── Mobile layout: centered bottom ── */
          if (isMobile) {
            return (
              <div
                key={i}
                className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center pointer-events-none"
                style={{
                  padding: "0 28px 44px",
                  opacity,
                  transition: "opacity 0.15s linear",
                }}
              >
                <p
                  className="text-[#C41230] font-medium uppercase mb-3"
                  style={{ fontSize: "9px", letterSpacing: "0.45em" }}
                >
                  {overlay.label}
                </p>

                <h2
                  className="text-white/95 font-bold leading-tight mb-4"
                  style={{
                    fontSize: "clamp(22px, 6vw, 32px)",
                    fontFamily: "var(--font-playfair)",
                    whiteSpace: "pre-line",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {overlay.heading}
                </h2>

                <div className="bg-[#C41230] mb-4 mx-auto" style={{ height: "1px", width: "36px" }} />

                {overlay.sub && (
                  <p className="text-white/50 leading-relaxed" style={{ fontSize: "13px" }}>
                    {overlay.sub}
                  </p>
                )}

                {overlay.cta && (
                  <Link
                    href="https://reservations.petpooja.com/form/paidformperpax/f6b98aa9aecea9415aa032c0c57cefaac7ad50cde2469ff09ce9a459c11007258a7380430e0c4abb6912be5a85f35c85971ad72749fc89eef8aebf34050261f98b977b6aa68e06e05b9bde3790ab513d70607ef5be40b8e1a485966a9607a8da" target="_blank" rel="noopener noreferrer"
                    className="pointer-events-auto inline-block mt-5 uppercase font-medium"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.3em",
                      padding: "12px 28px",
                      border: "1px solid rgba(196,18,48,0.5)",
                      color: "rgba(255,255,255,0.85)",
                      background: "rgba(196,18,48,0.1)",
                    }}
                  >
                    Reserve a Table
                  </Link>
                )}
              </div>
            );
          }

          /* ── Desktop layout: left panel ── */
          return (
            <div
              key={i}
              className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
              style={{
                width: "clamp(280px, 42vw, 560px)",
                padding: "0 clamp(24px, 5vw, 64px)",
                opacity,
                transition: "opacity 0.15s linear",
              }}
            >
              <div className="w-full">
                <p
                  className="text-[#C41230] font-medium uppercase mb-4"
                  style={{ fontSize: "clamp(9px, 0.85vw, 11px)", letterSpacing: "0.5em" }}
                >
                  {overlay.label}
                </p>

                <h2
                  className="text-white/95 font-bold leading-tight mb-5"
                  style={{
                    fontSize: "clamp(24px, 3.2vw, 48px)",
                    fontFamily: "var(--font-playfair)",
                    whiteSpace: "pre-line",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {overlay.heading}
                </h2>

                <div className="bg-[#C41230] mb-5" style={{ height: "1px", width: "40px" }} />

                {overlay.sub && (
                  <p className="text-white/55 leading-relaxed" style={{ fontSize: "clamp(13px, 1.1vw, 15px)" }}>
                    {overlay.sub}
                  </p>
                )}

                {overlay.cta && (
                  <Link
                    href="https://reservations.petpooja.com/form/paidformperpax/f6b98aa9aecea9415aa032c0c57cefaac7ad50cde2469ff09ce9a459c11007258a7380430e0c4abb6912be5a85f35c85971ad72749fc89eef8aebf34050261f98b977b6aa68e06e05b9bde3790ab513d70607ef5be40b8e1a485966a9607a8da" target="_blank" rel="noopener noreferrer"
                    className="pointer-events-auto inline-block mt-6 uppercase font-medium"
                    style={{
                      fontSize: "clamp(9px, 0.85vw, 11px)",
                      letterSpacing: "0.35em",
                      padding: "13px 28px",
                      border: "1px solid rgba(196,18,48,0.5)",
                      color: "rgba(255,255,255,0.85)",
                      background: "rgba(196,18,48,0.1)",
                      transition: "border-color 0.3s, background 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(196,18,48,0.9)";
                      (e.currentTarget as HTMLAnchorElement).style.background  = "rgba(196,18,48,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(196,18,48,0.5)";
                      (e.currentTarget as HTMLAnchorElement).style.background  = "rgba(196,18,48,0.1)";
                    }}
                  >
                    Reserve a Table
                  </Link>
                )}
              </div>
            </div>
          );
        })}

        {/* ── Scroll hint ── */}
        {loaded && scrollProgress < 0.05 && (
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none"
            style={{ opacity: Math.max(0, 1 - scrollProgress / 0.05) }}
          >
            <div className="text-white/25 uppercase"
                 style={{ fontSize: "9px", letterSpacing: "0.5em" }}>
              Scroll to Experience
            </div>
            <div className="mx-auto mt-3 w-px bg-white/15"
                 style={{ height: "32px" }} />
          </div>
        )}

        {/* ── Section title — always visible at top ── */}
        {loaded && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
            <p className="text-white/20 uppercase"
               style={{ fontSize: "9px", letterSpacing: "0.6em" }}>
              Scroll to Build
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
