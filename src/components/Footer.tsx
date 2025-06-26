
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import TermsOfServiceModal from "./TermsOfServiceModal";

const Footer = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    // First navigate to home if not already there
    if (window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="bg-gray-900 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2 space-y-6">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">O</span>
                  </div>
                  <span className="font-bold text-2xl">orientation.com.tr</span>
                </Link>
                <p className="text-gray-400 leading-relaxed max-w-md">
                  Empowering HR teams with comprehensive onboarding solutions for better employee experiences and faster productivity.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Mail className="w-5 h-5" />
                    <a href="mailto:info@touristico.com.tr" className="hover:text-white transition-colors">
                      info@touristico.com.tr
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Phone className="w-5 h-5" />
                    <div className="space-y-1">
                      <div>
                        <a href="tel:+905367281341" className="hover:text-white transition-colors">
                          +90 (536) 728 13 41
                        </a>
                      </div>
                      <div>
                        <a href="tel:+905356249853" className="hover:text-white transition-colors">
                          +90 (535) 624 98 53
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <MapPin className="w-5 h-5" />
                    <span>Istanbul, Turkey</span>
                  </div>
                </div>
              </div>

              {/* Product */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Product</h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => scrollToSection('features')}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      Features
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('pricing')}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      Pricing
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('integrations')}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      Integrations
                    </button>
                  </li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Resources</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('testimonials')}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      Case Studies
                    </button>
                  </li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Webinars</a></li>
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => scrollToSection('about')}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('careers')}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      Careers
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      Contact
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setPrivacyModalOpen(true)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setTermsModalOpen(true)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      Terms of Service
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-16 pt-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <p className="text-gray-400">
                  © 2024 Orientation.com.tr. All rights reserved.
                </p>
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Status Page
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Sitemap
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Cookie Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyPolicyModal 
        open={privacyModalOpen} 
        onOpenChange={setPrivacyModalOpen} 
      />
      <TermsOfServiceModal 
        open={termsModalOpen} 
        onOpenChange={setTermsModalOpen} 
      />
    </>
  );
};

export default Footer;
