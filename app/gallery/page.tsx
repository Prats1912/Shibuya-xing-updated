"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

type GalleryCategory = "all" | "ambiance" | "food" | "bar" | "events";

interface GalleryItem {
  label: string;
  category: Exclude<GalleryCategory, "all">;
  gradient: string;
  size?: "large" | "normal";
  image?: string;
}

const items: GalleryItem[] = [
  { label: "The Dining Room", category: "ambiance", gradient: "from-[#0a0810] via-[#18101a] to-[#0d0810]", size: "large", image: "/gallery/DSC_0015.jpg" },
  { label: "Dragon Roll", category: "food", gradient: "from-[#08100a] via-[#0e1a10] to-[#080d07]", image: "/gallery/Ramen.jpg" },
  { label: "The Bar", category: "bar", gradient: "from-[#100808] via-[#1a0f08] to-[#100a06]", image: "/gallery/DSC_0984.jpg" },
  { label: "Sushi Bar", category: "ambiance", gradient: "from-[#0a0a12] via-[#12101c] to-[#0a080e]", image: "/gallery/DSC_0839.jpg" },
  { label: "Wagyu Bulgogi", category: "food", gradient: "from-[#0f1005] via-[#1a1808] to-[#0d0c05]", size: "large", image: "/gallery/Ramen-preperationbychef.jpg" },
  { label: "Private Events", category: "events", gradient: "from-[#0a0810] via-[#150f15] to-[#0a080d]", image: "/gallery/DSC_0948.jpg" },
  { label: "Xiao Long Bao", category: "food", gradient: "from-[#08100a] via-[#101808] to-[#08100a]", image: "/gallery/head-chef.jpg" },
  { label: "Cocktail Bar", category: "bar", gradient: "from-[#0d0808] via-[#180e0a] to-[#100808]", size: "large", image: "/gallery/DSC_0894.jpg" },
  { label: "The Entrance", category: "ambiance", gradient: "from-[#080810] via-[#10101a] to-[#08080d]", image: "/gallery/DSC_0842.jpg" },
  { label: "Matcha Lava Cake", category: "food", gradient: "from-[#081008] via-[#0e180e] to-[#080d08]", image: "/gallery/DSC_0854.jpg" },
  { label: "Corporate Dining", category: "events", gradient: "from-[#0a0810] via-[#14101e] to-[#0a080e]", image: "/gallery/DSC_0950.jpg" },
  { label: "Sakura Fizz", category: "bar", gradient: "from-[#100808] via-[#1e0f10] to-[#120808]" },
];

const tabs: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ambiance", label: "Ambiance" },
  { id: "food", label: "Food" },
  { id: "bar", label: "Bar & Cocktails" },
  { id: "events", label: "Events" },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>("all");

  const filtered =
    activeTab === "all" ? items : items.filter((i) => i.category === activeTab);

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
          <p className="text-[#C41230] text-[10px] tracking-[0.5em] uppercase mb-4 font-medium">
            Shibuya Xing
          </p>
          <h1
            className="text-[clamp(48px,8vw,96px)] font-black text-[#f5f0eb] uppercase leading-none tracking-tight mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Gallery
          </h1>
          <div className="divider-gold max-w-xs mb-6" />
          <p className="text-[#787878] text-base max-w-lg leading-relaxed">
            A visual journey through our space, our food, and the moments that make Shibuya Xing unforgettable.
          </p>
        </AnimatedSection>
      </section>

      {/* Filter tabs */}
      <div className="sticky top-[68px] z-40 bg-[#080808]/95 backdrop-blur-md border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-5 py-4 text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 whitespace-nowrap"
                style={{ color: activeTab === tab.id ? "#C41230" : "rgba(245,240,235,0.45)" }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="gallery-tab"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#C41230]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StaggerContainer className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((item, i) => (
                <StaggerItem key={`${activeTab}-${i}`}>
                  <div
                    className={`
                      break-inside-avoid
                      bg-gradient-to-br ${item.gradient}
                      relative overflow-hidden group cursor-pointer
                      ${item.size === "large" ? "h-80" : "h-56"}
                    `}
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
                    <div className="absolute inset-0 crossing-grid opacity-25" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 60%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                      <p className="text-[#C41230] text-[9px] tracking-[0.35em] uppercase mt-0.5">
                        {item.category}
                      </p>
                    </div>
                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C41230]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-32 text-[#787878] text-sm tracking-widest uppercase">
            No images in this category yet
          </div>
        )}
      </section>

      {/* Social note */}
      <section className="pb-20 px-6">
        <AnimatedSection className="max-w-7xl mx-auto text-center">
          <p className="text-[#787878] text-xs tracking-widest uppercase">
            Share your visit · Tag us on social media
          </p>
        </AnimatedSection>
      </section>
    </>
  );
}
