
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-lighter pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-9 h-9 relative mr-2">
                <div className="absolute inset-0 bg-neon-cyan rounded-md opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-6 h-6 text-neon-cyan"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold gradient-text">MicroForge</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              The AI OS for autonomous manufacturing.
              <br />Turn machines into factories that think.
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
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/product" className="text-gray-400 hover:text-neon-cyan text-sm">Features</Link></li>
              <li><Link to="/use-cases" className="text-gray-400 hover:text-neon-cyan text-sm">Use Cases</Link></li>
              <li><Link to="/vision" className="text-gray-400 hover:text-neon-cyan text-sm">Vision</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan text-sm">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan text-sm">Builder Forum</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan text-sm">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-cyan text-sm">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            MicroForge © {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
