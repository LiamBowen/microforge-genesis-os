import { Microchip, Factory, Database, Rocket } from "lucide-react";
import FeatureCard from "../FeatureCard";
const ProductSection = () => {
  return <section id="product-section" className="py-24 bg-dark-lighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">
            <span className="gradient-text"><strong>An Operating System</strong></span>
            <span className="block"><strong>for Machines That Make Things</strong></span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard icon={Microchip} title="AI-Driven CAM" description="Upload a file, and MicroForge auto-generates toolpaths in seconds — no human input required." color="cyan" delay="delay-100" />
            
            <FeatureCard icon={Factory} title="Smart Scheduling" description="Queue and coordinate across multiple machines with minimal downtime and maximum efficiency." color="lime" delay="delay-200" />
            
            <FeatureCard icon={Database} title="Cloud-Connected Machines" description="Monitor and control your fleet remotely with real-time updates and analytics." color="orange" delay="delay-300" />
            
            <FeatureCard icon={Rocket} title="Self-Optimizing Builds" description="MicroForge learns from every job to improve speed, quality, and efficiency over time." color="cyan" delay="delay-400" />
          </div>
          
          {/* Demo Preview */}
          
        </div>
      </div>
    </section>;
};
export default ProductSection;