
import { Cpu, Plane, Factory } from "lucide-react";

const UseCasesSection = () => {
  return (
    <section className="py-24 bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">
            <strong>Industry Use Cases</strong>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-dark-card border border-gray-800 rounded-lg p-6 opacity-0 animate-fade-in-up delay-100">
              <div className="flex items-center mb-4">
                <Cpu className="h-6 w-6 text-neon-cyan mr-3" />
                <h3 className="text-xl font-bold">Robotics</h3>
              </div>
              <p className="text-gray-400">
                Rapid prototyping of custom robot parts, brackets, and housings with precision tolerances.
              </p>
            </div>
            
            <div className="bg-dark-card border border-gray-800 rounded-lg p-6 opacity-0 animate-fade-in-up delay-200">
              <div className="flex items-center mb-4">
                <Plane className="h-6 w-6 text-neon-lime mr-3" />
                <h3 className="text-xl font-bold">Aerospace</h3>
              </div>
              <p className="text-gray-400">
                Lightweight components and prototypes with strict quality requirements and material traceability.
              </p>
            </div>
            
            <div className="bg-dark-card border border-gray-800 rounded-lg p-6 opacity-0 animate-fade-in-up delay-300">
              <div className="flex items-center mb-4">
                <Factory className="h-6 w-6 text-neon-orange mr-3" />
                <h3 className="text-xl font-bold">Manufacturing</h3>
              </div>
              <p className="text-gray-400">
                Custom tooling, jigs, and fixtures produced on-demand without traditional lead times.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12 opacity-0 animate-fade-in-up delay-400">
            <a 
              href="/dashboard/agent-setup" 
              className="inline-flex items-center justify-center py-3 px-6 rounded-md bg-neon-cyan/10 text-neon-cyan border border-neon-cyan hover:bg-neon-cyan/20 transition-all"
            >
              See How It Works →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
