import Hero from "@/features/home/Hero";
import DashboardMockup from "@/features/home/DashboardMockup";
import WhyChooseUs from "@/features/home/WhyChooseUs";
import Features from "@/features/home/Features";
import TemplatesShowcase from "@/features/home/TemplatesShowcase";
import ResponsiveTemplates from "@/features/home/ResponsiveTemplates";
import Pricing from "@/features/home/Pricing";
import Faq from "@/features/home/Faq";
import Footer from "@/features/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen width-full">
      <Hero />
      <DashboardMockup />
      <WhyChooseUs />
      <Features />
      <TemplatesShowcase />
      <ResponsiveTemplates />
      {/* <Pricing /> */}
      <Faq />
      <Footer />
    </div>
  );
}
