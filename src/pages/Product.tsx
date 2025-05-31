
import { Cpu, Cloud, Database, GitBranch, FileCode, RefreshCw, Shield, Clock, Settings } from "lucide-react";
import RequestAccessButton from "@/components/RequestAccessButton";

const Product = () => {
  return (
    <div className="pt-16 bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-hero-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 opacity-0 animate-fade-in-up">
              <span className="gradient-text">An Operating System</span>
              <span className="block mt-2">for Machines That Make Things</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
              MicroForge is a comprehensive platform that transforms disconnected manufacturing machines into intelligent, autonomous production systems.
            </p>
          </div>
        </div>
      </section>
      
      {/* Product Overview */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6 opacity-0 animate-fade-in-up">Control Machines with AI, Not Engineers</h2>
                <div className="space-y-6 opacity-0 animate-fade-in-up delay-100">
                  <p className="text-gray-300">
                    MicroForge bridges the gap between design and production with AI models that automatically generate optimal machine instructions from your CAD files.
                  </p>
                  <p className="text-gray-300">
                    No more manual CAM programming, machine setup, or process monitoring. Upload your design and let our system handle the rest.
                  </p>
                  <p className="text-gray-300">
                    The platform continuously learns from every build, improving quality and efficiency while reducing the need for human intervention.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 opacity-0 animate-fade-in-up delay-200">
                <div className="bg-dark-card border border-gray-800 rounded-lg p-4 h-full">
                  <div className="aspect-video bg-dark relative rounded">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Simulated UI */}
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-3/4 h-3/4 border-2 border-neon-cyan rounded flex items-center justify-center relative">
                          <div className="absolute top-4 left-4 flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-neon-orange"></div>
                            <div className="w-2 h-2 rounded-full bg-neon-lime"></div>
                            <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                          </div>
                          <div className="text-neon-cyan text-sm animate-pulse">AI Processing Model</div>
                          
                          <div className="absolute inset-0 m-8 border border-gray-700 rounded flex">
                            <div className="w-1/2 border-r border-gray-700 flex flex-col">
                              <div className="p-2 border-b border-gray-700 text-xs text-gray-400">Input Model</div>
                              <div className="flex-grow flex items-center justify-center">
                                <div className="w-16 h-16 border-2 border-gray-600"></div>
                              </div>
                            </div>
                            <div className="w-1/2 flex flex-col">
                              <div className="p-2 border-b border-gray-700 text-xs text-gray-400">Output Paths</div>
                              <div className="flex-grow flex items-center justify-center">
                                <div className="w-16 h-16 border-2 border-neon-cyan animate-pulse-glow"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Features */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">
              Key Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6 hover:border-neon-cyan/50 transition-all opacity-0 animate-fade-in-up delay-100">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-neon-cyan/10 rounded-md mr-4">
                    <Cpu className="h-6 w-6 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">AI-Driven CAM</h3>
                    <p className="text-gray-400">
                      Upload a design file, and MicroForge auto-generates optimal toolpaths in seconds. No human CAM programming required.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6 hover:border-neon-lime/50 transition-all opacity-0 animate-fade-in-up delay-200">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-neon-lime/10 rounded-md mr-4">
                    <Clock className="h-6 w-6 text-neon-lime" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Smart Scheduling</h3>
                    <p className="text-gray-400">
                      Automatically queue and coordinate jobs across multiple machines for maximum efficiency and minimal downtime.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6 hover:border-neon-orange/50 transition-all opacity-0 animate-fade-in-up delay-300">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-neon-orange/10 rounded-md mr-4">
                    <Cloud className="h-6 w-6 text-neon-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Cloud-Connected Machines</h3>
                    <p className="text-gray-400">
                      Monitor and control your machine fleet remotely with real-time updates, alerts, and performance analytics.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6 hover:border-neon-cyan/50 transition-all opacity-0 animate-fade-in-up delay-400">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-neon-cyan/10 rounded-md mr-4">
                    <RefreshCw className="h-6 w-6 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Self-Optimizing Builds</h3>
                    <p className="text-gray-400">
                      Our system learns from every job to continuously improve speed, quality, and efficiency over time.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6 hover:border-neon-lime/50 transition-all opacity-0 animate-fade-in-up delay-500">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-neon-lime/10 rounded-md mr-4">
                    <Database className="h-6 w-6 text-neon-lime" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Part Library</h3>
                    <p className="text-gray-400">
                      A collaborative, searchable archive of build-ready parts with version history and metadata.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6 hover:border-neon-orange/50 transition-all opacity-0 animate-fade-in-up delay-600">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-neon-orange/10 rounded-md mr-4">
                    <GitBranch className="h-6 w-6 text-neon-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Git-style Versioning</h3>
                    <p className="text-gray-400">
                      Track design changes and production iterations with complete version history and rollback capabilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Platform Architecture */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">
              Platform Architecture
            </h2>
            
            <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-100">
              <div className="relative">
                {/* Layer 1 - UI */}
                <div className="border border-gray-700 rounded-lg p-4 bg-dark z-30 relative">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-300">User Interface Layer</div>
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 text-neon-cyan mr-2" />
                      <div className="text-xs text-gray-500">Dashboard & Controls</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border border-gray-800 rounded h-6 bg-dark-lighter"></div>
                    <div className="border border-gray-800 rounded h-6 bg-dark-lighter"></div>
                    <div className="border border-gray-800 rounded h-6 bg-dark-lighter"></div>
                  </div>
                </div>
                
                {/* Layer 2 - AI */}
                <div className="border border-gray-700 rounded-lg p-4 bg-dark mt-4 ml-6 mr-6 z-20 relative">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-300">AI Processing Layer</div>
                    <div className="flex items-center">
                      <Cpu className="h-4 w-4 text-neon-lime mr-2" />
                      <div className="text-xs text-gray-500">ML Models & Optimization</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="border border-gray-800 rounded h-6 bg-dark-lighter"></div>
                    <div className="border border-gray-800 rounded h-6 bg-neon-lime/10"></div>
                    <div className="border border-gray-800 rounded h-6 bg-dark-lighter"></div>
                    <div className="border border-gray-800 rounded h-6 bg-neon-lime/10"></div>
                  </div>
                </div>
                
                {/* Layer 3 - Machine Control */}
                <div className="border border-gray-700 rounded-lg p-4 bg-dark mt-4 ml-12 mr-12 z-10 relative">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-300">Machine Control Layer</div>
                    <div className="flex items-center">
                      <FileCode className="h-4 w-4 text-neon-orange mr-2" />
                      <div className="text-xs text-gray-500">Hardware Interface</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="border border-gray-800 rounded h-6 bg-dark-lighter"></div>
                    <div className="border border-gray-800 rounded h-6 bg-dark-lighter"></div>
                    <div className="border border-gray-800 rounded h-6 bg-neon-orange/10"></div>
                    <div className="border border-gray-800 rounded h-6 bg-dark-lighter"></div>
                    <div className="border border-gray-800 rounded h-6 bg-dark-lighter"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-neon-cyan mr-2"></div>
                  <p className="text-gray-300">
                    <span className="font-medium">User Interface Layer:</span> Design upload, job configuration, monitoring dashboard, and fleet management tools.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-neon-lime mr-2"></div>
                  <p className="text-gray-300">
                    <span className="font-medium">AI Processing Layer:</span> Machine learning models for toolpath generation, parameter optimization, and quality control.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-neon-orange mr-2"></div>
                  <p className="text-gray-300">
                    <span className="font-medium">Machine Control Layer:</span> Hardware interfaces, real-time control systems, and sensor integration APIs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security & Compliance */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="md:flex items-center">
              <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center opacity-0 animate-fade-in-up">
                <div className="w-32 h-32 rounded-full bg-neon-cyan/5 flex items-center justify-center">
                  <Shield className="h-16 w-16 text-neon-cyan" />
                </div>
              </div>
              <div className="md:w-2/3 md:pl-12">
                <h2 className="text-3xl font-bold mb-6 opacity-0 animate-fade-in-up delay-100">Security & Compliance</h2>
                <div className="space-y-4 opacity-0 animate-fade-in-up delay-200">
                  <p className="text-gray-300">
                    MicroForge prioritizes the security of your intellectual property and production data. Our platform is built with security at its core.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                      </div>
                      <span>End-to-end encryption for all designs and production data</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                      </div>
                      <span>On-premise deployment options for sensitive environments</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                      </div>
                      <span>Comprehensive audit trails and access controls</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                      </div>
                      <span>Compliance with major industry standards and regulations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8 opacity-0 animate-fade-in-up">
              Ready to Transform Your Manufacturing?
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
              Join our early access program to experience the future of autonomous manufacturing.
            </p>
            
            <div className="opacity-0 animate-fade-in-up delay-200">
              <RequestAccessButton size="lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
