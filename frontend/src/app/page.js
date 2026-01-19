import HeroSection from "./Components/HeroSection/Page";
import TopTrending from "./Components/TopTrending/page"
import Collection from '@/app/Components/Collections/page'
import Carousel from "./Components/Carousel/page";
import ReelSection from "./Components/ReelSection/reelSection";
import FloatingWhatsApp from "./Components/FloatingWhatsApp/page";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FAQ from "./Components/Faq/FAQ";
import AnimatedCard from '@/app/Components/AnimatedCard/page'
import TestimonialSlider from "./Components/Testimonial/page";
import ProductSlider from "./Components/ProductSlider/ProductSlider";
import CoustomerService from "./Components/CoustomerService/CoustomerService";
import Features from "./Components/Features/Features";
import MattressFeatures from "./Components/MattressFeatures/MattressFeatures";
import Reviews from "./Components/Reviews/Reviews";
import CertificationModal from "./Components/Certifications/Certification";



export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <TopTrending />
      <FloatingWhatsApp />
      <ReelSection />
      <ProductSlider />
      <Collection />
      <MattressFeatures />
      <CoustomerService />

      <Carousel />
      <Reviews />
      <AnimatedCard />
      {/* // <TestimonialSlider/> */}
      <FAQ />

    </>

  );
}
