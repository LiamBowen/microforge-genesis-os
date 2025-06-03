
import { Microchip, Factory, Database, ArrowDown } from "lucide-react";

const VisionSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">
            <strong>Manufacturing Is Still Manual.</strong>
            <span className="block text-neon-lime glow-text-lime"><strong>We're Changing That.</strong></span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center md:text-left opacity-0 animate-fade-in-up delay-100 flex flex-col">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neon-cyan/10 text-neon-cyan">
                  <Factory size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4"><strong>Factories are disconnected.</strong></h3>
              <p className="text-gray-400 flex-1">
                Most machines aren't networked or intelligent, requiring manual setup and monitoring by experts.
              </p>
            </div>
            
            <div className="text-center md:text-left opacity-0 animate-fade-in-up delay-200 flex flex-col">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neon-lime/10 text-neon-lime">
                  <Microchip size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4"><strong>AI + Automation are ready.</strong></h3>
              <p className="text-gray-400 flex-1">
                MicroForge uses real-time models to control machines, not just monitor them, creating fully autonomous production.
              </p>
            </div>
            
            <div className="text-center md:text-left opacity-0 animate-fade-in-up delay-300 flex flex-col">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neon-orange/10 text-neon-orange">
                  <Database size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4"><strong>The world needs resilient production.</strong></h3>
              <p className="text-gray-400 flex-1">
                Global supply chains are fragile. Local, autonomous microfactories are the future of resilient manufacturing.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center opacity-0 animate-fade-in-up delay-400">
            <h2 className="text-3xl font-bold mb-6"><strong>We're building the brain of the next industrial revolution.</strong></h2>
            <a href="#product-section" className="inline-flex items-center justify-center py-3 px-6 text-neon-cyan">
              Learn how
              <ArrowDown size={20} className="ml-2 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
