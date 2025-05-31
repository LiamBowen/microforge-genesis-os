
import { Upload, Play, ArrowRight, Cpu, Settings, Zap } from "lucide-react";
import RequestAccessButton from "../RequestAccessButton";

const ProductionSimulationSection = () => {
  return (
    <section className="py-24 bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Simulate a Real Production Run</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Upload your part and watch how MicroForge intelligently analyzes, plans, 
              and routes production across your connected machines — instantly.
            </p>
          </div>

          {/* Main Demo Visual */}
          <div className="mb-16">
            <div className="bg-dark-card rounded-xl p-8 border border-gray-800">
              {/* Mock Dashboard Interface */}
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Production Dashboard</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">Live</span>
                  </div>
                </div>
                
                {/* Upload Area Mock */}
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6 hover:border-neon-cyan transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">Drop your CAD file here</p>
                  <p className="text-sm text-gray-500">.stl, .step, .obj supported</p>
                </div>

                {/* Processing Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Cpu className="w-5 h-5 text-neon-cyan mr-2" />
                      <span className="text-sm font-medium text-white">Analyzing</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-neon-cyan h-2 rounded-full w-full animate-pulse"></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Geometry & material detection</p>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Settings className="w-5 h-5 text-neon-lime mr-2" />
                      <span className="text-sm font-medium text-white">Planning</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-neon-lime h-2 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Optimal machine selection</p>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Zap className="w-5 h-5 text-neon-orange mr-2" />
                      <span className="text-sm font-medium text-white">Routing</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-neon-orange h-2 rounded-full w-1/2 animate-pulse"></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Queue & workflow setup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Machine Network Visual */}
          <div className="mb-12">
            <div className="relative">
              {/* Central Command Center */}
              <div className="flex justify-center mb-8">
                <div className="bg-dark-card rounded-xl p-6 border-2 border-neon-cyan relative">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Settings className="w-8 h-8 text-neon-cyan" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">Command Center</h3>
                    <p className="text-sm text-gray-400">Coordinating 3 machines</p>
                  </div>
                  
                  {/* Animated pulse rings */}
                  <div className="absolute inset-0 rounded-xl border-2 border-neon-cyan/30 animate-ping"></div>
                  <div className="absolute inset-0 rounded-xl border-2 border-neon-cyan/20 animate-ping" style={{animationDelay: '1s'}}></div>
                </div>
              </div>

              {/* Connected Machines */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "3D Printer", status: "Printing Layer 47/120", color: "neon-cyan", icon: "🖨️" },
                  { name: "CNC Mill", status: "Roughing Operation", color: "neon-lime", icon: "⚙️" },
                  { name: "Laser Cutter", status: "Ready - Queue: 2", color: "neon-orange", icon: "⚡" }
                ].map((machine, index) => (
                  <div key={index} className="relative">
                    {/* Connection Line */}
                    <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 h-16 w-px bg-gradient-to-b from-${machine.color} to-transparent`}></div>
                    
                    {/* Machine Card */}
                    <div className={`bg-dark-card rounded-lg p-4 border border-${machine.color}/30 relative mt-16`}>
                      <div className="text-center">
                        <div className="text-2xl mb-2">{machine.icon}</div>
                        <h4 className="font-semibold text-white mb-1">{machine.name}</h4>
                        <p className="text-sm text-gray-400 mb-3">{machine.status}</p>
                        <div className={`w-full bg-gray-700 rounded-full h-1.5`}>
                          <div className={`bg-${machine.color} h-1.5 rounded-full animate-pulse`} style={{width: `${60 + index * 15}%`}}></div>
                        </div>
                      </div>
                      
                      {/* Data flow animation */}
                      <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-${machine.color} rounded-full animate-bounce`} style={{animationDelay: `${index * 0.5}s`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <RequestAccessButton size="lg" variant="cyan" text="See It in Action" />
            <p className="text-sm text-gray-500 mt-3">Interactive demo launching soon.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductionSimulationSection;
