
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const handleLogoClick = () => {
    // Always scroll to top when logo is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-lighter pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center mb-4" onClick={handleLogoClick}>
              <div className="w-9 h-9 relative mr-2">
                <div className="absolute inset-0 bg-neon-cyan rounded-md opacity-20 animate-pulse-glow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/b74af20b-1111-4c06-8b41-ce0fec9793a0.png" 
                    alt="MicroForge Logo" 
                    className="w-full h-full object-contain" 
                  />
                </div>
              </div>
              <span className="text-xl font-bold gradient-text">MicroForge</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              The AI OS for autonomous manufacturing.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-neon-cyan transition">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-neon-lime transition">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-neon-orange transition">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-neon-cyan text-sm">Home</Link></li>
              <li><Link to="/vision" className="text-gray-400 hover:text-neon-cyan text-sm">Vision</Link></li>
              <li><Link to="/product" className="text-gray-400 hover:text-neon-cyan text-sm">Product</Link></li>
              <li><Link to="/use-cases" className="text-gray-400 hover:text-neon-cyan text-sm">Use Cases</Link></li>
            </ul>
          </div>
          
          <div>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-neon-cyan text-sm">About</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-neon-cyan text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-neon-cyan text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan text-sm">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan text-sm">Builder Forum</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            MicroForge © {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm">Privacy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
