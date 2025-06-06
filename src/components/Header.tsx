
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="font-bold text-xl text-gray-900">orientation.com.tr</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
            <Link to="/benefits" className="text-gray-600 hover:text-gray-900 transition-colors">Benefits</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              Sign In
            </Button>
            <Link to="/request-demo">
              <Button className="bg-primary hover:bg-primary/90">
                Request Demo
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <nav className="flex flex-col space-y-4 p-4">
              <Link to="/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link to="/benefits" className="text-gray-600 hover:text-gray-900 transition-colors">Benefits</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  Sign In
                </Button>
                <Link to="/request-demo">
                  <Button className="bg-primary hover:bg-primary/90 w-full">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
