
import DashboardPreview from "./DashboardPreview";
import AnimatedBackground from "./AnimatedBackground";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16 bg-hero-pattern overflow-hidden grid-bg">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="font-bold mb-4 opacity-0 animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            <span className="gradient-text block">The Operating System for</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Autonomous Manufacturing</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-100">
            From CAD to machine in minutes. No CAM. No friction. Just click and print, cut, or mill.
          </p>
          
          <div className="flex justify-center opacity-0 animate-fade-in-up delay-200">
            <a 
              href="#how-it-works" 
              className="inline-flex items-center justify-center py-3 px-6 rounded-md border border-neon-orange bg-neon-orange/10 text-neon-orange hover:bg-neon-orange/20 transition-all duration-300 button-glow orange-glow"
            >
              How It Works ↓
            </a>
          </div>
        </div>
      </div>
      
      <DashboardPreview />
    </div>
  );
};

export default Hero;
