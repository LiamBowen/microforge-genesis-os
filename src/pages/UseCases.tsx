
import { Cpu, Plane, Factory, Rocket } from "lucide-react";

const UseCases = () => {
  return (
    <div className="pt-16 bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-hero-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 opacity-0 animate-fade-in-up">
              <span className="gradient-text text-5xl md:text-6xl font-bold">Who It's Built For</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
              Designed for teams who run small-batch, high-complexity operations — where speed, accuracy, and autonomy matter.
            </p>
          </div>
        </div>
      </section>
      
      {/* Use Cases */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-100">
                <div className="flex items-center mb-6">
                  <Cpu className="h-8 w-8 text-neon-cyan mr-4" />
                  <h3 className="text-2xl font-bold">R&D Labs</h3>
                </div>
                <p className="text-gray-300">
                  Quickly iterate designs and tests without machine babysitting.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-200">
                <div className="flex items-center mb-6">
                  <Plane className="h-8 w-8 text-neon-lime mr-4" />
                  <h3 className="text-2xl font-bold">Aerospace & Defense</h3>
                </div>
                <p className="text-gray-300">
                  Automate compliance, logging, and multi-machine coordination.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-300">
                <div className="flex items-center mb-6">
                  <Rocket className="h-8 w-8 text-neon-orange mr-4" />
                  <h3 className="text-2xl font-bold">Hardware Startups</h3>
                </div>
                <p className="text-gray-300">
                  Focus on your product — not building internal tooling or factory code.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-400">
                <div className="flex items-center mb-6">
                  <Factory className="h-8 w-8 text-neon-cyan mr-4" />
                  <h3 className="text-2xl font-bold">Microfactories</h3>
                </div>
                <p className="text-gray-300">
                  Scale local, smart production with global-level infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCases;
