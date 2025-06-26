import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Building2, BookOpen } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();
  const location = useLocation();

  // Hide navigation items on My Training page and show smooth scroll nav on home
  const shouldShowNavigation = !location.pathname.includes('/my-training');
  const isHomePage = location.pathname === '/';

  const handleSignOut = async () => {
    await signOut();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navigationItems = isHomePage ? [
    { label: "Features", action: () => scrollToSection('features') },
    { label: "Benefits", action: () => scrollToSection('benefits') },
    { label: "Pricing", action: () => scrollToSection('pricing') },
    { label: "About", action: () => scrollToSection('about') },
    { label: "Contact", action: () => scrollToSection('contact') }
  ] : [
    { label: "Features", href: "/features" },
    { label: "Benefits", href: "/benefits" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="font-bold text-xl text-gray-900">orientation.com.tr</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('product-showcase')}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Product
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Customers
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                About
              </button>
            </nav>

            {/* Right side buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <button 
                onClick={() => scrollToSection('request-demo')}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
              >
                Get Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="space-y-4">
                <button 
                  onClick={() => {
                    scrollToSection('product-showcase');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-primary transition-colors py-2"
                >
                  Product
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('features');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-primary transition-colors py-2"
                >
                  Features
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('pricing');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-primary transition-colors py-2"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('testimonials');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-primary transition-colors py-2"
                >
                  Customers
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('about');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-primary transition-colors py-2"
                >
                  About
                </button>
                <div className="pt-4 space-y-3 border-t border-gray-200">
                  <Link to="/auth" className="block">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Sign In
                    </Button>
                  </Link>
                  <button 
                    onClick={() => {
                      scrollToSection('request-demo');
                      setIsMenuOpen(false);
                    }}
                    className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
                  >
                    Get Demo
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* MobileAuthModal */}
    </>
  );
};

export default Header;
