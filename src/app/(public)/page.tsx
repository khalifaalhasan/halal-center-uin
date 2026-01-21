import AboutSection from "@/components/home/about-section";
import CtaSihalal from "@/components/home/cta-sihalal";
import FlowSection from "@/components/home/flow-section";
import GallerySection from "@/components/home/gallery-section";
import HeroSection from "@/components/home/hero-section";
import NewsSection from "@/components/home/news-section";
import ServicesGrid from "@/components/home/services-grid";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Beranda - Pusat Layanan Halal Terpadu", 
  description: "Selamat datang di website resmi LPH UIN Raden Fatah Palembang. Cek status halal, berita terbaru, dan panduan sertifikasi.",
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CtaSihalal />
      <AboutSection />
      <FlowSection />
      <ServicesGrid />
      <GallerySection />
      <NewsSection />
    </div>
  );
}
