
import BackButton from "../components/BackButton";

const Terms = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <BackButton />
      
      <section className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
              <p>
                By accessing and using MicroForge, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Use License</h2>
              <p>
                Permission is granted to temporarily access MicroForge for personal, non-commercial transitory viewing only. 
                This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
              <p>
                The materials on MicroForge are provided on an 'as is' basis. MicroForge makes no warranties, expressed or implied, 
                and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions 
                of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Limitations</h2>
              <p>
                In no event shall MicroForge or its suppliers be liable for any damages (including, without limitation, damages for loss of data 
                or profit, or due to business interruption) arising out of the use or inability to use MicroForge, even if MicroForge or a 
                MicroForge authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at{" "}
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

export default Terms;
