
import Hero from "@/components/Hero";
import TestimonialCard from "@/components/TestimonialCard";
import VisionSection from "@/components/sections/VisionSection";
import ProductSection from "@/components/sections/ProductSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import GlobalImpactSection from "@/components/sections/GlobalImpactSection";
import CTASection from "@/components/sections/CTASection";
import ProductionSimulationSection from "@/components/sections/ProductionSimulationSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <VisionSection />
      <ProductSection />
      <ProductionSimulationSection />
      <UseCasesSection />
      
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
      
      <GlobalImpactSection />
      <CTASection />
    </div>
  );
};

export default Index;
