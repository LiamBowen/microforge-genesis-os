
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
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
      
      <section className="max-w-3xl mx-auto py-24 px-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">Terms of Use</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: May 24, 2025</p>

        <div className="space-y-6 text-gray-400 leading-relaxed">
          <p>
            By accessing or using MicroForge, you agree to the following terms:
          </p>

          <ul className="list-disc ml-6 space-y-3 text-sm">
            <li>You are responsible for how you use the platform.</li>
            <li>MicroForge is provided "as is" without warranties of any kind.</li>
            <li>We are not liable for any damages resulting from use of the platform.</li>
            <li>You may not reverse-engineer, resell, or exploit any part of the service.</li>
          </ul>

          <p className="text-sm pt-6">
            For legal inquiries, contact{" "}
            <a 
              href="mailto:legal@microforge.com" 
              className="text-neon-cyan hover:text-neon-lime underline transition-colors"
            >
              legal@microforge.com
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Terms;
