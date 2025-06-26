
import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import RequestDemo from "@/components/landing/RequestDemo";
import ProductShowcase from "@/components/landing/ProductShowcase";
import Features from "@/components/landing/Features";
import Benefits from "@/components/landing/Benefits";
import Integrations from "@/components/landing/Integrations";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import AboutUs from "@/components/landing/AboutUs";
import Careers from "@/components/landing/Careers";
import ContactForm from "@/components/landing/ContactForm";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="scroll-smooth">
        <Header />
        <Hero />
        <RequestDemo />
        <ProductShowcase />
        <Features />
        <Benefits />
        <Integrations />
        <Pricing />
        <Testimonials />
        <AboutUs />
        <Careers />
        <ContactForm />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
