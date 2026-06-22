import HeroSection from "../../components/home/HeroSection";
import AboutSection from "../../components/home/AboutSection";
import SolutionsSection from "../../components/home/SolutionsSection";
import DashboardShowcase from "../../components/home/DashboardShowcase";
import TechnologySection from "../../components/home/TechnologySection";
import WhyChooseSection from "../../components/home/WhyChooseSection";
import CTASection from "../../components/home/CTASection";
import Footer from "../../components/home/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <DashboardShowcase />
      <TechnologySection />
      <WhyChooseSection />
      <CTASection />
      <Footer />
    </>
  );
}