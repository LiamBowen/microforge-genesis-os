
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
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
