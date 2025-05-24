
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
          <h1 className="font-bold mb-6 opacity-0 animate-fade-in-up">
            <span className="gradient-text block">Build Anything, Anywhere —</span>
            <span className="block">Automatically.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-200">
            MicroForge is the AI Operating System for autonomous manufacturing.
            From garage startups to defense labs — we turn machines into factories that think.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up delay-300">
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
      
      {/* Hero Visual */}
      <div className="absolute inset-x-0 bottom-0 h-64 flex justify-center items-end">
        <div className="w-full max-w-4xl h-48 rounded-t-lg bg-dark-card p-4 border border-gray-800 opacity-0 animate-fade-in-up delay-400 overflow-hidden">
          <div className="mb-2 flex items-center">
            <div className="w-3 h-3 rounded-full bg-neon-orange mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-neon-lime mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-neon-cyan"></div>
            <div className="text-xs text-gray-500 ml-2">MicroForge OS — Machine Control</div>
          </div>
          <div className="grid grid-cols-3 gap-4 h-full">
            <div className="col-span-2 bg-dark rounded border border-gray-800 p-2 relative">
              {/* Simulated 3D model viewer */}
              <div className="absolute inset-0 flex items-center justify-center opacity-70">
                <div className="w-full h-full bg-gradient-to-br from-dark to-dark-lighter">
                  <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
                </div>
                {/* Animated part being built */}
                <div className="absolute w-32 h-32 border-2 border-neon-cyan animate-pulse-glow">
                  <div className="h-full bg-neon-cyan/20"></div>
                </div>
              </div>
            </div>
            <div className="col-span-1 bg-dark rounded border border-gray-800 p-2 text-left">
              <div className="text-xs font-medium text-gray-400 mb-2">Status: Processing</div>
              <div className="text-neon-cyan text-xs animate-pulse">Optimizing toolpaths...</div>
              <div className="mt-2 h-2 bg-gray-800 rounded-full">
                <div className="h-full bg-neon-cyan rounded-full w-3/5 animate-pulse"></div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Time Remaining:</span>
                  <span className="text-gray-300">34:22</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Material:</span>
                  <span className="text-gray-300">PLA</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Quality:</span>
                  <span className="text-gray-300">High (0.1mm)</span>
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
