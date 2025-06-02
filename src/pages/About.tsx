
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
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
      
      <section className="max-w-4xl mx-auto py-24 px-6 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Building the Future of Autonomous Manufacturing
        </h1>
        <p className="text-lg lg:text-xl text-gray-400 leading-relaxed mb-10">
          MicroForge is reimagining how the world builds things — from rapid prototyping to full-scale production, 
          our platform enables a new generation of cloud-connected, AI-automated microfactories.
        </p>

        <div className="mt-16 text-gray-500 text-base space-y-4">
          <p>We believe manufacturing should be as programmable as software.</p>
          <p>As accessible as the cloud. As decentralized as the web.</p>
          <p>We're not just building tools — we're building infrastructure for a new industrial age.</p>
        </div>

        <div className="mt-16 text-gray-500 text-sm">
          © {new Date().getFullYear()} MicroForge. Made by builders, for builders.
        </div>
      </section>
    </div>
  );
};

export default About;
