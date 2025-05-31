
import { Cpu, Cloud, Database, ArrowDown } from "lucide-react";

const Product = () => {
  return (
    <div className="pt-16 bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-hero-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 opacity-0 animate-fade-in-up">
              <span className="gradient-text text-5xl md:text-6xl font-bold">How It Works</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
              One platform to control, automate, and optimize your entire factory floor — no matter how small or complex.
            </p>
          </div>
        </div>
      </section>
      
      {/* Core Features */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center opacity-0 animate-fade-in-up delay-100">
                <div className="flex justify-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-neon-cyan/10 text-neon-cyan">
                    <Cpu size={32} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neon-cyan">Connect</h3>
                <p className="text-gray-300">
                  Link every machine — 3D printers, CNCs, sensors — with secure, real-time control.
                </p>
              </div>
              
              <div className="text-center opacity-0 animate-fade-in-up delay-200">
                <div className="flex justify-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-neon-lime/10 text-neon-lime">
                    <Cloud size={32} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neon-lime">Control</h3>
                <p className="text-gray-300">
                  Launch jobs, manage queues, and monitor output from one live dashboard.
                </p>
              </div>
              
              <div className="text-center opacity-0 animate-fade-in-up delay-300">
                <div className="flex justify-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-neon-orange/10 text-neon-orange">
                    <Database size={32} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neon-orange">Automate</h3>
                <p className="text-gray-300">
                  Set smart workflows that run 24/7 with minimal human input.
                </p>
              </div>
            </div>
            
            {/* Demo Preview */}
            <div className="mt-20 bg-dark-card border border-gray-800 rounded-lg p-6 opacity-0 animate-fade-in-up delay-400">
              <div className="mb-4 flex items-center">
                <div className="w-3 h-3 rounded-full bg-neon-orange mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-neon-lime mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-neon-cyan"></div>
                <div className="text-xs text-gray-500 ml-2">MicroForge Platform — Live Demo</div>
              </div>
              
              <div className="aspect-video bg-dark rounded border border-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
                </div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <h3 className="text-xl font-bold mb-2">See the Platform in Action</h3>
                  <p className="text-sm text-gray-400 mb-4">Watch how MicroForge connects and controls your machines</p>
                  <a href="#" className="inline-flex items-center justify-center py-2 px-4 rounded-md bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/20 transition-all">
                    View Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
