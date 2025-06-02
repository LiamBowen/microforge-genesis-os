
import { Cpu, Plane, Factory } from "lucide-react";

const UseCasesSection = () => {
  return (
    <section className="py-24 bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">
            <span className="gradient-text">Use Cases</span>
            <span className="block">Across Industries</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-100">
              <div className="mb-6 p-3 bg-neon-cyan/10 rounded-md w-fit">
                <Cpu className="h-8 w-8 text-neon-cyan" />
              </div>
              <h3 className="text-xl font-bold mb-4">Electronics</h3>
              <p className="text-gray-300">
                Rapid prototyping of PCB enclosures, custom connectors, and precision components for hardware startups and R&D teams.
              </p>
            </div>
            
            <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-200">
              <div className="mb-6 p-3 bg-neon-lime/10 rounded-md w-fit">
                <Plane className="h-8 w-8 text-neon-lime" />
              </div>
              <h3 className="text-xl font-bold mb-4">Aerospace</h3>
              <p className="text-gray-300">
                On-demand production of mission-critical parts, reducing supply chain dependencies and enabling rapid iteration.
              </p>
            </div>
            
            <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-300">
              <div className="mb-6 p-3 bg-neon-orange/10 rounded-md w-fit">
                <Factory className="h-8 w-8 text-neon-orange" />
              </div>
              <h3 className="text-xl font-bold mb-4">Manufacturing</h3>
              <p className="text-gray-300">
                Distributed production networks that adapt to demand, reducing inventory costs and improving supply chain resilience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
