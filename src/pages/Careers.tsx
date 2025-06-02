
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Careers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-400 hover:text-neon-cyan transition-colors mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
        </div>
      </div>
      
      <section className="max-w-3xl mx-auto py-24 px-6 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Work With Us</h1>
        <p className="text-lg lg:text-xl text-gray-400 leading-relaxed mb-12">
          We're assembling a world-class team to build the operating system for autonomous microfactories. 
          If you're obsessed with hard problems, frontier tech, and the future of manufacturing — we want to hear from you.
        </p>

        <div className="mt-16 text-base text-gray-400 space-y-6">
          <p><strong className="text-white">Open Roles:</strong> Engineering, Robotics, ML, Full-Stack, Product Design</p>
          <p>
            Send your portfolio or CV to{" "}
            <a href="mailto:careers@microforge.com" className="text-neon-cyan hover:text-neon-lime underline transition-colors">
              careers@microforge.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Careers;
