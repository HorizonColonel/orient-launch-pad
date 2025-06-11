
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <Testimonials />
      <CTA />
      <Footer />
    </PageTransition>
  );
};

export default Index;
