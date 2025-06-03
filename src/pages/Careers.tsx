
import BackButton from "../components/BackButton";

const Careers = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <BackButton />
      
      <section className="max-w-3xl mx-auto py-24 px-6 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Work With Us</h1>
        <p className="text-lg lg:text-xl text-gray-400 leading-relaxed mb-12">
          We're assembling a world-class team to build the operating system for autonomous microfactories. 
          If you're obsessed with hard problems, frontier tech, and the future of manufacturing — we want to hear from you.
        </p>

        <div className="mt-16 text-base text-gray-400 space-y-6">
          <p><strong className="text-white">Accepting CV's now!</strong></p>
          <p>
            Send your portfolio or CV to{" "}
            <a href="mailto:careers@microforge.dev" className="text-neon-cyan hover:text-neon-lime underline transition-colors">
              careers@microforge.dev
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Careers;
