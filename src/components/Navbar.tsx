
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
  const navLinks = [{
    label: "Home",
    path: "/"
  }, {
    label: "Vision",
    path: "/vision"
  }, {
    label: "Product",
    path: "/product"
  }, {
    label: "Use Cases",
    path: "/use-cases"
  }, {
    label: "Early Access",
    path: "/early-access"
  }];
  return <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-dark/90 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <div className="w-9 h-9 relative mr-2">
                  <div className="absolute inset-0 bg-neon-cyan rounded-md opacity-20 animate-pulse-glow"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/lovable-uploads/b74af20b-1111-4c06-8b41-ce0fec9793a0.png" alt="MicroForge Logo" className="w-full h-full object-contain" />
                  </div>
                </div>
                <span className="text-xl font-bold gradient-text">MicroForge</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="hidden md:flex space-x-8">
              {navLinks.map(link => <Link key={link.path} to={link.path} className={`text-sm font-medium transition hover:text-neon-cyan relative ${location.pathname === link.path ? "text-neon-cyan" : "text-gray-300"}`}>
                  {link.label}
                  {location.pathname === link.path && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon-cyan"></span>}
                </Link>)}
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="flex items-center text-sm font-medium text-gray-300 hover:text-neon-lime transition">
                <LogIn size={18} className="mr-1" />
                Login
              </Link>
              <RequestAccessButton size="sm" />
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white hover:text-neon-cyan focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && <div className="md:hidden bg-dark-lighter">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map(link => <Link key={link.path} to={link.path} className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path ? "text-neon-cyan bg-dark-card" : "text-gray-300 hover:text-neon-cyan"}`} onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>)}
              <Link to="/login" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-neon-lime" onClick={() => setIsOpen(false)}>
                <LogIn size={18} className="mr-2" />
                Login
              </Link>
              <div className="mt-4 px-3 py-3">
                <RequestAccessButton fullWidth size="sm" />
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;
