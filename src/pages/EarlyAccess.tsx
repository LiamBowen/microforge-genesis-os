import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

const EarlyAccess = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    machineTypes: "",
    hearAboutUs: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  return (
    <div className="pt-16 bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-hero-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 opacity-0 animate-fade-in-up">
              <span className="gradient-text">Join the Next</span>
              <span className="block mt-2">Industrial Revolution</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
              Get priority access to our pilot program and help shape the future of manufacturing.
            </p>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-16 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-200">
              {!isSubmitted ? (
                <>
                  <h2 className="text-2xl font-bold mb-6">Request Early Access</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-dark border border-gray-800 rounded-md py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-dark border border-gray-800 rounded-md py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                          Company *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full bg-dark border border-gray-800 rounded-md py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="machineTypes" className="block text-sm font-medium text-gray-300 mb-1">
                          Machine Types *
                        </label>
                        <input
                          type="text"
                          id="machineTypes"
                          name="machineTypes"
                          required
                          value={formData.machineTypes}
                          onChange={handleChange}
                          placeholder="e.g., 3D printers, CNC mills, lasers"
                          className="w-full bg-dark border border-gray-800 rounded-md py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray-300 mb-1">
                        How did you hear about us? *
                      </label>
                      <select
                        id="hearAboutUs"
                        name="hearAboutUs"
                        required
                        value={formData.hearAboutUs}
                        onChange={handleChange}
                        className="w-full bg-dark border border-gray-800 rounded-md py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                      >
                        <option value="">Select an option</option>
                        <option value="search">Google/Search</option>
                        <option value="social">Social Media</option>
                        <option value="referral">Friend/Colleague</option>
                        <option value="industry">Industry Event</option>
                        <option value="press">Press/Media</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-6 text-center">
                      Limited spots available in our early access cohort.
                    </p>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        inline-flex items-center justify-center 
                        py-3 px-6 rounded-md 
                        border border-neon-cyan
                        bg-neon-cyan/10 text-neon-cyan
                        transition-all duration-300 
                        hover:bg-neon-cyan/20
                        disabled:opacity-50 disabled:cursor-not-allowed
                        button-glow cyan-glow
                        w-full
                      `}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight size={20} className="ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-neon-cyan/10 rounded-full flex items-center justify-center mb-6">
                    <Check className="h-8 w-8 text-neon-cyan" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Thanks!</h2>
                  <p className="text-gray-300 mb-6">
                    We'll be in touch soon. Your MicroForge journey is about to begin.
                  </p>
                  <p className="text-gray-400">
                    While you wait, check out our <a href="/vision" className="text-neon-cyan hover:underline">vision</a> and <a href="/product" className="text-neon-cyan hover:underline">product details</a> to learn more.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">
              Early Access Benefits
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6 opacity-0 animate-fade-in-up delay-100">
                <div className="w-12 h-12 bg-neon-cyan/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-xl font-bold text-neon-cyan">1</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Priority Implementation</h3>
                <p className="text-gray-400">
                  Be among the first to deploy MicroForge and gain a competitive advantage in your industry.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6 opacity-0 animate-fade-in-up delay-200">
                <div className="w-12 h-12 bg-neon-lime/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-xl font-bold text-neon-lime">2</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Shape the Product</h3>
                <p className="text-gray-400">
                  Direct input into feature development and influence the platform's evolution.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6 opacity-0 animate-fade-in-up delay-300">
                <div className="w-12 h-12 bg-neon-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-xl font-bold text-neon-orange">3</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Preferred Pricing</h3>
                <p className="text-gray-400">
                  Access to exclusive early adopter pricing plans that will be grandfathered as we scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-16 opacity-0 animate-fade-in-up">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8 opacity-0 animate-fade-in-up delay-100">
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Can my machine connect directly via Wi-Fi?</h3>
                <p className="text-gray-300">
                  Yes, if your machine supports direct HTTP/websocket connection, you can skip the Agent. Setup instructions coming soon.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">What is the MicroForge Agent?</h3>
                <p className="text-gray-300">
                  A lightweight bridge app that connects your offline machines to the cloud, securely.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Do I need the internet?</h3>
                <p className="text-gray-300">
                  Yes for cloud version. An on-premise version is coming soon.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">When will MicroForge be available?</h3>
                <p className="text-gray-300">
                  We're launching our pilot program in Q3 2024, with general availability planned for early 2025. Early access partners will begin onboarding in phases starting later this year.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">What kinds of machines does MicroForge support?</h3>
                <p className="text-gray-300">
                  Our initial release supports common CNC mills, 3D printers (FDM and SLA), and laser cutters from major manufacturers. We're rapidly expanding our compatibility list and can prioritize specific machines for early access partners.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Is MicroForge cloud-only or can it run on-premise?</h3>
                <p className="text-gray-300">
                  We offer both cloud-based and on-premise deployment options. For organizations with sensitive data or security requirements, our on-premise solution provides all the functionality without external dependencies.
                </p>
              </div>
              
              <div className="bg-dark-card border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">How does the pricing model work?</h3>
                <p className="text-gray-300">
                  MicroForge is offered as a subscription service with tiers based on the number of connected machines and usage volume. Early access partners receive preferential pricing that will be maintained as we scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EarlyAccess;
