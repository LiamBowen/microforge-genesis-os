
const GlobalImpactSection = () => {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8 opacity-0 animate-fade-in-up">
            Infrastructure for a
            <span className="block gradient-text">Resilient, Autonomous World</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
            MicroForge can enable on-demand production anywhere:
            Disaster zones, orbital labs, Arctic bases, or your garage.
          </p>
          
          <div className="relative h-64 md:h-96 opacity-0 animate-fade-in-up delay-200">
            {/* Simulated world map with nodes */}
            <div className="absolute inset-0 bg-dark rounded-lg border border-gray-800">
              <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMCBMMTAwMCAwIEwxMDAwIDUwMCBMMCA1MDAiIHN0cm9rZT0ibm9uZSIgZmlsbD0iIzEyMTIxMiIgLz48cGF0aCBkPSJNMjUwIDEwMCBDMzUwIDE1MCw0MDAgMTUwLCA1MDAgMTUwIEM2MDAgMTUwLCA3MDAgMjAwLCA4MDAgMTUwIiBzdHJva2U9IiMzMzMiIGZpbGw9Im5vbmUiIC8+PHBhdGggZD0iTTIwMCAyMDAgQzMwMCAyNTAsNDAwIDI1MCwgNTAwIDMwMCBDNjAwIDM1MCwgNzAwIDMwMCwgODAwIDI4MCBDOTAwIDI2MCwgOTUwIDMwMCwgOTgwIDM1MCIgc3Ryb2tlPSIjMzMzIiBmaWxsPSJub25lIiAvPjxwYXRoIGQ9Ik0xMDAgMzAwIEMyMDAgMjUwLDMwMCAyNTAsIDQwMCAzMDAgQzUwMCAzNTAsIDYwMCAzMDAsIDcwMCAyODAgQzgwMCAyNjAsIDkwMCAzMDAsIDk1MCAzODAiIHN0cm9rZT0iIzMzMyIgZmlsbD0ibm9uZSIgLz48L3N2Zz4=')]"></div>
            </div>
            
            {/* Node 1 - Lab */}
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-glow">
              <div className="w-4 h-4 rounded-full bg-neon-cyan"></div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap text-xs text-neon-cyan">Research Lab</div>
            </div>
            
            {/* Node 2 - Startup */}
            <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" style={{animationDelay: '0.5s'}}>
              <div className="w-4 h-4 rounded-full bg-neon-lime"></div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap text-xs text-neon-lime">Hardware Startup</div>
            </div>
            
            {/* Node 3 - Remote base */}
            <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" style={{animationDelay: '1s'}}>
              <div className="w-4 h-4 rounded-full bg-neon-orange"></div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap text-xs text-neon-orange">Remote Base</div>
            </div>
            
            {/* Node 4 - Drone factory */}
            <div className="absolute top-2/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" style={{animationDelay: '1.5s'}}>
              <div className="w-4 h-4 rounded-full bg-neon-cyan"></div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap text-xs text-neon-cyan">Drone Factory</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalImpactSection;
