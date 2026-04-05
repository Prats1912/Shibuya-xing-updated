"use client";

import { useRef } from "react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

export default function CocktailCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
      style={{ background: "#0a0808" }}
    >
      {/* Ambient glow beneath the glass */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "40%",
          height: "80px",
          background: "radial-gradient(ellipse at center, rgba(196,18,48,0.28) 0%, transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      {/* Soft pink glow matching the drink */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "55%",
          height: "50%",
          background: "radial-gradient(ellipse at center, rgba(220,140,160,0.07) 0%, transparent 65%)",
          filter: "blur(30px)",
        }}
      />

      <Tilt
        tiltMaxAngleX={14}
        tiltMaxAngleY={14}
        perspective={1100}
        scale={1.03}
        transitionSpeed={600}

        glareEnable={true}
        glareMaxOpacity={0.12}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="0px"
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glass image */}
        <div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src="/sake-blossom.jpg"
            alt="Sake Blossom — Shibuya Xing Signature Cocktail"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />

          {/* Floating depth layer — petals pop forward on hover */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ transform: "translateZ(24px)" }}
          >
            {/* Subtle rim shimmer */}
            <div
              className="absolute"
              style={{
                top: "23%",
                left: "28%",
                width: "44%",
                height: "3px",
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)",
                borderRadius: "50%",
                filter: "blur(2px)",
              }}
            />
          </div>
        </div>
      </Tilt>
    </div>
  );
}
