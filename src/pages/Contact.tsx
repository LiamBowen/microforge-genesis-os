
import { Mail, MessageCircle, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <section className="max-w-4xl mx-auto py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
            <span className="gradient-text">Get in Touch</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-12 sm:mb-16 leading-relaxed max-w-3xl mx-auto px-2">
            Ready to transform your manufacturing workflow? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-10 sm:gap-12 lg:gap-16 mb-16 sm:mb-20 md:grid-cols-2">
          {/* Email Contact */}
          <div className="bg-card border border-gray-800 rounded-lg p-8 sm:p-10 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-neon-cyan/10 rounded-full flex items-center justify-center mb-6 sm:mb-8">
              <Mail className="h-8 w-8 sm:h-10 sm:w-10 text-neon-cyan" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Email Us</h2>
            <p className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              For inquiries about partnerships, pilot programs, or general questions.
            </p>
            <a 
              href="mailto:hello@microforge.dev" 
              className="inline-flex items-center justify-center py-4 px-6 sm:px-8 rounded-md border border-neon-cyan bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300 button-glow cyan-glow text-base sm:text-lg no-zoom"
            >
              hello@microforge.dev
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>

          {/* Pilot Program */}
          <div className="bg-card border border-gray-800 rounded-lg p-8 sm:p-10 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-neon-lime/10 rounded-full flex items-center justify-center mb-6 sm:mb-8">
              <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-neon-lime" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Join Our Pilot</h2>
            <p className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              Interested in early access? Apply for our pilot program and help shape the future.
            </p>
            <a 
              href="/early-access" 
              className="inline-flex items-center justify-center py-4 px-6 sm:px-8 rounded-md border border-neon-lime bg-neon-lime/10 text-neon-lime hover:bg-neon-lime/20 transition-all duration-300 button-glow lime-glow text-base sm:text-lg no-zoom"
            >
              Apply for Pilot
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>

        {/* What to expect */}
        <div className="bg-muted/20 border border-gray-800 rounded-lg p-8 sm:p-10">
          <h3 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-10 text-center">What to Expect</h3>
          <div className="grid gap-8 sm:gap-10 text-center md:grid-cols-3">
            <div className="space-y-3">
              <div className="text-neon-cyan font-bold text-lg sm:text-xl mb-3">Quick Response</div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">We typically respond within 24 hours</p>
            </div>
            <div className="space-y-3">
              <div className="text-neon-lime font-bold text-lg sm:text-xl mb-3">Technical Depth</div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Our team understands manufacturing challenges</p>
            </div>
            <div className="space-y-3">
              <div className="text-neon-orange font-bold text-lg sm:text-xl mb-3">Partnership Focus</div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">We're building long-term relationships</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
