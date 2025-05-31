
import { Code, FlaskConical, Factory, Rocket, GraduationCap } from "lucide-react";
import RequestAccessButton from "@/components/RequestAccessButton";

const UseCases = () => {
  return (
    <div className="pt-16 bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-hero-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 opacity-0 animate-fade-in-up">
              <span className="gradient-text">Who MicroForge</span>
              <span className="block mt-2">Is Built For</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
              MicroForge empowers diverse organizations to revolutionize their manufacturing capabilities, from rapid prototyping to full-scale production.
            </p>
          </div>
        </div>
      </section>
      
      {/* Use Cases */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Hardware Startups */}
            <div className="mb-24">
              <div className="md:flex items-start">
                <div className="md:w-1/3 mb-8 md:mb-0">
                  <div className="bg-neon-cyan/10 p-6 rounded-lg inline-block opacity-0 animate-fade-in-up">
                    <Code className="h-16 w-16 text-neon-cyan" />
                  </div>
                  <h2 className="text-3xl font-bold mt-6 mb-4 opacity-0 animate-fade-in-up delay-100">Hardware Startups</h2>
                  <p className="text-gray-300 opacity-0 animate-fade-in-up delay-200">
                    Accelerate development cycles with rapid, automated prototyping
                  </p>
                </div>
                <div className="md:w-2/3 md:pl-12">
                  <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-300">
                    <div className="space-y-6">
                      <p className="text-gray-300">
                        Hardware startups face intense pressure to iterate quickly and economically. MicroForge removes the CAM bottleneck that traditionally slows down the prototype-test-iterate cycle.
                      </p>
                      
                      <h3 className="text-xl font-bold text-neon-cyan">Key Benefits</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">No CAM Engineers Required</h4>
                            <p className="text-gray-400">Upload designs directly from CAD and get production-ready parts without specialized programming skills.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">10x Faster Iteration Cycles</h4>
                            <p className="text-gray-400">Reduce time from design change to physical prototype from days to hours or minutes.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">Lower Production Costs</h4>
                            <p className="text-gray-400">Optimize material usage and machine time automatically, reducing cost per part.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-800 pt-6">
                        <blockquote className="italic text-gray-400">
                          "Before MicroForge, getting from CAD to physical part meant waiting for our CAM engineer to free up. Now anyone on the team can push designs straight to our machines and get parts back the same day."
                          <footer className="mt-2 font-normal not-italic text-sm">
                            - CTO, Robotics Startup
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* R&D Labs */}
            <div className="mb-24">
              <div className="md:flex items-start flex-row-reverse">
                <div className="md:w-1/3 mb-8 md:mb-0 md:pl-12">
                  <div className="bg-neon-lime/10 p-6 rounded-lg inline-block opacity-0 animate-fade-in-up">
                    <FlaskConical className="h-16 w-16 text-neon-lime" />
                  </div>
                  <h2 className="text-3xl font-bold mt-6 mb-4 opacity-0 animate-fade-in-up delay-100">R&D Labs</h2>
                  <p className="text-gray-300 opacity-0 animate-fade-in-up delay-200">
                    Reduce prototyping overhead and focus on research, not machines
                  </p>
                </div>
                <div className="md:w-2/3">
                  <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-300">
                    <div className="space-y-6">
                      <p className="text-gray-300">
                        Research labs need to quickly validate physical concepts without getting bogged down in manufacturing processes. MicroForge enables researchers to focus on their work while automation handles production.
                      </p>
                      
                      <h3 className="text-xl font-bold text-neon-lime">Key Benefits</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-lime/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-lime"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">Focus on Research, Not Manufacturing</h4>
                            <p className="text-gray-400">Let researchers concentrate on innovation while MicroForge handles the production details.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-lime/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-lime"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">Reproducible Results</h4>
                            <p className="text-gray-400">Ensure consistent production parameters across experiments with automated process control.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-lime/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-lime"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">Comprehensive Documentation</h4>
                            <p className="text-gray-400">Automatically generate detailed process records for every fabricated component.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Microfactories */}
            <div className="mb-24">
              <div className="md:flex items-start">
                <div className="md:w-1/3 mb-8 md:mb-0">
                  <div className="bg-neon-orange/10 p-6 rounded-lg inline-block opacity-0 animate-fade-in-up">
                    <Factory className="h-16 w-16 text-neon-orange" />
                  </div>
                  <h2 className="text-3xl font-bold mt-6 mb-4 opacity-0 animate-fade-in-up delay-100">Microfactories</h2>
                  <p className="text-gray-300 opacity-0 animate-fade-in-up delay-200">
                    Transform your machine fleet into a fully autonomous digital factory
                  </p>
                </div>
                <div className="md:w-2/3 md:pl-12">
                  <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-300">
                    <div className="space-y-6">
                      <p className="text-gray-300">
                        Small manufacturing operations need to maximize productivity with limited human resources. MicroForge enables microfactories to operate 24/7 with minimal supervision.
                      </p>
                      
                      <h3 className="text-xl font-bold text-neon-orange">Key Benefits</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-orange/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-orange"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">24/7 Autonomous Operation</h4>
                            <p className="text-gray-400">Keep your machines running around the clock without constant human monitoring.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-orange/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-orange"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">Optimized Machine Utilization</h4>
                            <p className="text-gray-400">Intelligent job scheduling and queue management to maximize output from your equipment.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-orange/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-orange"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">Scale Without Adding Staff</h4>
                            <p className="text-gray-400">Increase production capacity without proportionally increasing your workforce.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-800 pt-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-neon-orange mr-2"></div>
                              <span className="text-gray-400 text-sm">Machine Utilization</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 text-sm mr-2">Before:</span>
                              <div className="w-24 h-3 bg-gray-800 rounded-full">
                                <div className="w-10 h-3 bg-gray-600 rounded-full"></div>
                              </div>
                              <span className="text-gray-400 text-sm ml-2">42%</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 text-sm mr-2">After:</span>
                              <div className="w-24 h-3 bg-gray-800 rounded-full">
                                <div className="w-20 h-3 bg-neon-orange rounded-full"></div>
                              </div>
                              <span className="text-gray-400 text-sm ml-2">83%</span>
                            </div>
                          </div>
                          <div className="text-gray-400 text-sm">
                            Average customer results
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Defense & Aerospace */}
            <div className="mb-24">
              <div className="md:flex items-start flex-row-reverse">
                <div className="md:w-1/3 mb-8 md:mb-0 md:pl-12">
                  <div className="bg-neon-cyan/10 p-6 rounded-lg inline-block opacity-0 animate-fade-in-up">
                    <Rocket className="h-16 w-16 text-neon-cyan" />
                  </div>
                  <h2 className="text-3xl font-bold mt-6 mb-4 opacity-0 animate-fade-in-up delay-100">Defense & Aerospace</h2>
                  <p className="text-gray-300 opacity-0 animate-fade-in-up delay-200">
                    Secure, on-premise manufacturing with full auditability
                  </p>
                </div>
                <div className="md:w-2/3">
                  <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-300">
                    <div className="space-y-6">
                      <p className="text-gray-300">
                        Defense and aerospace organizations require secure manufacturing capabilities with complete chain-of-custody tracking. MicroForge's on-premise solutions maintain security while providing advanced automation.
                      </p>
                      
                      <h3 className="text-xl font-bold text-neon-cyan">Key Benefits</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">Air-Gapped Security</h4>
                            <p className="text-gray-400">Deploy in completely isolated environments with no external network connectivity requirements.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">Complete Audit Trail</h4>
                            <p className="text-gray-400">Comprehensive logging of all design changes, manufacturing processes, and operator actions.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-cyan/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">Rapid Field Manufacturing</h4>
                            <p className="text-gray-400">Enable on-demand production of critical components in remote or austere environments.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Universities & FabLabs */}
            <div>
              <div className="md:flex items-start">
                <div className="md:w-1/3 mb-8 md:mb-0">
                  <div className="bg-neon-lime/10 p-6 rounded-lg inline-block opacity-0 animate-fade-in-up">
                    <GraduationCap className="h-16 w-16 text-neon-lime" />
                  </div>
                  <h2 className="text-3xl font-bold mt-6 mb-4 opacity-0 animate-fade-in-up delay-100">Universities & FabLabs</h2>
                  <p className="text-gray-300 opacity-0 animate-fade-in-up delay-200">
                    Let students and researchers build and iterate autonomously
                  </p>
                </div>
                <div className="md:w-2/3 md:pl-12">
                  <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-300">
                    <div className="space-y-6">
                      <p className="text-gray-300">
                        Educational institutions need to provide students and researchers with manufacturing capabilities without requiring extensive training in machine operation. MicroForge democratizes access to advanced fabrication.
                      </p>
                      
                      <h3 className="text-xl font-bold text-neon-lime">Key Benefits</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-lime/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-lime"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">Accessible Advanced Manufacturing</h4>
                            <p className="text-gray-400">Allow students to use industrial-grade equipment without extensive training.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-lime/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-lime"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">Reduce Staff Overhead</h4>
                            <p className="text-gray-400">Minimize the need for dedicated technicians while maintaining or expanding machine availability.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-neon-lime/10 flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-neon-lime"></div>
                          </div>
                          <div>
                            <h4 className="font-bold">Enhanced Learning</h4>
                            <p className="text-gray-400">Focus on design principles and engineering concepts instead of machine operation details.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-800 pt-6">
                        <blockquote className="italic text-gray-400">
                          "Our makerspace can now handle 3x the student projects without adding staff. Students focus on designing, not struggling with CAM software or waiting for a lab tech to help them."
                          <footer className="mt-2 font-normal not-italic text-sm">
                            - Director, University Innovation Lab
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Global Impact Section */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8 opacity-0 animate-fade-in-up">
              <span className="gradient-text">Infrastructure for a</span>
              <span className="block">Resilient, Autonomous World</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
              Beyond specific industries, MicroForge is building the foundation for a world where production can happen anywhere, anytime, with minimal human intervention.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 opacity-0 animate-fade-in-up delay-200">
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6">
                <div className="h-32 flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-md"></div>
                    <div className="relative w-16 h-16 flex items-center justify-center bg-dark-card rounded-full border border-neon-cyan">
                      <div className="text-2xl font-bold text-neon-cyan">1</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Disaster Response</h3>
                <p className="text-gray-400">
                  Rapidly produce critical components on-site during emergency situations.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6">
                <div className="h-32 flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-neon-lime/20 rounded-full blur-md"></div>
                    <div className="relative w-16 h-16 flex items-center justify-center bg-dark-card rounded-full border border-neon-lime">
                      <div className="text-2xl font-bold text-neon-lime">2</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Remote Operations</h3>
                <p className="text-gray-400">
                  Enable manufacturing in isolated locations like research stations or space habitats.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6">
                <div className="h-32 flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-neon-orange/20 rounded-full blur-md"></div>
                    <div className="relative w-16 h-16 flex items-center justify-center bg-dark-card rounded-full border border-neon-orange">
                      <div className="text-2xl font-bold text-neon-orange">3</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Circular Economy</h3>
                <p className="text-gray-400">
                  Support sustainable production with intelligent material usage and recycling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8 opacity-0 animate-fade-in-up">
              See How MicroForge Can Transform Your Manufacturing
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

export default UseCases;
