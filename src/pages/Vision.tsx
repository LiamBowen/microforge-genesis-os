
import { Github, Rocket, Zap, Globe, Shield } from "lucide-react";
import RequestAccessButton from "@/components/RequestAccessButton";

const Vision = () => {
  return (
    <div className="pt-16 bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-hero-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 opacity-0 animate-fade-in-up">
              <span className="gradient-text">Manufacturing Is Still Manual.</span>
              <span className="block mt-2">We're Changing That.</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
              At MicroForge, we're building a future where advanced manufacturing is as simple as cloud computing. Our vision is to make hardware production as accessible and scalable as software development.
            </p>
          </div>
        </div>
      </section>
      
      {/* Problem Section */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">The Problem We're Solving</h2>
            
            <div className="space-y-16">
              <div className="md:flex items-center opacity-0 animate-fade-in-up delay-100">
                <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-4 text-neon-cyan">Manufacturing is Disconnected</h3>
                  <p className="text-gray-300">
                    Despite advances in digital technology, most manufacturing processes remain stubbornly manual. Engineers still hand-program machines, production lines still require constant human supervision, and scaling production means scaling human expertise linearly.
                  </p>
                </div>
                <div className="md:w-1/2 bg-dark-card border border-gray-800 rounded-lg p-6">
                  <div className="aspect-video bg-dark rounded flex flex-col items-center justify-center text-center">
                    <div className="text-4xl text-gray-600 mb-4">72%</div>
                    <p className="text-gray-400">of manufacturing time is spent on manual setup and monitoring</p>
                  </div>
                </div>
              </div>
              
              <div className="md:flex flex-row-reverse items-center opacity-0 animate-fade-in-up delay-200">
                <div className="md:w-1/2 md:pl-8 mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-4 text-neon-lime">Supply Chains are Fragile</h3>
                  <p className="text-gray-300">
                    Global events have highlighted the vulnerability of long, complex supply chains. Organizations need resilient, distributed production capabilities that can operate autonomously and adapt to changing conditions without constant human intervention.
                  </p>
                </div>
                <div className="md:w-1/2 bg-dark-card border border-gray-800 rounded-lg p-6">
                  <div className="aspect-video bg-dark rounded flex flex-col items-center justify-center text-center">
                    <div className="text-4xl text-gray-600 mb-4">94%</div>
                    <p className="text-gray-400">of Fortune 1000 companies experienced supply chain disruptions in 2023</p>
                  </div>
                </div>
              </div>
              
              <div className="md:flex items-center opacity-0 animate-fade-in-up delay-300">
                <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-4 text-neon-orange">Skill Barriers Limit Innovation</h3>
                  <p className="text-gray-300">
                    Creating physical products requires specialized knowledge in CAD/CAM, machine operation, and material science. These skill barriers prevent many innovators from bringing their ideas to life and slow down the development process for those who can.
                  </p>
                </div>
                <div className="md:w-1/2 bg-dark-card border border-gray-800 rounded-lg p-6">
                  <div className="aspect-video bg-dark rounded flex flex-col items-center justify-center text-center">
                    <div className="text-4xl text-gray-600 mb-4">3-6 mo</div>
                    <p className="text-gray-400">average training time needed for CAM engineers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Solution */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">
              <span className="gradient-text">Our Solution:</span>
              <span className="block">The AI OS for Manufacturing</span>
            </h2>
            
            <div className="space-y-12">
              <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-100">
                <div className="flex items-start mb-6">
                  <div className="mr-4 p-2 bg-neon-cyan/10 rounded-md">
                    <Zap className="h-6 w-6 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">AI-Powered Autonomy</h3>
                    <p className="text-gray-300">
                      MicroForge uses machine learning to automate the complex tasks of toolpath generation, process planning, and quality control—removing the need for manual programming and monitoring.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-200">
                <div className="flex items-start mb-6">
                  <div className="mr-4 p-2 bg-neon-lime/10 rounded-md">
                    <Globe className="h-6 w-6 text-neon-lime" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Distributed Production Networks</h3>
                    <p className="text-gray-300">
                      Our platform enables organizations to establish networks of small, flexible manufacturing cells that can produce parts on demand, close to where they're needed—creating resilience through distribution.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-300">
                <div className="flex items-start mb-6">
                  <div className="mr-4 p-2 bg-neon-orange/10 rounded-md">
                    <Shield className="h-6 w-6 text-neon-orange" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Democratized Manufacturing</h3>
                    <p className="text-gray-300">
                      By abstracting away technical complexity, MicroForge makes advanced manufacturing accessible to anyone—from students and entrepreneurs to researchers and defense agencies—without requiring years of specialized training.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-6 opacity-0 animate-fade-in-up delay-400">
                We're building the brain of the next industrial revolution.
              </h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-24 bg-dark-lighter relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-800"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">Our Roadmap</h2>
            
            <div className="space-y-16 relative">
              <div className="flex opacity-0 animate-fade-in-up delay-100">
                <div className="w-1/2 pr-12 text-right">
                  <h3 className="text-xl font-bold text-neon-cyan">2024</h3>
                  <h4 className="text-lg font-medium mb-2">Pilot Program</h4>
                  <p className="text-gray-400">
                    Initial deployment with select R&D labs and hardware startups for AI-driven manufacturing automation.
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-neon-cyan mt-1"></div>
                <div className="w-1/2 pl-12"></div>
              </div>
              
              <div className="flex opacity-0 animate-fade-in-up delay-200">
                <div className="w-1/2 pr-12"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-neon-lime mt-1"></div>
                <div className="w-1/2 pl-12">
                  <h3 className="text-xl font-bold text-neon-lime">2025</h3>
                  <h4 className="text-lg font-medium mb-2">Platform Expansion</h4>
                  <p className="text-gray-400">
                    Public launch of MicroForge OS with support for a wide range of machines and production scenarios.
                  </p>
                </div>
              </div>
              
              <div className="flex opacity-0 animate-fade-in-up delay-300">
                <div className="w-1/2 pr-12 text-right">
                  <h3 className="text-xl font-bold text-neon-orange">2026</h3>
                  <h4 className="text-lg font-medium mb-2">Global Network</h4>
                  <p className="text-gray-400">
                    Launch of the MicroForge production network, enabling distributed, on-demand manufacturing anywhere in the world.
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-neon-orange mt-1"></div>
                <div className="w-1/2 pl-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Us Section */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8 opacity-0 animate-fade-in-up">
              Join Us in Reimagining Manufacturing
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
              We're looking for partners who share our vision of autonomous, distributed manufacturing as the future of how things get made.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in-up delay-200">
              <RequestAccessButton size="lg" />
              
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center py-3 px-6 rounded-md border border-gray-700 text-gray-200 hover:bg-gray-800 transition-all"
              >
                <Github size={20} className="mr-2" />
                Open Protocol
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vision;
