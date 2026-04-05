"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MenuItem {
  name: string;
  desc: string;
  price?: string;
  tag?: string;
}

interface MenuCategory {
  id: string;
  label: string;
  subtitle: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    id: "starters",
    label: "Appetizers",
    subtitle: "Soups, salads & small bites",
    items: [
      { name: "Pho", desc: "Vietnamese clear broth with rice noodles, fresh herbs and tofu", price: "₹300", tag: "Veg" },
      { name: "Tom Yum", desc: "Classic Thai hot & sour broth with mushrooms and galangal", price: "₹375" },
      { name: "Thai Coconut Soup", desc: "Creamy Thai coconut milk soup with lemongrass and kaffir lime", price: "₹300", tag: "Veg" },
      { name: "Thai Glass Noodle Salad", desc: "Tangy glass noodles tossed with fresh vegetables and Thai herbs", price: "₹375", tag: "Veg" },
      { name: "Korean Gochujang Cauliflower", desc: "Crispy cauliflower glazed with spicy Korean gochujang sauce", price: "₹395", tag: "Veg" },
      { name: "Japanese Vegetable Gyoza", desc: "Pan-fried vegetable dumplings with ponzu dipping sauce", price: "₹350", tag: "Veg" },
      { name: "Mix Vegetable Tempura", desc: "Seasonal vegetables in a light Japanese tempura batter", price: "₹375", tag: "Veg" },
      { name: "Crispy Prawns Tempura", desc: "Tiger prawns in crispy Japanese batter with dipping sauce", price: "₹450" },
      { name: "Japanese Karaage", desc: "Japanese-style fried chicken, crispy and juicy, with kewpie mayo", price: "₹425", tag: "Chef's Pick" },
      { name: "Thai Lemongrass Chicken Skewers", desc: "Grilled chicken marinated in fresh lemongrass and aromatic herbs", price: "₹525" },
      { name: "Teriyaki Chicken Wings", desc: "Glazed chicken wings with sweet teriyaki sauce and sesame", price: "₹425" },
      { name: "Korean Yangnyeom Chicken", desc: "Crispy fried chicken tossed in sweet and spicy Korean sauce", price: "₹475" },
    ],
  },
  {
    id: "yakitori",
    label: "Yakitori",
    subtitle: "Japanese grilled skewers",
    items: [
      { name: "Spicy Pineapple & Tofu Yakitori", desc: "Grilled tofu and pineapple skewers with spicy glaze", price: "₹495", tag: "Veg" },
      { name: "Sweet & Spicy Mushroom Yakitori", desc: "Chargrilled mushroom skewers with sweet chili glaze", price: "₹495", tag: "Veg" },
      { name: "Sesame Honey Chilli Paneer Yakitori", desc: "Grilled paneer skewers with sesame, honey and chilli", price: "₹495", tag: "Veg" },
      { name: "Spicy Gochujang Chicken Yakitori", desc: "Juicy chicken skewers marinated in bold Korean gochujang paste", price: "₹595", tag: "Chef's Pick" },
      { name: "Garlic Butter Prawn Yakitori", desc: "Chargrilled prawns brushed with garlic butter and herbs", price: "₹695" },
      { name: "Smoky Chili Garlic Squid Yakitori", desc: "Tender squid skewers with smoky chili garlic marinade", price: "₹695" },
      { name: "Teriyaki Sea Bass Yakitori", desc: "Sea bass fillets glazed with house teriyaki sauce", price: "₹695" },
    ],
  },
  {
    id: "sushi",
    label: "Sushi",
    subtitle: "Japanese precision",
    items: [
      { name: "Avocado & Cucumber Roll", desc: "Classic veg maki with creamy avocado and crisp cucumber", price: "₹425", tag: "Veg" },
      { name: "Caterpillar Uramaki Roll", desc: "Inside-out roll topped with avocado slices and sweet sauce", price: "₹475", tag: "Veg" },
      { name: "House Veg Maki Roll", desc: "Seasonal vegetables rolled in nori and sushi rice", price: "₹475", tag: "Veg" },
      { name: "California Crab Stick Roll", desc: "Crab stick, cucumber and avocado in a classic California roll", price: "₹695" },
      { name: "Prawn Tempura Roll", desc: "Crispy prawn tempura rolled with avocado and spicy mayo", price: "₹695", tag: "Chef's Pick" },
      { name: "Salmon Roll", desc: "Fresh salmon, cucumber and cream cheese in a nori roll", price: "₹695" },
      { name: "Spicy Grilled Fish Roll", desc: "Grilled fish with spicy chili paste and pickled vegetables", price: "₹695" },
      { name: "Black Tuna Maki Roll", desc: "Premium tuna wrapped in nori with toasted sesame and black rice", price: "₹795" },
      { name: "Tuna Nigiri Roll", desc: "Fresh tuna over hand-pressed sushi rice", price: "₹725" },
    ],
  },
  {
    id: "dimsum",
    label: "Dim Sum",
    subtitle: "Chinese soul",
    items: [
      { name: "Paneer & Chilli Dim Sum", desc: "Steamed dumplings filled with spiced paneer and green chilli", price: "₹350", tag: "Veg" },
      { name: "Spiced Vegetable Dim Sum", desc: "Delicate steamed dumplings with an aromatic vegetable filling", price: "₹350", tag: "Veg" },
      { name: "Corn & Cheese Steamed Dim Sum", desc: "Soft steamed dumplings with sweet corn and cheese filling", price: "₹450", tag: "Veg" },
      { name: "Chicken Teriyaki Dim Sum", desc: "Steamed chicken dumplings with a teriyaki glaze", price: "₹400", tag: "Chef's Pick" },
      { name: "Prawn Hargao Dim Sum", desc: "Classic Cantonese steamed prawn dumplings in translucent skin", price: "₹500" },
      { name: "Spicy Fish Dim Sum", desc: "Steamed fish dumplings with a spicy chili dipping sauce", price: "₹500" },
    ],
  },
  {
    id: "bao-curries",
    label: "Bao & Curries",
    subtitle: "Steamed buns & Asian broths",
    items: [
      { name: "Veg Bao", desc: "Fluffy steamed bao bun with seasoned vegetable filling", price: "₹425", tag: "Veg" },
      { name: "Char Siu Bao", desc: "Steamed bao with BBQ-glazed filling and hoisin sauce", price: "₹549" },
      { name: "Chicken Bao", desc: "Soft steamed bun stuffed with teriyaki glazed chicken", price: "₹549", tag: "Chef's Pick" },
      { name: "Prawn Bao", desc: "Steamed bao bun with plump spiced prawns and sriracha mayo", price: "₹549" },
      { name: "Thai Green Curry", desc: "Fragrant coconut milk curry with fresh herbs and seasonal vegetables", price: "₹595", tag: "Veg" },
      { name: "Thai Yellow Curry", desc: "Mild coconut yellow curry with turmeric and lemongrass", price: "₹595", tag: "Veg" },
      { name: "Veg Malaysian Rendang Curry", desc: "Slow-cooked Malaysian spiced curry with coconut milk and vegetables", price: "₹595", tag: "Veg" },
      { name: "Malaysian Rendang Curry", desc: "Rich, slow-cooked Malaysian curry with deep spiced coconut gravy", price: "₹749" },
    ],
  },
  {
    id: "ramen",
    label: "Ramen",
    subtitle: "Bowls built with intention",
    items: [
      { name: "Spicy Tofu Miso Ramen", desc: "Silken tofu in a rich miso broth with chili oil and spring onions", price: "₹525", tag: "Veg" },
      { name: "Shoyu Mushroom Ramen", desc: "Soy-seasoned broth with king oyster mushrooms and nori", price: "₹525", tag: "Veg" },
      { name: "Mix Veggie Delight Shio Ramen", desc: "Light salt-based broth with seasonal vegetables and wheat noodles", price: "₹525", tag: "Veg" },
      { name: "Spicy Korean Chicken Ramen", desc: "Fiery Korean-spiced broth with chicken and gochujang paste", price: "₹575", tag: "Chef's Pick" },
      { name: "Shoyu Grilled Chicken Ramen", desc: "Soy broth with char-grilled chicken, soft egg and bamboo shoots", price: "₹575" },
      { name: "Spicy Chicken Miso Ramen", desc: "Miso-based broth with spiced chicken, nori and sesame oil", price: "₹575" },
      { name: "Seafood Shio Ramen", desc: "Delicate salt broth with mixed seafood and fresh garnishes", price: "₹675" },
      { name: "Spicy Prawn Miso Ramen", desc: "Bold miso broth with prawns, chili butter and spring onions", price: "₹675" },
      { name: "Shoyu Fish Ramen", desc: "Soy-based fish broth with fillet, soft egg and seaweed", price: "₹675" },
      { name: "Surf & Turf Ramen", desc: "Premium broth with grilled meat and seafood, soft egg, nori and bamboo shoots", price: "₹725", tag: "Signature" },
    ],
  },
  {
    id: "mains",
    label: "Teppanyaki & Mains",
    subtitle: "Sizzling plates & rice bowls",
    items: [
      { name: "Spicy Paneer Teppan Meal", desc: "Teppanyaki-style spiced paneer with vegetables and steamed rice", price: "₹699", tag: "Veg" },
      { name: "Teriyaki Veggie Rice Meal", desc: "Grilled vegetables with teriyaki glaze over Japanese steamed rice", price: "₹599", tag: "Veg" },
      { name: "Indo-Thai Tofu Teppan Bowl", desc: "Crispy tofu with Indo-Thai spices on a sizzling teppan plate", price: "₹699", tag: "Veg" },
      { name: "Bangkok Chicken Rice Bowl Meal", desc: "Thai-spiced chicken over jasmine rice with peanut sauce", price: "₹699", tag: "Chef's Pick" },
      { name: "Chicken Teppan Tikka Noodle Meal", desc: "Teppanyaki chicken tikka served with wok-tossed noodles", price: "₹699" },
      { name: "Prawn Teppanyaki Rice Meal", desc: "Sizzling prawns with garlic butter on a teppan with steamed rice", price: "₹799" },
      { name: "Fish Masala Teppan Meal", desc: "Spiced fish fillet sizzled on the teppan with masala sauce", price: "₹799" },
      { name: "Japanese Fried Rice Squid Meal", desc: "Wok-fried Japanese rice with tender squid and soy seasoning", price: "₹799" },
      { name: "Asian Steamed Fish Thai Rice Meal", desc: "Steamed fish with aromatic Thai herbs over fragrant rice", price: "₹799" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    subtitle: "Sweet endings",
    items: [
      { name: "Matcha Mousse", desc: "Airy Japanese matcha mousse with crushed biscuit base", price: "₹325", tag: "Chef's Pick" },
      { name: "Mango Mochi", desc: "Soft mochi filled with creamy mango ice cream", price: "₹325" },
      { name: "Black Sesame & Coconut Pudding", desc: "Silky coconut pudding layered with toasted black sesame", price: "₹325" },
      { name: "Lychee & Rose Jelly Cups", desc: "Delicate lychee jelly with rose water and fresh fruit", price: "₹325" },
      { name: "Thai Sticky Rice", desc: "Warm sticky rice with coconut cream and palm jaggery", price: "₹325", tag: "Veg" },
      { name: "Vietnamese Coffee Cream Jelly", desc: "Vietnamese drip coffee set in a silky cream jelly", price: "₹325" },
      { name: "Japanese Cheesecake", desc: "Light, jiggly Japanese-style cheesecake with a golden top", price: "₹325" },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    subtitle: "Mocktails, sake & more",
    items: [
      { name: "Seoul Sunset", desc: "A vibrant citrus and berry blend inspired by the Korean cityscape", price: "₹249" },
      { name: "Strawberry Basil Mojito", desc: "Fresh strawberry and basil with lime, mint and soda", price: "₹289" },
      { name: "Apple Mint Cooler", desc: "Chilled apple juice with fresh mint and a hint of ginger", price: "₹289" },
      { name: "Unexpected Waves", desc: "A refreshing tropical blend that surprises with every sip", price: "₹249" },
      { name: "Mango Colada", desc: "Creamy mango and coconut blend, served chilled", price: "₹299" },
      { name: "Lemongrass Kombucha", desc: "Fermented kombucha with fresh lemongrass and citrus", price: "₹289" },
      { name: "Sake Blossom", desc: "Japanese sake with delicate floral notes and cherry blossom essence", price: "₹699", tag: "Signature" },
      { name: "White Mountain", desc: "Premium sake cocktail with a clean, crisp mountain-fresh finish", price: "₹649" },
      { name: "White Wine Sangria", desc: "Chilled white wine sangria with fresh fruit and citrus zest", price: "₹689" },
      { name: "Cranberry Wine Sour", desc: "Red wine with cranberry, lemon and a touch of sweetness", price: "₹649" },
    ],
  },
];

export default function MenuPage() {
  const [active, setActive] = useState("starters");

  const activeCategory = menuData.find((c) => c.id === active)!;

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
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
            The Menu
          </h1>
          <div className="divider-gold max-w-xs mb-6" />
          <p className="text-[#787878] text-base max-w-lg leading-relaxed">
            A journey across Asia — one crossing, many flavours. Every dish crafted
            with intention, every ingredient chosen with care.
          </p>
        </AnimatedSection>
      </section>

      {/* Category tabs */}
      <div className="sticky top-[68px] z-40 bg-[#080808]/95 backdrop-blur-md border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {menuData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className="relative px-5 py-4 text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 whitespace-nowrap"
                style={{ color: active === cat.id ? "#C41230" : "rgba(245,240,235,0.45)" }}
              >
                {cat.label}
                {active === cat.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#C41230]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu items */}
      <section className="py-20 px-6 max-w-7xl mx-auto min-h-[60vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mb-12">
              <h2
                className="text-[clamp(28px,4vw,44px)] font-bold text-[#f5f0eb] mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {activeCategory.label}
              </h2>
              <p className="text-[#C41230] text-xs tracking-[0.4em] uppercase">
                {activeCategory.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a1a]">
              {activeCategory.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-[#080808] p-7 group hover:bg-[#0f0f0f] transition-colors duration-300 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className="text-[#f5f0eb] text-base font-semibold group-hover:text-[#ffc0c8] transition-colors duration-200"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {item.name}
                      </h3>
                      {item.tag && (
                        <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border border-[#C41230]/40 text-[#C41230] font-medium shrink-0">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[#787878] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Reserve CTA */}
      <section className="py-20 px-6 border-t border-[#1a1a1a]">
        <AnimatedSection className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#787878] text-sm mb-1">Ready to experience the crossing?</p>
            <p
              className="text-[#f5f0eb] text-xl font-semibold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Book your table at Shibuya Xing
            </p>
          </div>
          <Link
            href="https://reservations.petpooja.com/form/paidformperpax/f6b98aa9aecea9415aa032c0c57cefaac7ad50cde2469ff09ce9a459c11007258a7380430e0c4abb6912be5a85f35c85971ad72749fc89eef8aebf34050261f98b977b6aa68e06e05b9bde3790ab513d70607ef5be40b8e1a485966a9607a8da" target="_blank" rel="noopener noreferrer"
            className="bg-[#C41230] text-[#080808] px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#E8394D] transition-all duration-300 flex items-center gap-2 group whitespace-nowrap"
          >
            Reserve a Table
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
