
import { Link } from "react-router-dom";

const Footer = () => {
  const handleLogoClick = () => {
    // Always scroll to top when logo is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-lighter pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            © 2025 MicroForge. All rights reserved.
          </p>
          <div className="mt-4 space-x-2">
            <a 
              href="mailto:hello@microforge.dev" 
              className="text-gray-500 hover:text-neon-cyan text-sm transition-colors"
            >
              📧 hello@microforge.dev
            </a>
            <span className="text-gray-500">|</span>
            <a 
              href="https://microforge.dev" 
              className="text-gray-500 hover:text-neon-cyan text-sm transition-colors"
            >
              🌐 microforge.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
