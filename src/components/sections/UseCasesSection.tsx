
import { Cpu, Plane, Factory } from "lucide-react";

const UseCasesSection = () => {
  return (
    <section className="py-24 bg-dark-lighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-16">
            <span className="gradient-text text-4xl md:text-5xl font-bold">Use Cases</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
              <Cpu className="w-12 h-12 text-neon-cyan mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Electronics</h3>
              <p className="text-gray-300">Rapid prototyping of circuit boards, enclosures, and precision components.</p>
            </div>
            
            <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
              <Plane className="w-12 h-12 text-neon-lime mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Aerospace</h3>
              <p className="text-gray-300">Manufacturing lightweight, high-precision parts for aircraft and spacecraft.</p>
            </div>
            
            <div className="bg-dark-card rounded-xl p-6 border border-gray-800">
              <Factory className="w-12 h-12 text-neon-orange mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Industrial</h3>
              <p className="text-gray-300">Custom tooling, fixtures, and replacement parts for manufacturing equipment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
