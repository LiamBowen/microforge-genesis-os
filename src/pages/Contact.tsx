
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <section className="max-w-2xl mx-auto py-24 px-6 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Get in Touch</h1>
        <p className="text-lg text-gray-400 mb-12 leading-relaxed">
          Interested in a pilot, partnership, or joining the team?
          Reach out — we'd love to hear from you.
        </p>

        <div className="text-base text-gray-400">
          📧{" "}
          <a 
            href="mailto:hello@microforge.com" 
            className="text-neon-cyan hover:text-neon-lime underline transition-colors"
          >
            hello@microforge.com
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
