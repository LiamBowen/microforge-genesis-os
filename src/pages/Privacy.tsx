
import BackButton from "../components/BackButton";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <BackButton />
      
      <section className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <p>
                When you use MicroForge, we collect information that you provide directly to us, such as when you create an account, 
                fill out forms, or contact us for support. This may include your name, email address, company information, 
                and details about your manufacturing setup.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, communicate with you, 
                and ensure the security of our platform. We may also use your information to send you updates about 
                new features, security alerts, and support messages.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except as described in this policy. We may share information with service providers who assist us in operating 
                our platform, conducting business, or serving users.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
                storage is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:hello@microforge.dev" className="text-neon-cyan hover:text-neon-lime underline">
                  hello@microforge.dev
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
