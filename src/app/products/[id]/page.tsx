"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  CheckCircle,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Classic Coconut Naru",
    price: 120,
    image: "/images/naru-1.jpeg",
    tag: "Classic",
    description:
      "Enjoy the authentic taste of traditional Bengali coconut naru. Carefully handmade with fresh coconut and quality ingredients. A perfect sweet treat for every occasion.",
    unit: "250g / Pack",
  },
  {
    id: 2,
    name: "Gur Coconut Naru",
    price: 150,
    image: "/images/naru-2.jpeg",
    tag: "Traditional",
    description:
      "Experience the rich traditional flavor of coconut naru made with natural jaggery. A delicious homemade Bengali sweet prepared with love.",
    unit: "250g / Pack",
  },
  {
    id: 3,
    name: "Special Naru",
    price: 180,
    image: "/images/naru-3.jpeg",
    tag: "Special",
    description:
      "Our special homemade naru brings the authentic sweetness of Bengal. Made with carefully selected ingredients for a memorable taste.",
    unit: "250g / Pack",
  },
];

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const product = products.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf1] px-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#49301f]">
            Product Not Found
          </h1>
          <Link
            href="/products"
            className="mt-5 inline-block rounded-full bg-[#49301f] px-6 py-3 text-white"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("naru-cart") || "[]");

    const existingItem = existingCart.find(
      (item: { id: number }) => item.id === product.id,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }

    localStorage.setItem("naru-cart", JSON.stringify(existingCart));

    setAdded(true);
  };

  return (
    <main className="min-h-screen bg-[#fffaf1] py-12 sm:py-20">
      <div className="container">
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#49301f] transition hover:text-[#c58a35]"
        >
          <ArrowLeft size={17} />
          Back to Products
        </Link>

        <div className="grid items-center gap-10 rounded-2xl bg-white p-5 shadow-sm sm:p-10 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f7eddd]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="image-cover"
            />

            <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#49301f] shadow-sm">
              {product.tag}
            </span>
          </div>

          {/* Product Information */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[3px] text-[#c58a35]">
              Handmade Bengali Sweets
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-[#49301f] sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex text-[#c58a35]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>

              <span className="text-xs text-[#8c7c6b]">Our Special Recipe</span>
            </div>

            <p className="mt-6 text-3xl font-bold text-[#c58a35]">
              ৳{product.price}
            </p>

            <p className="mt-2 text-sm text-[#8c7c6b]">{product.unit}</p>

            <div className="my-7 border-t border-[#eee4d7]" />

            <h2 className="text-lg font-bold text-[#49301f]">
              Product Description
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#8c7c6b]">
              {product.description}
            </p>

            <div className="my-7 border-t border-[#eee4d7]" />

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-[#49301f]">
                Select Quantity
              </span>

              <div className="flex items-center gap-4 rounded-full border border-[#eadcc9] px-4 py-2">
                <button
                  onClick={() =>
                    setQuantity((previous) => Math.max(1, previous - 1))
                  }
                  aria-label="Decrease quantity"
                  className="text-[#49301f] hover:text-[#c58a35]"
                >
                  <Minus size={17} />
                </button>

                <span className="min-w-5 text-center font-bold text-[#49301f]">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((previous) => previous + 1)}
                  aria-label="Increase quantity"
                  className="text-[#49301f] hover:text-[#c58a35]"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-[#8c7c6b]">Total Price</span>

              <span className="text-xl font-bold text-[#49301f]">
                ৳{totalPrice}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#49301f] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#c58a35]"
            >
              {added ? (
                <>
                  <CheckCircle size={19} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={19} />
                  Add to Cart
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-[#8c7c6b]">
              Handmade with love • Traditional Bengali Taste
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
