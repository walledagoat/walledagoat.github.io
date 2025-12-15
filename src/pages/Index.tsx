import CryptoTicker from "@/components/CryptoTicker";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import PricingSection from "@/components/PricingSection";
import InteractiveChart from "@/components/InteractiveChart";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "CryptoLens - AI-Powered Crypto Tracking for iOS";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "The only crypto tracker with verified news sources and proprietary AI price predictions. Start your 7-day free trial today.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CryptoTicker />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <InteractiveChart />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
