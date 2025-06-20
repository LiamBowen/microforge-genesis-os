
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import RequestAccessButton from "./RequestAccessButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoClick = () => {
    setIsOpen(false);
    // Always scroll to top when logo is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Vision", path: "/vision" },
    { label: "Product", path: "/product" },
    { label: "Solutions", path: "/solutions" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-dark/95 backdrop-blur-md shadow-lg border-b border-gray-800" : "bg-transparent"
    }`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
          <div className="flex items-center min-w-0">
            <Link to="/" className="flex items-center no-zoom" onClick={handleLogoClick}>
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 relative mr-2 lg:mr-3 flex-shrink-0">
                  <div className="absolute inset-0 bg-neon-cyan rounded-md opacity-20 animate-pulse-glow"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/b74af20b-1111-4c06-8b41-ce0fec9793a0.png" 
                      alt="MicroForge Logo" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                </div>
                <span className="text-base sm:text-lg lg:text-xl font-bold gradient-text truncate">MicroForge</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
            <div className="flex space-x-4 xl:space-x-6 2xl:space-x-8">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`text-sm xl:text-base font-medium transition-all duration-200 hover:text-neon-cyan relative whitespace-nowrap ${
                    location.pathname === link.path ? "text-neon-cyan" : "text-gray-300"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon-cyan"></span>
                  )}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-3 xl:space-x-4">
              <Link 
                to="/login" 
                className="flex items-center text-sm xl:text-base font-medium text-gray-300 hover:text-neon-lime transition-all duration-200 whitespace-nowrap"
              >
                <LogIn size={16} className="mr-1 xl:mr-2" />
                Login
              </Link>
              <RequestAccessButton size="sm" />
            </div>
          </div>

          {/* Tablet Navigation (md and up, but hidden on lg+) */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            <Link 
              to="/login" 
              className="flex items-center text-sm font-medium text-gray-300 hover:text-neon-lime transition-all duration-200"
            >
              <LogIn size={16} className="mr-1" />
              Login
            </Link>
            <RequestAccessButton size="sm" />
            <button 
              onClick={toggleMenu} 
              className="text-white hover:text-neon-cyan focus:outline-none p-2 -m-2 transition-colors duration-200 ml-2"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center mobile-menu-container">
            <button 
              onClick={toggleMenu} 
              className="text-white hover:text-neon-cyan focus:outline-none p-2 -m-2 transition-colors duration-200"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden bg-dark/98 backdrop-blur-md border-t border-gray-800 mobile-menu-container">
            <div className="px-2 pt-4 pb-6 space-y-2 sm:px-3">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 no-zoom ${
                    location.pathname === link.path 
                      ? "text-neon-cyan bg-dark/50 border-l-2 border-neon-cyan" 
                      : "text-gray-300 hover:text-neon-cyan hover:bg-dark/30"
                  }`} 
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Only show login on mobile, as it's shown separately on tablet */}
              <div className="md:hidden">
                <Link 
                  to="/login" 
                  className="flex items-center px-4 py-3 rounded-md text-base font-medium text-gray-300 hover:text-neon-lime hover:bg-dark/30 transition-all duration-200 no-zoom" 
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={18} className="mr-2" />
                  Login
                </Link>
              </div>
              
              <div className="mt-6 px-4">
                <RequestAccessButton fullWidth size="sm" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
