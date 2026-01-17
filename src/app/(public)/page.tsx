import AboutSection from "@/components/home/about-section";
import CtaSihalal from "@/components/home/cta-sihalal";
import FlowSection from "@/components/home/flow-section";
import HeroSection from "@/components/home/hero-section";
import NewsSection from "@/components/home/news-section";
import ServicesGrid from "@/components/home/services-grid";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CtaSihalal />
      <AboutSection />
      <FlowSection />
      <ServicesGrid />
      <NewsSection />
    </div>
  );
}
