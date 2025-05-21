
import { Twitter, Linkedin, Github, Mail } from "lucide-react";
import RequestAccessButton from "@/components/RequestAccessButton";

const GetInvolved = () => {
  return (
    <div className="pt-16 bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-hero-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 opacity-0 animate-fade-in-up">
              <span className="gradient-text">Let's Build</span>
              <span className="block mt-2">the Future Together</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
              Join us in creating the next generation of manufacturing technology. Whether you're a potential user, partner, or contributor, there are many ways to get involved.
            </p>
          </div>
        </div>
      </section>
      
      {/* Options Section */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-dark-card border border-gray-800 rounded-lg p-8 hover:border-neon-cyan/50 transition-all opacity-0 animate-fade-in-up delay-100">
                <div className="w-16 h-16 bg-neon-cyan/10 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-2xl font-bold text-neon-cyan">01</div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Hardware Startups</h2>
                <p className="text-gray-300 mb-6">
                  Are you building hardware and struggling with manufacturing bottlenecks? Get early access to MicroForge and transform your prototyping speed and production capabilities.
                </p>
                <div className="mt-auto">
                  <RequestAccessButton text="Request Early Access" />
                </div>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-8 hover:border-neon-lime/50 transition-all opacity-0 animate-fade-in-up delay-200">
                <div className="w-16 h-16 bg-neon-lime/10 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-2xl font-bold text-neon-lime">02</div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Factory or Lab Operators</h2>
                <p className="text-gray-300 mb-6">
                  Do you manage a manufacturing facility or research lab with machines that could benefit from AI optimization? Schedule a demo to see MicroForge in action with your specific equipment.
                </p>
                <a 
                  href="#"
                  className="inline-flex items-center justify-center py-2 px-4 rounded-md border border-neon-lime bg-neon-lime/10 text-neon-lime hover:bg-neon-lime/20 transition-all button-glow lime-glow"
                >
                  Book a Demo
                </a>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-8 hover:border-neon-orange/50 transition-all opacity-0 animate-fade-in-up delay-300">
                <div className="w-16 h-16 bg-neon-orange/10 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-2xl font-bold text-neon-orange">03</div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Partnership Opportunities</h2>
                <p className="text-gray-300 mb-6">
                  Interested in strategic partnerships, integrations, or investment opportunities? We're building an ecosystem of partners to reshape the future of manufacturing together.
                </p>
                <a 
                  href="#"
                  className="inline-flex items-center justify-center py-2 px-4 rounded-md border border-neon-orange bg-neon-orange/10 text-neon-orange hover:bg-neon-orange/20 transition-all button-glow orange-glow"
                >
                  Contact Us
                </a>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-8 hover:border-neon-cyan/50 transition-all opacity-0 animate-fade-in-up delay-400">
                <div className="w-16 h-16 bg-neon-cyan/10 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-2xl font-bold text-neon-cyan">04</div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Open Protocol Contributors</h2>
                <p className="text-gray-300 mb-6">
                  MicroForge is building an open protocol for machine communication and control. Join our community of developers and contribute to the future of manufacturing interoperability.
                </p>
                <a 
                  href="#"
                  className="inline-flex items-center justify-center py-2 px-4 rounded-md border border-neon-cyan bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-all button-glow cyan-glow"
                >
                  <Github size={20} className="mr-2" />
                  Join the Builder Forum
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8 opacity-0 animate-fade-in-up">
              Stay Updated
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
              Join our newsletter to receive updates on our progress, product launches, and insights into the future of manufacturing.
            </p>
            
            <div className="max-w-lg mx-auto opacity-0 animate-fade-in-up delay-200">
              <form className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow bg-dark border border-gray-800 rounded-md py-3 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-neon-cyan/10 border border-neon-cyan text-neon-cyan py-3 px-6 rounded-md hover:bg-neon-cyan/20 transition-all button-glow cyan-glow"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">We respect your privacy and will never share your information.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Connect Section */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-12 opacity-0 animate-fade-in-up">
              Connect With Us
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-0 animate-fade-in-up delay-100">
              <a 
                href="#" 
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 bg-dark-card border border-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:border-neon-cyan group-hover:bg-neon-cyan/5 transition-all">
                  <Twitter className="h-8 w-8 text-gray-400 group-hover:text-neon-cyan transition-all" />
                </div>
                <span className="text-gray-300 group-hover:text-neon-cyan transition-all">Twitter</span>
              </a>
              
              <a 
                href="#" 
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 bg-dark-card border border-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:border-neon-lime group-hover:bg-neon-lime/5 transition-all">
                  <Linkedin className="h-8 w-8 text-gray-400 group-hover:text-neon-lime transition-all" />
                </div>
                <span className="text-gray-300 group-hover:text-neon-lime transition-all">LinkedIn</span>
              </a>
              
              <a 
                href="#" 
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 bg-dark-card border border-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:border-neon-orange group-hover:bg-neon-orange/5 transition-all">
                  <Github className="h-8 w-8 text-gray-400 group-hover:text-neon-orange transition-all" />
                </div>
                <span className="text-gray-300 group-hover:text-neon-orange transition-all">GitHub</span>
              </a>
              
              <a 
                href="mailto:info@microforge.ai" 
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 bg-dark-card border border-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:border-neon-cyan group-hover:bg-neon-cyan/5 transition-all">
                  <Mail className="h-8 w-8 text-gray-400 group-hover:text-neon-cyan transition-all" />
                </div>
                <span className="text-gray-300 group-hover:text-neon-cyan transition-all">Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
