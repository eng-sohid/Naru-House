"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Star, ArrowRight } from "lucide-react";

const products = [
  {
    id: 2,
    name: " Classic Coconut Naru",
    price: 120,
    image: "/images/naru-2.jpeg",
    tag: " Classic",
    subtitle: "Delicious coconut naru prepared with natural jaggery.",
    unit: "250g / Pack",
    category: "Classic",
  },
  {
    id: 1,
    name: "Gur Coconut Naru",
    price: 150,
    image: "/images/naru-1.jpeg",
    tag: "Traditional",
    subtitle: "Traditional coconut naru made with fresh coconut.",
    unit: "250g / Pack",
    category: "Gur",
  },
  {
    id: 3,
    name: "Special Naru",
    price: 180,
    image: "/images/naru-3.jpeg",
    tag: "Special",
    subtitle: "Special homemade naru with authentic Bengali flavor.",
    unit: "250g / Pack",
    category: "Special",
  },
];

const categories = ["All", "Classic", "Gur", "Special"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#fffaf1]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#49301f] px-5 py-20 text-center sm:py-28">
        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[4px] text-[#e2b66f]">
            Our Collection
          </span>

          <h1 className="mt-5 text-4xl font-bold text-white sm:text-6xl">
            Our Delicious <span className="text-[#d9a34d]">Naru</span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/70 sm:text-base">
            Discover the authentic taste of traditional Bengali homemade sweets,
            crafted with love.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="#products"
              className="inline-flex items-center gap-2 rounded-full bg-[#c58a35] px-7 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#49301f]"
            >
              Explore Products
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#c58a35]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#c58a35]/10 blur-3xl" />
      </section>

      {/* Products Section */}
      <section id="products" className="section-padding">
        <div className="container">
          {/* Heading */}
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[3px] text-[#c58a35]">
              Handmade With Love
            </span>

            <h2 className="section-title mt-3">
              Explore Our <span className="text-[#c58a35]">Products</span>
            </h2>

            <p className="section-description mx-auto mt-3 max-w-lg">
              Find your favorite Naru and enjoy the traditional sweetness of
              Bengal.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mb-8 max-w-md">
            <div className="flex items-center gap-3 rounded-full border border-[#eadcc9] bg-white px-5 py-3 shadow-sm">
              <Search size={19} className="text-[#c58a35]" />

              <input
                type="text"
                placeholder="Search your favorite naru..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-[#49301f] outline-none placeholder:text-[#b5a797]"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-[#49301f] text-white"
                    : "border border-[#e9ddcd] bg-white text-[#49301f] hover:border-[#c58a35] hover:text-[#c58a35]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Count */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-[#8c7c6b]">
              Showing {filteredProducts.length} products
            </p>

            <span className="text-xs font-medium text-[#c58a35]">
              Freshly Handmade
            </span>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card group overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-[#f7eddd]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="image-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-2 top-2 rounded-full bg-white px-3 py-1 text-[9px] font-bold text-[#49301f] shadow-sm sm:left-4 sm:top-4 sm:text-xs">
                      {product.tag}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-3 sm:p-5">
                    <div className="mb-2 flex items-center gap-1">
                      <Star
                        size={13}
                        fill="#c58a35"
                        className="text-[#c58a35]"
                      />

                      <span className="text-[10px] text-[#8c7c6b]">
                        Our Special Recipe
                      </span>
                    </div>

                    <h3 className="text-sm font-bold leading-snug text-[#49301f] sm:text-lg">
                      {product.name}
                    </h3>

                    <p className="mt-2 hidden text-xs leading-6 text-[#8c7c6b] sm:block">
                      {product.subtitle}
                    </p>

                    <p className="mt-2 text-[11px] text-[#8c7c6b]">
                      {product.unit}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-base font-bold text-[#49301f] sm:text-xl">
                        ৳{product.price}
                      </span>

                      <Link
                        href={`/products/${product.id}`}
                        aria-label={`View ${product.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#49301f] text-white transition hover:bg-[#c58a35] sm:h-10 sm:w-10"
                      >
                        <ShoppingBag size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h3 className="text-xl font-bold text-[#49301f]">
                No Naru Found!
              </h3>

              <p className="mt-2 text-sm text-[#8c7c6b]">
                Try searching with another product name.
              </p>

              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-5 rounded-full bg-[#49301f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#c58a35]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
