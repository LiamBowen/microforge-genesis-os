
import DashboardPreview from "./DashboardPreview";
import AnimatedBackground from "./AnimatedBackground";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16 bg-hero-pattern overflow-hidden grid-bg">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-bold mb-4 opacity-0 animate-fade-in-up">
            <span className="gradient-text block text-5xl md:text-6xl lg:text-7xl">Your Machines.</span>
            <span className="block text-5xl md:text-6xl lg:text-7xl">Fully Automated.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-100">
            MicroForge connects your devices, coordinates your jobs, and automates your workflows — all from one unified platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up delay-200">
            <Link
              to="/early-access"
              className="inline-flex items-center justify-center py-3 px-6 rounded-md bg-neon-cyan/10 text-neon-cyan border border-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300 button-glow cyan-glow text-lg font-medium"
            >
              Join Pilot Program
            </Link>
            <div className="text-gray-400">
              or email us at{" "}
              <a 
                href="mailto:hello@microforge.dev" 
                className="text-neon-cyan hover:text-neon-lime underline transition-colors"
              >
                hello@microforge.dev
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <DashboardPreview />
    </div>
  );
};

export default Hero;
