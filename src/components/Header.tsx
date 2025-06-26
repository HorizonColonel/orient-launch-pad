
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

          {shouldShowNavigation && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  {item.action ? (
                    <button 
                      onClick={item.action}
                      className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link 
                      to={item.href!} 
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          )}

          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{profile?.first_name || profile?.email}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">
                            {profile?.first_name && profile?.last_name 
                              ? `${profile.first_name} ${profile.last_name}`
                              : profile?.email}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {profile?.role?.replace('_', ' ')}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/my-training" className="cursor-pointer">
                          <BookOpen className="w-4 h-4 mr-2" />
                          My Training
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">
                          <User className="w-4 h-4 mr-2" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      {(profile?.role === 'company_admin' || profile?.role === 'employee') && profile?.company_id && (
                        <DropdownMenuItem asChild>
                          <Link to="/company" className="cursor-pointer">
                            <Building2 className="w-4 h-4 mr-2" />
                            My Company
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link to="/auth">
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/request-demo">
                      <Button className="bg-primary hover:bg-primary/90">
                        Request Demo
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
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
              {shouldShowNavigation && (
                <>
                  {navigationItems.map((item, index) => (
                    <div key={index}>
                      {item.action ? (
                        <button 
                          onClick={item.action}
                          className="text-gray-600 hover:text-gray-900 transition-colors text-left w-full"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link 
                          to={item.href!} 
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </>
              )}
              
              {!loading && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  {user ? (
                    <>
                      <div className="text-sm text-gray-600">
                        {profile?.first_name && profile?.last_name 
                          ? `${profile.first_name} ${profile.last_name}`
                          : profile?.email}
                        <span className="block text-xs capitalize">
                          {profile?.role?.replace('_', ' ')}
                        </span>
                      </div>
                      <Link to="/my-training" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <BookOpen className="w-4 h-4 mr-2" />
                          My Training
                        </Button>
                      </Link>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <User className="w-4 h-4 mr-2" />
                          My Profile
                        </Button>
                      </Link>
                      {(profile?.role === 'company_admin' || profile?.role === 'employee') && profile?.company_id && (
                        <Link to="/company" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="outline" className="w-full justify-start">
                            <Building2 className="w-4 h-4 mr-2" />
                            My Company
                          </Button>
                        </Link>
                      )}
                      <Button 
                        variant="outline" 
                        className="border-red-200 text-red-600 hover:bg-red-50" 
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/request-demo" onClick={() => setIsMenuOpen(false)}>
                        <Button className="bg-primary hover:bg-primary/90 w-full">
                          Request Demo
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
