import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedNaru from "@/components/home/FeaturedNaru";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedNaru />
    </main>
  );
}
