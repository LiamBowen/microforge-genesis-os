
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
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
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: May 24, 2025</p>

        <div className="space-y-6 text-gray-400 leading-relaxed">
          <p>
            MicroForge respects your privacy. We only collect data necessary to provide and improve our platform.
            We do not sell or share your information with third parties.
          </p>

          <ul className="list-disc ml-6 space-y-3 text-sm">
            <li>We collect basic analytics to understand usage (via anonymized tools).</li>
            <li>All data is encrypted and securely stored.</li>
            <li>You may request your data or account deletion at any time.</li>
          </ul>

          <p className="text-sm pt-6">
            For any questions, email us at{" "}
            <a 
              href="mailto:privacy@microforge.com" 
              className="text-neon-cyan hover:text-neon-lime underline transition-colors"
            >
              privacy@microforge.com
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
