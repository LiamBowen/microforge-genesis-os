
import { Microchip, Factory, Database, Rocket } from "lucide-react";
import FeatureCard from "../FeatureCard";

const ProductSection = () => {
  return (
    <section id="product-section" className="py-24 bg-dark-lighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">
            <span className="gradient-text"><strong>An Operating System</strong></span>
            <span className="block"><strong>for Machines That Make Things</strong></span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={Microchip}
              title="AI-Driven CAM"
              description="Upload a file, and MicroForge auto-generates toolpaths in seconds — no human input required."
              color="cyan"
              delay="delay-100"
            />
            
            <FeatureCard 
              icon={Factory}
              title="Smart Scheduling"
              description="Queue and coordinate across multiple machines with minimal downtime and maximum efficiency."
              color="lime"
              delay="delay-200"
            />
            
            <FeatureCard 
              icon={Database}
              title="Cloud-Connected Machines"
              description="Monitor and control your fleet remotely with real-time updates and analytics."
              color="orange"
              delay="delay-300"
            />
            
            <FeatureCard 
              icon={Rocket}
              title="Self-Optimizing Builds"
              description="MicroForge learns from every job to improve speed, quality, and efficiency over time."
              color="cyan"
              delay="delay-400"
            />
          </div>
          
          {/* Demo Preview */}
          <div className="mt-20 bg-dark-card border border-gray-800 rounded-lg p-6 opacity-0 animate-fade-in-up delay-500">
            <div className="mb-4 flex items-center">
              <div className="w-3 h-3 rounded-full bg-neon-orange mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-neon-lime mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-neon-cyan"></div>
              <div className="text-xs text-gray-500 ml-2">MicroForge OS — Demo</div>
            </div>
            
            <div className="aspect-video bg-dark rounded border border-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold mb-2">Upload and Test</h3>
                <p className="text-sm text-gray-400 mb-4">See how MicroForge analyzes and prepares your part for production</p>
                <a href="#" className="inline-flex items-center justify-center py-2 px-4 rounded-md bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/20 transition-all">
                  Try Interactive Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
