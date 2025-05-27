
import { useEffect, useRef } from "react";
import RequestAccessButton from "./RequestAccessButton";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
    };

    // Only add mouse move listener on desktop
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-16 bg-hero-pattern overflow-hidden grid-bg"
      style={{ 
        '--mouse-x': '0.5', 
        '--mouse-y': '0.5' 
      } as React.CSSProperties}
    >
      {/* Animated background gradient - only show on desktop */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-30 hidden md:block"
        style={{ 
          background: `radial-gradient(
            circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), 
            rgba(0, 255, 255, 0.15), 
            rgba(170, 255, 0, 0.05) 40%, 
            rgba(0, 0, 0, 0) 80%
          )` 
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-bold mb-4 opacity-0 animate-fade-in-up">
            <span className="gradient-text block">The OS for</span>
            <span className="block">Autonomous Manufacturing</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-100">
            From CAD to machine in minutes. No CAM. No friction. Just click and print, cut, or mill.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up delay-200">
            <RequestAccessButton size="lg" variant="cyan" />
            <a 
              href="#how-it-works" 
              className="inline-flex items-center justify-center py-3 px-6 rounded-md border border-gray-700 text-gray-200 hover:bg-gray-800 transition-all"
            >
              How It Works ↓
            </a>
          </div>
        </div>
      </div>
      
      {/* Platform Dashboard Preview */}
      <div className="absolute inset-x-0 bottom-0 h-80 flex justify-center items-end">
        <div className="w-full max-w-6xl h-64 rounded-t-lg bg-dark-card p-6 border border-gray-800 opacity-0 animate-fade-in-up delay-300 overflow-hidden">
          <div className="mb-4 flex items-center">
            <div className="w-3 h-3 rounded-full bg-neon-orange mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-neon-lime mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-neon-cyan"></div>
            <div className="text-xs text-gray-500 ml-2">MicroForge OS — Live Dashboard</div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="grid grid-cols-4 gap-4 h-full">
            {/* Stats Cards */}
            <div className="col-span-4 grid grid-cols-4 gap-2 h-16">
              <div className="bg-dark rounded p-2 border border-gray-800">
                <div className="text-xs text-gray-400">Active Machines</div>
                <div className="text-lg font-bold text-neon-cyan">3</div>
              </div>
              <div className="bg-dark rounded p-2 border border-gray-800">
                <div className="text-xs text-gray-400">Jobs Queued</div>
                <div className="text-lg font-bold text-neon-lime">6</div>
              </div>
              <div className="bg-dark rounded p-2 border border-gray-800">
                <div className="text-xs text-gray-400">Completed</div>
                <div className="text-lg font-bold text-neon-orange">14</div>
              </div>
              <div className="bg-dark rounded p-2 border border-gray-800">
                <div className="text-xs text-gray-400">Alerts</div>
                <div className="text-lg font-bold text-red-400">1</div>
              </div>
            </div>
            
            {/* Machine Status Table */}
            <div className="col-span-4 bg-dark rounded border border-gray-800 p-3">
              <div className="text-sm font-medium text-gray-300 mb-2">Live Machine Status</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">🖨️ ForgeBot-01</span>
                  <span className="text-green-400">Running • 72%</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">⚙️ CNC-Master</span>
                  <span className="text-gray-500">Idle</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">🔬 LaserCutter-X</span>
                  <span className="text-red-400">Error</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
