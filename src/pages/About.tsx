
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
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
