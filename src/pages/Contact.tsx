
import { Mail, MessageCircle, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <section className="max-w-4xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Get in Touch</span>
          </h1>
          <p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            Ready to transform your manufacturing workflow? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Email Contact */}
          <div className="bg-dark-card border border-gray-800 rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-neon-cyan/10 rounded-full flex items-center justify-center mb-6">
              <Mail className="h-8 w-8 text-neon-cyan" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Email Us</h2>
            <p className="text-gray-400 mb-6">
              For inquiries about partnerships, pilot programs, or general questions.
            </p>
            <a 
              href="mailto:hello@microforge.dev" 
              className="inline-flex items-center justify-center py-3 px-6 rounded-md border border-neon-cyan bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300 button-glow cyan-glow"
            >
              hello@microforge.dev
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>

          {/* Pilot Program */}
          <div className="bg-dark-card border border-gray-800 rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-neon-lime/10 rounded-full flex items-center justify-center mb-6">
              <MessageCircle className="h-8 w-8 text-neon-lime" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Join Our Pilot</h2>
            <p className="text-gray-400 mb-6">
              Interested in early access? Apply for our pilot program and help shape the future.
            </p>
            <a 
              href="/early-access" 
              className="inline-flex items-center justify-center py-3 px-6 rounded-md border border-neon-lime bg-neon-lime/10 text-neon-lime hover:bg-neon-lime/20 transition-all duration-300 button-glow lime-glow"
            >
              Apply for Pilot
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>

        {/* What to expect */}
        <div className="bg-dark-lighter border border-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4 text-center">What to Expect</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-neon-cyan font-bold text-lg mb-2">Quick Response</div>
              <p className="text-gray-400 text-sm">We typically respond within 24 hours</p>
            </div>
            <div>
              <div className="text-neon-lime font-bold text-lg mb-2">Technical Depth</div>
              <p className="text-gray-400 text-sm">Our team understands manufacturing challenges</p>
            </div>
            <div>
              <div className="text-neon-orange font-bold text-lg mb-2">Partnership Focus</div>
              <p className="text-gray-400 text-sm">We're building long-term relationships</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
