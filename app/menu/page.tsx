"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";

/* ── Veg / Non-veg indicator ── */
function VegDot({ veg }: { veg: boolean }) {
  return (
    <span
      className="shrink-0 mt-1 inline-flex items-center justify-center w-4 h-4 border"
      style={{ borderColor: veg ? "rgba(74,160,74,0.6)" : "rgba(160,40,40,0.6)" }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full block"
        style={{ background: veg ? "rgba(74,160,74,0.75)" : "rgba(160,40,40,0.75)" }}
      />
    </span>
  );
}

/* ── Data ── */
interface Item { name: string; desc?: string; veg: boolean; tag?: string; }
interface Category { id: string; label: string; items: Item[]; }
interface Section { id: string; label: string; subtitle: string; categories: Category[]; showVegDot?: boolean; }

const PETPOOJA_URL = "https://reservations.petpooja.com/form/paidformperpax/f6b98aa9aecea9415aa032c0c57cefaac7ad50cde2469ff09ce9a459c11007258a7380430e0c4abb6912be5a85f35c85971ad72749fc89eef8aebf34050261f98b977b6aa68e06e05b9bde3790ab513d70607ef5be40b8e1a485966a9607a8da";

const SECTIONS: Section[] = [
  {
    id: "food",
    label: "Food",
    subtitle: "From the Kitchen",
    categories: [
      {
        id: "soup", label: "Soup",
        items: [
          { name: "Pho", veg: true },
          { name: "Thai Coconut Soup", veg: true },
          { name: "Thai Beetroot Soup", veg: true },
          { name: "Japanese Clear Soup", veg: true },
          { name: "Chicken Lung Fung", veg: false },
          { name: "Tom Yum", veg: false },
        ],
      },
      {
        id: "salads", label: "Salads",
        items: [
          { name: "Thai Glass Noodle Salad", veg: true },
          { name: "Japanese Mayonaise Lettuce", veg: true },
          { name: "Asian Snow Fungus", veg: true },
          { name: "Japanese Mayo Chicken", veg: false },
        ],
      },
      {
        id: "appetizers", label: "Appetizers",
        items: [
          { name: "Korean Gochujang Cauliflower", veg: true },
          { name: "Crispy Lotus Stem", veg: true },
          { name: "Honey Chili Fries", veg: true },
          { name: "Japanese Vegetable Gyoza", veg: true },
          { name: "Mix Vegetable Tempura", veg: true },
          { name: "Spicy Korean Tofu", veg: true },
          { name: "Teriyaki Chicken Wings", veg: false },
          { name: "Crispy Prawns Tempura", veg: false },
          { name: "Thai Lemongrass Chicken Skewers", veg: false },
          { name: "Japanese Chicken Gyoza", veg: false },
          { name: "Chilli Basil Fish", veg: false },
          { name: "Japanese Karaage", veg: false, tag: "Chef's Pick" },
          { name: "Korean Yangnyeom Chicken", veg: false },
          { name: "Korean Fried Ganjang Chicken", veg: false },
          { name: "Korean Huraideu Chicken", veg: false },
          { name: "Japanese Style Shrimps", veg: false },
          { name: "Japanese Egg Chilli", veg: false },
        ],
      },
      {
        id: "yakitori", label: "Yakitori",
        items: [
          { name: "Spicy Pineapple & Tofu Yakitori", veg: true },
          { name: "Sweet & Spicy Mushroom Yakitori", veg: true },
          { name: "Sesame Honey Chilli Paneer Yakitori", veg: true },
          { name: "Sour & Spicy Lemon Chili Veggies Yakitori", veg: true },
          { name: "Spicy Gochujang Chicken Yakitori", veg: false, tag: "Chef's Pick" },
          { name: "Garlic Butter Prawn Yakitori", veg: false },
          { name: "Smoky Chili Garlic Squid Yakitori", veg: false },
          { name: "Teriyaki Sea Bass Yakitori", veg: false },
        ],
      },
      {
        id: "dimsum", label: "Dim Sum",
        items: [
          { name: "Paneer & Chilli Dim Sum", veg: true },
          { name: "Spiced Vegetable Dim Sum", veg: true },
          { name: "Corn & Cheese Steamed Dim Sum", veg: true },
          { name: "Chicken Teriyaki Dim Sum", veg: false },
          { name: "Prawn Hargao Dim Sum", veg: false },
          { name: "Spicy Fish Dim Sum", veg: false },
        ],
      },
      {
        id: "sushi", label: "Sushi",
        items: [
          { name: "Avocado & Cucumber Roll", veg: true },
          { name: "Mix Veg Maki Roll", veg: true },
          { name: "Caterpillar Uramaki Roll", veg: true },
          { name: "Nigiri Avocado", veg: true },
          { name: "House Veg Maki Roll", veg: true },
          { name: "California Crab Stick Roll", veg: false },
          { name: "California Crab Stick Roll (Spicy)", veg: false },
          { name: "Prawn Tempura Roll", veg: false },
          { name: "Spicy Grilled Fish Roll", veg: false },
          { name: "Salmon Roll", veg: false },
          { name: "White Tuna Roll", veg: false },
          { name: "Black Tuna Maki Roll", veg: false },
          { name: "Tuna Nigiri Roll", veg: false },
        ],
      },
      {
        id: "bao", label: "Bao",
        items: [
          { name: "Char Siu Bao", veg: true },
          { name: "Veg Bao", veg: true },
          { name: "Chicken Bao", veg: false },
          { name: "Prawn Bao", veg: false },
        ],
      },
      {
        id: "curries", label: "Asian Curries",
        items: [
          { name: "Thai Green Curry", veg: true },
          { name: "Veg Malaysian Rendang Curry", veg: true },
          { name: "Thai Yellow Curry", veg: true },
          { name: "Malaysian Rendang Curry", veg: false },
        ],
      },
      {
        id: "ramen", label: "Ramen",
        items: [
          { name: "Spicy Tofu Miso Ramen", veg: true },
          { name: "Shoyu Mushroom Ramen", veg: true },
          { name: "Mix Veggie Delight Shio Ramen", veg: true },
          { name: "Spicy Korean Chicken Ramen", veg: false, tag: "Chef's Pick" },
          { name: "Shoyu Grilled Chicken Ramen", veg: false },
          { name: "Spicy Chicken Miso Ramen", veg: false },
          { name: "Seafood Shio Ramen", veg: false },
          { name: "Spicy Prawn Miso Ramen", veg: false },
          { name: "Shoyu Fish Ramen", veg: false },
          { name: "Surf & Turf Ramen", veg: false, tag: "Signature" },
        ],
      },
      {
        id: "teppanyaki", label: "Teppanyaki & Mains",
        items: [
          { name: "Spicy Paneer Teppan Meal", veg: true },
          { name: "Teriyaki Veggie Rice Meal", veg: true },
          { name: "Indo-Thai Tofu Teppan Bowl", veg: true },
          { name: "Chicken Teppan Tikka Noodle Meal", veg: false },
          { name: "Bangkok Chicken Rice Bowl Meal", veg: false, tag: "Chef's Pick" },
          { name: "Prawn Teppanyaki Rice Meal", veg: false },
          { name: "Fish Masala Teppan Meal", veg: false },
          { name: "Japanese Fried Rice Squid Meal", veg: false },
          { name: "Asian Steamed Fish Thai Rice Meal", veg: false },
        ],
      },
      {
        id: "desserts", label: "Desserts",
        items: [
          { name: "Matcha Mousse With Crushed Biscuit Base", veg: true },
          { name: "Mango Mochi With Ice Cream Filling", veg: true },
          { name: "Black Sesame & Coconut Pudding", veg: true },
          { name: "Lychee & Rose Jelly Cups", veg: true },
          { name: "Thai Sticky Rice With Coconut & Jaggery", veg: true },
          { name: "Darshan With Ice Cream", veg: true },
          { name: "Vietnamese Coffee And Cream Jelly", veg: true },
          { name: "Japanese Cheesecake", veg: false },
        ],
      },
    ],
  },
  {
    id: "cocktails",
    label: "Cocktails",
    subtitle: "From the Bar",
    showVegDot: false,
    categories: [
      {
        id: "kombucha", label: "Kombucha",
        items: [
          { name: "Blueberry Kombucha", veg: true },
          { name: "Cola Kombucha", veg: true },
          { name: "Salted Lime Kombucha", veg: true },
          { name: "Peach Kombucha", veg: true },
          { name: "Yuzu Kombucha", veg: true },
          { name: "Ginger Kombucha", veg: true },
        ],
      },
      {
        id: "mocktails", label: "Mocktails",
        items: [
          { name: "Strawberry Basil Mojito", veg: true },
          { name: "Apple Mint Cooler", veg: true },
          { name: "Lemonade", veg: true },
          { name: "Seoul Sunset", veg: true },
          { name: "Unexpected Waves", veg: true },
          { name: "Classic Virgin Mojito", veg: true },
          { name: "Thai Basil Mojito", veg: true },
          { name: "Alligator Berry Cool", veg: true },
          { name: "Mango Colada", veg: true },
          { name: "Lemongrass Kombucha", veg: true },
        ],
      },
      {
        id: "wine", label: "Wine",
        items: [
          { name: "Jacob Creek Cabernet", veg: true },
          { name: "Jacob Creek Merlot", veg: true },
          { name: "Sula Dindori", veg: true },
          { name: "Sula Shiraz Cabernet", veg: true },
          { name: "Campo Viejo Tempranillo", veg: true },
          { name: "Jacob Creek Chardonnay", veg: true },
          { name: "Born West Chardonnay", veg: true },
          { name: "Fratelli Chenin Blanc", veg: true },
          { name: "Sula Brut", veg: true },
          { name: "Noi", veg: true },
          { name: "Sula Zinfandel", veg: true },
          { name: "Ziva", veg: true },
          { name: "White Wine Sangria", veg: true },
          { name: "Sangria Red Wine", veg: true },
          { name: "Mimosa", veg: true },
          { name: "Cranberry Wine Sour", veg: true },
          { name: "Rose Fuzz", veg: true },
        ],
      },
    ],
  },
  {
    id: "sake",
    label: "Sake & Soju",
    subtitle: "The Prime Attraction",
    showVegDot: false,
    categories: [
      {
        id: "sake-bottles", label: "Sake & Spirits",
        items: [
          { name: "Gekkeikan Traditional", veg: true },
          { name: "Han Akita", veg: true },
          { name: "Hakushika Sake", veg: true },
          { name: "Hakusturu Sake", veg: true },
          { name: "Sake Blossom", veg: true, tag: "Signature" },
          { name: "White Mountain", veg: true },
        ],
      },
    ],
  },
];

/* ── Section content with sidebar + scroll ── */
function SectionContent({ section }: { section: Section }) {
  const showVegDot = section.showVegDot !== false;
  const [activeId, setActiveId] = useState(section.categories[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [section.id]);

  const scrollTo = (id: string) => {
    isClickScrolling.current = true;
    setActiveId(id);
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 68 + 56 + 56; // navbar + section tabs + category tabs
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setTimeout(() => { isClickScrolling.current = false; }, 800);
  };

  /* hide sidebar if only one category */
  const showSidebar = section.categories.length > 1;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <div className="flex gap-12">
        {/* Desktop sidebar */}
        {showSidebar && (
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-[180px] space-y-1">
              {section.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollTo(cat.id)}
                  className="w-full text-left px-4 py-2.5 text-sm transition-all duration-200 rounded"
                  style={{
                    color: activeId === cat.id ? "#C41230" : "rgba(245,240,235,0.45)",
                    borderLeft: activeId === cat.id ? "2px solid #C41230" : "2px solid transparent",
                    background: activeId === cat.id ? "rgba(196,18,48,0.06)" : "transparent",
                  }}
                >
                  {cat.label}
                  <span className="text-[#4a4a4a] text-xs ml-1">({cat.items.length})</span>
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Items */}
        <div className="flex-1 min-w-0 space-y-12">
          {section.categories.map((cat) => (
            <div
              key={cat.id}
              id={cat.id}
              ref={(el) => { sectionRefs.current[cat.id] = el; }}
            >
              <div className="mb-6 pb-3 border-b border-[#1a1a1a]">
                <h2 className="text-[#f5f0eb] text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                  {cat.label}
                </h2>
                <p className="text-[#4a4a4a] text-xs mt-0.5">{cat.items.length} items</p>
              </div>

              <div className="divide-y divide-[#141414]">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex items-start gap-4 py-4 group hover:bg-[#0d0d0d] -mx-3 px-3 transition-colors duration-200 rounded">
                    {showVegDot && <VegDot veg={item.veg} />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[#f5f0eb] text-sm font-medium group-hover:text-white transition-colors">
                          {item.name}
                        </span>
                        {item.tag && (
                          <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border border-[#C41230]/40 text-[#C41230] font-medium shrink-0">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <p className="text-[#4a4a4a] text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Bottom note */}
          <div className="pt-6 border-t border-[#1a1a1a] text-center">
            <p className="text-[#4a4a4a] text-xs tracking-widest uppercase mb-4">
              For allergies or special dietary requirements, please inform your server
            </p>
            <a
              href={PETPOOJA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#C41230] text-[#C41230] px-8 py-3 text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[#C41230] hover:text-[#080808] transition-all duration-300"
            >
              Reserve a Table
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [activeSectionId, setActiveSectionId] = useState(SECTIONS[0].id);
  const activeSection = SECTIONS.find((s) => s.id === activeSectionId)!;

  const switchSection = (id: string) => {
    setActiveSectionId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-44 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(196,18,48,0.05) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 crossing-grid opacity-30" />
        <AnimatedSection className="relative z-10 max-w-7xl mx-auto">
          <p className="text-[#C41230] text-[clamp(22px,2.5vw,36px)] tracking-[0.12em] uppercase mb-3 font-bold">Shibuya Xing</p>
          <h1 className="text-base font-semibold text-[#f5f0eb] uppercase leading-none tracking-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Flavours
          </h1>
          <div className="divider-gold max-w-xs mb-5" />
          <p className="text-[#787878] text-base max-w-lg leading-relaxed">
            One crossing, many flavours. Every dish crafted with intention, every ingredient chosen with care.
          </p>
        </AnimatedSection>
      </section>

      {/* ── 3 main section tabs ── */}
      <div className="sticky top-[68px] z-40 bg-[#080808]/95 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0">
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => switchSection(sec.id)}
                className="relative flex-1 md:flex-none px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
                style={{
                  color: activeSectionId === sec.id ? "#f5f0eb" : "rgba(245,240,235,0.35)",
                  borderBottom: activeSectionId === sec.id ? "2px solid #C41230" : "2px solid transparent",
                }}
              >
                {sec.label}
                {sec.id === "sake" && (
                  <span className="ml-2 text-[8px] tracking-[0.15em] uppercase px-1.5 py-0.5 border border-[#F5C200]/50 text-[#F5C200] align-middle">
                    Prime
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section label ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-2">
        <p className="text-[#C41230] text-[11px] tracking-[0.4em] uppercase font-medium">{activeSection.subtitle}</p>
      </div>

      {/* ── Section content ── */}
      <SectionContent key={activeSectionId} section={activeSection} />
    </>
  );
}
