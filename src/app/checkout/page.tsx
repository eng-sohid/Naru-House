"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  MapPin,
  Phone,
  User,
  CheckCircle,
  Truck,
} from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    note: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("naru-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }

    setLoaded(true);
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cart.length === 0) return;

    const newOrder = {
      orderNumber: `NARU-${Date.now()}`,
      customer: form,
      products: cart,
      subtotal,
      paymentMethod: "Cash on Delivery",
      orderDate: new Date().toISOString(),
      status: "Pending",
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("naru-orders") || "[]",
    );

    existingOrders.push(newOrder);

    localStorage.setItem("naru-orders", JSON.stringify(existingOrders));

    localStorage.removeItem("naru-cart");

    setOrderNumber(newOrder.orderNumber);
    setCart([]);
    setOrdered(true);
  };

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf1]">
        Loading checkout...
      </main>
    );
  }

  if (ordered) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf1] px-5 py-16">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
          <CheckCircle size={65} className="mx-auto text-green-600" />

          <h1 className="mt-6 text-3xl font-bold text-[#49301f]">
            Order Successful!
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#8c7c6b]">
            Thank you for choosing Naru House. Your order has been placed
            successfully.
          </p>

          <div className="mt-6 rounded-xl bg-[#fffaf1] p-4">
            <p className="text-xs text-[#8c7c6b]">Your Order Number</p>

            <p className="mt-2 font-bold text-[#c58a35]">{orderNumber}</p>
          </div>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#49301f] px-7 py-3 text-sm font-bold text-white hover:bg-[#c58a35]"
          >
            <ShoppingBag size={17} />
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf1] px-5">
        <div className="text-center">
          <ShoppingBag size={55} className="mx-auto text-[#c58a35]" />

          <h1 className="mt-5 text-2xl font-bold text-[#49301f]">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-sm text-[#8c7c6b]">
            Please add some products before checkout.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-[#49301f] px-7 py-3 text-sm font-bold text-white"
          >
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf1] py-12 sm:py-20">
      <div className="container">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#c58a35]">
            Almost There
          </span>

          <h1 className="mt-3 text-3xl font-bold text-[#49301f] sm:text-5xl">
            Complete Your <span className="text-[#c58a35]">Order</span>
          </h1>

          <p className="mt-3 text-sm text-[#8c7c6b]">
            Fill in your details to enjoy our delicious naru.
          </p>
        </div>

        <form onSubmit={handleOrder}>
          <div className="grid items-start gap-8 lg:grid-cols-3">
            {/* Customer Information */}
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8 lg:col-span-2">
              <div className="mb-7 flex items-center gap-3">
                <div className="rounded-full bg-[#fff3df] p-3">
                  <User size={21} className="text-[#c58a35]" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#49301f]">
                    Customer Information
                  </h2>

                  <p className="mt-1 text-xs text-[#8c7c6b]">
                    Please provide your contact details.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#49301f]">
                    Full Name *
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-[#eadcc9] bg-[#fffdf9] px-4 py-3 text-sm text-[#49301f] outline-none transition focus:border-[#c58a35]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#49301f]">
                    Phone Number *
                  </label>

                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    pattern="01[3-9][0-9]{8}"
                    title="Enter a valid 11-digit Bangladesh mobile number."
                    placeholder="01XXXXXXXXX"
                    className="w-full rounded-xl border border-[#eadcc9] bg-[#fffdf9] px-4 py-3 text-sm text-[#49301f] outline-none transition focus:border-[#c58a35]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#49301f]">
                    Email Address
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full rounded-xl border border-[#eadcc9] bg-[#fffdf9] px-4 py-3 text-sm text-[#49301f] outline-none transition focus:border-[#c58a35]"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#49301f]">
                    Delivery Address *
                  </label>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="House number, road, area..."
                    className="w-full resize-none rounded-xl border border-[#eadcc9] bg-[#fffdf9] px-4 py-3 text-sm text-[#49301f] outline-none transition focus:border-[#c58a35]"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#49301f]">
                    City / District *
                  </label>

                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter your city or district"
                    className="w-full rounded-xl border border-[#eadcc9] bg-[#fffdf9] px-4 py-3 text-sm text-[#49301f] outline-none transition focus:border-[#c58a35]"
                  />
                </div>

                {/* Note */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#49301f]">
                    Order Note (Optional)
                  </label>

                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special instructions?"
                    className="w-full resize-none rounded-xl border border-[#eadcc9] bg-[#fffdf9] px-4 py-3 text-sm text-[#49301f] outline-none transition focus:border-[#c58a35]"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-9 border-t border-[#eee4d7] pt-7">
                <h2 className="text-lg font-bold text-[#49301f]">
                  Payment Method
                </h2>

                <div className="mt-4 flex items-center gap-4 rounded-xl border border-[#c58a35] bg-[#fffaf1] p-4">
                  <div className="rounded-full bg-white p-3">
                    <Truck size={22} className="text-[#c58a35]" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#49301f]">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs text-[#8c7c6b]">
                      Pay when your order arrives.
                    </p>
                  </div>

                  <div className="ml-auto">
                    <CheckCircle size={20} className="text-[#c58a35]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#49301f]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-5">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f7eddd]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-[#49301f]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#8c7c6b]">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <span className="text-sm font-bold text-[#49301f]">
                      ৳{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-[#eee4d7]" />

              <div className="flex justify-between text-sm text-[#8c7c6b]">
                <span>Subtotal</span>
                <span>৳{subtotal}</span>
              </div>

              <div className="mt-4 flex justify-between text-sm text-[#8c7c6b]">
                <span>Delivery Charge</span>
                <span>To be confirmed</span>
              </div>

              <div className="my-5 border-t border-[#eee4d7]" />

              <div className="flex items-center justify-between">
                <span className="font-bold text-[#49301f]">Total</span>

                <span className="text-2xl font-bold text-[#c58a35]">
                  ৳{subtotal}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#8c7c6b]">
                Delivery charge will be confirmed before order fulfillment.
              </p>

              <button
                type="submit"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#49301f] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#c58a35]"
              >
                <ShoppingBag size={18} />
                Place Order
              </button>

              <Link
                href="/cart"
                className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-[#8c7c6b] hover:text-[#c58a35]"
              >
                <ArrowLeft size={15} />
                Back to Cart
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
