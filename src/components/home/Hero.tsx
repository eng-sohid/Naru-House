import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Leaf, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf1]">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#e8c58a]/20 blur-3xl" />

      <div className="container relative grid min-h-[650px] items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* Hero Content */}
        <div className="order-2 flex flex-col items-start lg:order-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8c58a] bg-[#f7eddd] px-4 py-2">
            <Sparkles size={14} className="text-[#c58a35]" />
            <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#79532c]">
              Homemade With Love
            </span>
          </div>

          <h1 className="max-w-xl text-[42px] font-bold leading-[1.12] tracking-[-2px] text-[#49301f] sm:text-5xl lg:text-[64px]">
            A Little Taste
            <br />
            Of <span className="text-[#c58a35]">Tradition.</span>
            <br />A Lot Of Love.
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-[#8c7c6b] sm:text-base sm:leading-8">
            Discover the authentic taste of homemade Bengali Naru. Crafted with
            love, made with quality ingredients, and customized just the way you
            like.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/products" className="btn-primary w-full sm:w-auto">
              Explore Our Naru
              <ArrowRight size={18} />
            </Link>

            <Link href="/customize" className="btn-secondary w-full sm:w-auto">
              Customize Yours
            </Link>
          </div>

          {/* Trust Features */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-2">
              <Leaf size={18} className="text-[#c58a35]" />
              <span className="text-xs font-medium text-[#665343]">
                Natural Ingredients
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Heart size={18} className="text-[#c58a35]" />
              <span className="text-xs font-medium text-[#665343]">
                Made With Love
              </span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative order-1 mx-auto w-full max-w-[480px] lg:order-2 lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#f7eddd] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/naru-hero.jpeg"
              alt="Traditional Bengali Coconut and Jaggery Naru"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#49301f]/20 to-transparent" />
          </div>

          {/* Floating Label */}
          <div className="absolute -bottom-5 left-4 rounded-2xl border border-[#eee3d3] bg-white p-4 shadow-xl sm:-left-6 sm:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#8c7c6b]">
              Crafted Fresh
            </p>
            <p className="mt-1 text-lg font-bold text-[#49301f]">
              Every Single Day
            </p>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -right-4 -top-5 -z-0 h-20 w-20 rounded-full border border-[#c58a35]/40 sm:-right-6 sm:-top-6 sm:h-28 sm:w-28" />
        </div>
      </div>
    </section>
  );
}
