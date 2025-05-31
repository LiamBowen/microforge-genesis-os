
import { Upload, Play, ArrowRight, Cpu, Settings, Zap, CheckCircle, Clock, Target } from "lucide-react";
import { useState, useEffect } from "react";
import RequestAccessButton from "../RequestAccessButton";

const ProductionSimulationSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPart, setSelectedPart] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const parts = [
    { name: "Bracket v2", icon: "🔧", complexity: "Simple" },
    { name: "Housing A", icon: "📦", complexity: "Medium" },
    { name: "Tool Adapter", icon: "⚙️", complexity: "Complex" }
  ];

  const machines = [
    { 
      name: "CNC Master", 
      icon: "⚙️", 
      optimal: true, 
      status: "Ready",
      estimatedTime: "2h 37m"
    },
    { 
      name: "ForgeBot 3D", 
      icon: "🖨️", 
      optimal: false, 
      status: "Busy",
      estimatedTime: "4h 12m"
    },
    { 
      name: "Laser Cutter X", 
      icon: "⚡", 
      optimal: false, 
      status: "Ready",
      estimatedTime: "N/A"
    }
  ];

  const analysisData = {
    material: "Aluminum",
    complexity: "Medium",
    toolpaths: 14
  };

  const workflowSteps = [
    { name: "CAD File", icon: "📄", status: "complete" },
    { name: "Analysis", icon: "🔍", status: "active" },
    { name: "Machine Queue", icon: "⏳", status: "pending" },
    { name: "Monitoring", icon: "📊", status: "pending" },
    { name: "Output", icon: "✅", status: "pending" }
  ];

  const handleStepAdvance = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setSelectedPart("");
    setSelectedMachine("");
    setIsAnalyzing(false);
  };

  useEffect(() => {
    if (currentStep === 2) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        handleStepAdvance();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <section className="py-24 bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">🔄 Experience the Workflow</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose a part. Pick a machine. Watch how MicroForge intelligently analyzes 
              and schedules production — from geometry detection to live job queuing.
            </p>
          </div>

          {/* Interactive Demo Container */}
          <div className="bg-dark-card rounded-xl p-8 border border-gray-800 mb-12">
            {/* Step 1: Choose a Part */}
            {currentStep === 0 && (
              <div className="text-center animate-fade-in">
                <h3 className="text-2xl font-bold mb-6">1. Choose a Part</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {parts.map((part, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedPart(part.name);
                        setTimeout(handleStepAdvance, 800);
                      }}
                      className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:bg-gray-700 border-2 ${
                        selectedPart === part.name ? 'border-neon-cyan scale-105' : 'border-gray-700'
                      }`}
                    >
                      <div className="text-4xl mb-3">{part.icon}</div>
                      <h4 className="font-semibold text-white mb-1">{part.name}</h4>
                      <p className="text-sm text-gray-400">Complexity: {part.complexity}</p>
                    </div>
                  ))}
                </div>
                {selectedPart && (
                  <div className="text-neon-cyan animate-fade-in">
                    Selected: {selectedPart} ✓
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Select Machine */}
            {currentStep === 1 && (
              <div className="text-center animate-fade-in">
                <h3 className="text-2xl font-bold mb-6">2. Select Machine (Auto Suggest Optimal)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {machines.map((machine, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedMachine(machine.name);
                        setTimeout(handleStepAdvance, 800);
                      }}
                      className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:bg-gray-700 border-2 relative ${
                        selectedMachine === machine.name ? 'border-neon-cyan scale-105' : 'border-gray-700'
                      } ${machine.optimal ? 'ring-2 ring-neon-lime/50' : ''}`}
                    >
                      {machine.optimal && (
                        <div className="absolute -top-2 -right-2 bg-neon-lime text-dark px-2 py-1 rounded-full text-xs font-bold">
                          OPTIMAL
                        </div>
                      )}
                      <div className="text-3xl mb-3">{machine.icon}</div>
                      <h4 className="font-semibold text-white mb-1">{machine.name}</h4>
                      <p className="text-sm text-gray-400 mb-1">Status: {machine.status}</p>
                      <p className="text-sm text-gray-400">Time: {machine.estimatedTime}</p>
                    </div>
                  ))}
                </div>
                {selectedMachine && (
                  <div className="text-neon-cyan animate-fade-in">
                    Selected: {selectedMachine} ✓
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Analysis Phase */}
            {currentStep === 2 && (
              <div className="text-center animate-fade-in">
                <h3 className="text-2xl font-bold mb-6">3. Analysis Phase</h3>
                <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <Cpu className="w-8 h-8 text-neon-cyan animate-spin mr-2" />
                    <span className="text-lg">Analyzing geometry + material</span>
                  </div>
                  
                  {isAnalyzing ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Material:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-1 bg-neon-cyan rounded animate-pulse mr-2"></div>
                          <span className="text-neon-cyan opacity-50">Detecting...</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Complexity:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-1 bg-neon-cyan rounded animate-pulse mr-2"></div>
                          <span className="text-neon-cyan opacity-50">Analyzing...</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Toolpaths:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-1 bg-neon-cyan rounded animate-pulse mr-2"></div>
                          <span className="text-neon-cyan opacity-50">Calculating...</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Material:</span>
                        <span className="text-neon-cyan">{analysisData.material}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Complexity:</span>
                        <span className="text-neon-cyan">{analysisData.complexity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Toolpaths:</span>
                        <span className="text-neon-cyan">{analysisData.toolpaths}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Production Time Estimation */}
            {currentStep === 3 && (
              <div className="text-center animate-fade-in">
                <h3 className="text-2xl font-bold mb-6">4. Production Time Estimation</h3>
                <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Chosen machine:</span>
                      <span className="text-neon-cyan font-semibold">CNC Master</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Estimated time:</span>
                      <span className="text-neon-lime font-semibold">2h 37m</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Efficiency:</span>
                      <span className="text-neon-orange font-semibold">Optimal</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleStepAdvance}
                  className="bg-neon-cyan/10 text-neon-cyan border border-neon-cyan px-6 py-2 rounded-md hover:bg-neon-cyan/20 transition-all"
                >
                  Continue to Queue Setup
                </button>
              </div>
            )}

            {/* Step 5: Queue and Workflow Setup */}
            {currentStep === 4 && (
              <div className="text-center animate-fade-in">
                <h3 className="text-2xl font-bold mb-6">5. Queue and Workflow Setup</h3>
                <div className="flex items-center justify-center space-x-4 mb-8 overflow-x-auto">
                  {workflowSteps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`flex flex-col items-center min-w-0 ${
                        index <= 1 ? 'text-neon-cyan' : 
                        index === 2 ? 'text-neon-lime' : 'text-gray-500'
                      }`}>
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 ${
                          index <= 1 ? 'border-neon-cyan bg-neon-cyan/20' :
                          index === 2 ? 'border-neon-lime bg-neon-lime/20 animate-pulse' : 'border-gray-500'
                        }`}>
                          <span className="text-lg">{step.icon}</span>
                        </div>
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                      {index < workflowSteps.length - 1 && (
                        <ArrowRight className={`w-6 h-6 mx-2 ${
                          index < 2 ? 'text-neon-cyan' : 'text-gray-500'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reset Demo Button */}
            {currentStep > 0 && (
              <div className="text-center mt-6">
                <button
                  onClick={resetDemo}
                  className="text-gray-400 hover:text-white text-sm underline"
                >
                  Reset Demo
                </button>
              </div>
            )}
          </div>

          {/* Final CTA Section */}
          {currentStep === 4 && (
            <div className="text-center animate-fade-in">
              <h3 className="text-2xl font-bold mb-4">Looks good? This is just the beginning.</h3>
              <RequestAccessButton size="lg" variant="cyan" text="Request Early Access" />
              <p className="text-sm text-gray-500 mt-3">Want to run this for real? Join our pilot program.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductionSimulationSection;
