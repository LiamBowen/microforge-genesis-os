
import { Mail, MessageCircle, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <section className="max-w-4xl mx-auto py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Get in Touch</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto px-4">
            Ready to transform your manufacturing workflow? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16 md:grid-cols-2">
          {/* Email Contact */}
          <div className="bg-dark-card border border-gray-800 rounded-lg p-6 sm:p-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-neon-cyan/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-neon-cyan" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Email Us</h2>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              For inquiries about partnerships, pilot programs, or general questions.
            </p>
            <a 
              href="mailto:hello@microforge.dev" 
              className="inline-flex items-center justify-center py-3 px-4 sm:px-6 rounded-md border border-neon-cyan bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300 button-glow cyan-glow text-sm sm:text-base no-zoom"
            >
              hello@microforge.dev
              <ArrowRight size={18} className="ml-2" />
            </a>
          </div>

          {/* Pilot Program */}
          <div className="bg-dark-card border border-gray-800 rounded-lg p-6 sm:p-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-neon-lime/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-neon-lime" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Join Our Pilot</h2>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              Interested in early access? Apply for our pilot program and help shape the future.
            </p>
            <a 
              href="/early-access" 
              className="inline-flex items-center justify-center py-3 px-4 sm:px-6 rounded-md border border-neon-lime bg-neon-lime/10 text-neon-lime hover:bg-neon-lime/20 transition-all duration-300 button-glow lime-glow text-sm sm:text-base no-zoom"
            >
              Apply for Pilot
              <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        </div>

        {/* What to expect */}
        <div className="bg-dark-lighter border border-gray-800 rounded-lg p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">What to Expect</h3>
          <div className="grid gap-6 sm:gap-8 text-center md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-neon-cyan font-bold text-base sm:text-lg mb-2">Quick Response</div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">We typically respond within 24 hours</p>
            </div>
            <div className="space-y-2">
              <div className="text-neon-lime font-bold text-base sm:text-lg mb-2">Technical Depth</div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Our team understands manufacturing challenges</p>
            </div>
            <div className="space-y-2">
              <div className="text-neon-orange font-bold text-base sm:text-lg mb-2">Partnership Focus</div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">We're building long-term relationships</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
