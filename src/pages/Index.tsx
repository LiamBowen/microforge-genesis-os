import { Microchip, Factory, Database, Rocket, ArrowDown, Cpu, Plane } from "lucide-react";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import RequestAccessButton from "@/components/RequestAccessButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Vision Section */}
      <section id="how-it-works" className="py-24 bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">
              <strong>Manufacturing Is Still Manual.</strong>
              <span className="block text-neon-lime glow-text-lime"><strong>We're Changing That.</strong></span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center md:text-left opacity-0 animate-fade-in-up delay-100">
                <div className="flex justify-center md:justify-start mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neon-cyan/10 text-neon-cyan">
                    <Factory size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2"><strong>Factories are disconnected.</strong></h3>
                <p className="text-gray-400">
                  Most machines aren't networked or intelligent, requiring manual setup and monitoring by experts.
                </p>
              </div>
              
              <div className="text-center md:text-left opacity-0 animate-fade-in-up delay-200">
                <div className="flex justify-center md:justify-start mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neon-lime/10 text-neon-lime">
                    <Microchip size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2"><strong>AI + Automation are ready.</strong></h3>
                <p className="text-gray-400">
                  MicroForge uses real-time models to control machines, not just monitor them, creating fully autonomous production.
                </p>
              </div>
              
              <div className="text-center md:text-left opacity-0 animate-fade-in-up delay-300">
                <div className="flex justify-center md:justify-start mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neon-orange/10 text-neon-orange">
                    <Database size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2"><strong>The world needs resilient production.</strong></h3>
                <p className="text-gray-400">
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
      
      {/* Product Section */}
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
      
      {/* Use Cases Section */}
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
      
      {/* Testimonial Section */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <TestimonialCard 
              quote="Before MicroForge, it took us 3 hours and 2 engineers to prep a part. Now we click one button and the machines do the rest. It's transformed our prototyping speed."
              name="Alex Chen"
              role="Founder"
              company="Quantum Robotics"
            />
          </div>
        </div>
      </section>
      
      {/* Global Impact */}
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
      
      {/* CTA Section */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-8 opacity-0 animate-fade-in-up">
              <span className="gradient-text">Let's Build</span>
              <span className="block">the Future Together</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0 animate-fade-in-up delay-100">
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6 hover:border-neon-cyan/50 transition-all">
                <div className="mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-neon-cyan/10 flex items-center justify-center">
                    <Microchip className="h-6 w-6 text-neon-cyan" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Hardware Startup?</h3>
                <p className="text-gray-400 mb-4">Speed up your prototyping and remove manual CAM constraints.</p>
                <RequestAccessButton text="Request Early Access" />
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6 hover:border-neon-lime/50 transition-all">
                <div className="mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-neon-lime/10 flex items-center justify-center">
                    <Factory className="h-6 w-6 text-neon-lime" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Run a lab or factory?</h3>
                <p className="text-gray-400 mb-4">Optimize your machine capacity and enable autonomous operation.</p>
                <RequestAccessButton variant="lime" text="Book a Demo" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
