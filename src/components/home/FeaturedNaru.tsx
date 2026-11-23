import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";

const products = [
  {
    id: 2,
    name: " Classic Coconut Naru",
    price: 120,
    image: "/images/naru-2.jpeg",
    tag: " Classic",
    subtitle: "Delicious coconut naru prepared with natural jaggery.",
    unit: "250g / Pack",
  },
  {
    id: 1,
    name: "Gur Coconut Naru",
    price: 150,
    image: "/images/naru-1.jpeg",
    tag: "Traditional",
    subtitle: "Traditional coconut naru made with fresh coconut.",
    unit: "250g / Pack",
  },

  {
    id: 3,
    name: "Special Naru",
    price: 180,
    image: "/images/naru-3.jpeg",
    tag: "Special",
    subtitle: "Special homemade naru with authentic Bengali flavor.",
    unit: "250g / Pack",
  },
];
export default function FeaturedNaru() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[3px] text-[#c58a35]">
              Our Special Collection
            </span>

            <h2 className="section-title mt-3">
              Taste Our <span className="text-[#c58a35]">Naru</span>
            </h2>

            <p className="section-description mt-3 max-w-md">
              Handmade with traditional recipes, fresh ingredients and a whole
              lot of love.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden items-center gap-2 text-sm font-semibold text-[#49301f] transition hover:text-[#c58a35] sm:inline-flex"
          >
            View All Products
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-7">
          {products.map((product) => (
            <div key={product.id} className="product-card group">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-[#f7eddd]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="image-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-1 text-[9px] font-bold text-[#49301f] shadow-sm sm:left-4 sm:top-4 sm:px-3 sm:text-[11px]">
                  {product.tag}
                </span>
              </div>

              {/* Product Details */}
              <div className="p-3 sm:p-5">
                <div className="mb-2 flex items-center gap-1">
                  <Star size={12} fill="#C58A35" className="text-[#c58a35]" />
                  <span className="text-[10px] font-medium text-[#8c7c6b]">
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
                  <div>
                    <span className="text-base font-bold text-[#49301f] sm:text-xl">
                      ৳{product.price}
                    </span>
                  </div>

                  <Link
                    href="/products"
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

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/products" className="btn-secondary w-full">
            View All Products
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
