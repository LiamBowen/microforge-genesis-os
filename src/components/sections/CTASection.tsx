
import { Microchip, Factory } from "lucide-react";
import RequestAccessButton from "../RequestAccessButton";

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
