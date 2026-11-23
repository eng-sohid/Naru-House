"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedCart = window.localStorage.getItem("naru-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem("naru-cart", JSON.stringify(cart));
    }
  }, [cart, loaded]);

  const updateQuantity = (id: number, change: number) => {
    setCart((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
            }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCart((previous) => previous.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf1]">
        <p className="text-[#49301f]">Loading your cart...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf1] py-12 sm:py-20">
      <div className="container">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#c58a35]">
            Your Shopping Bag
          </span>

          <h1 className="mt-3 text-3xl font-bold text-[#49301f] sm:text-5xl">
            Shopping <span className="text-[#c58a35]">Cart</span>
          </h1>

          <p className="mt-3 text-sm text-[#8c7c6b]">
            Review your favorite Bengali sweets before checkout.
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <div className="rounded-2xl bg-white px-5 py-20 text-center shadow-sm">
            <ShoppingCart size={55} className="mx-auto text-[#c58a35]" />

            <h2 className="mt-6 text-2xl font-bold text-[#49301f]">
              Your Cart is Empty!
            </h2>

            <p className="mt-3 text-sm text-[#8c7c6b]">
              You haven&apos;t added any delicious naru yet.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#49301f] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#c58a35]"
            >
              <ShoppingBag size={17} />
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#49301f]">
                  Your Items ({cart.length})
                </h2>

                <button
                  onClick={clearCart}
                  className="flex items-center gap-2 text-xs font-semibold text-red-500 transition hover:text-red-700"
                >
                  <Trash2 size={15} />
                  Clear Cart
                </button>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
                >
                  {/* Image */}
                  <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-[#f7eddd] sm:h-28 sm:w-28">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="image-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-[#49301f]">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-[#c58a35]">
                      ৳{item.price} / Pack
                    </p>

                    <p className="mt-2 text-xs text-[#8c7c6b]">
                      Subtotal: ৳{item.price * item.quantity}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-4">
                    <div className="flex items-center gap-4 rounded-full border border-[#eadcc9] px-3 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={15} />
                      </button>

                      <span className="font-bold text-[#49301f]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#49301f] hover:text-[#c58a35]"
              >
                <ArrowLeft size={17} />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#49301f]">
                Order Summary
              </h2>

              <div className="mt-7 space-y-4">
                <div className="flex justify-between text-sm text-[#8c7c6b]">
                  <span>Total Items</span>
                  <span>
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-[#8c7c6b]">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>

                <div className="flex justify-between text-sm text-[#8c7c6b]">
                  <span>Delivery Charge</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="border-t border-[#eee4d7] pt-5">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#49301f]">Total</span>

                    <span className="text-xl font-bold text-[#c58a35]">
                      ৳{subtotal}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#49301f] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#c58a35]"
              >
                Proceed to Checkout
                <ArrowRight size={17} />
              </Link>

              <p className="mt-4 text-center text-xs text-[#8c7c6b]">
                Thank you for choosing Naru House!
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
