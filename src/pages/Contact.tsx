
const Contact = () => {
  return (
    <div className="min-h-screen bg-dark text-white pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-hero-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 opacity-0 animate-fade-in-up">
              <span className="gradient-text text-5xl md:text-6xl font-bold">Join Our Pilot Program</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-100">
              We're working closely with a handful of early partners to shape the future of autonomous production.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 opacity-0 animate-fade-in-up delay-200">
              <h2 className="text-2xl font-bold mb-4">Think MicroForge could be a fit for your team?</h2>
              <p className="text-gray-400">
                Reach out at{" "}
                <a 
                  href="mailto:hello@microforge.dev" 
                  className="text-neon-cyan hover:text-neon-lime underline transition-colors"
                >
                  hello@microforge.dev
                </a>
                {" "}or apply below.
              </p>
            </div>

            <form className="space-y-6 bg-dark-card border border-gray-800 rounded-lg p-8 opacity-0 animate-fade-in-up delay-300">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="machines" className="block text-sm font-medium text-gray-300 mb-2">
                  What machines do you use?
                </label>
                <textarea
                  id="machines"
                  name="machines"
                  rows={3}
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                  placeholder="e.g., 3D printers, CNCs, sensors..."
                ></textarea>
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-2">
                  Why does this interest you?
                </label>
                <textarea
                  id="interest"
                  name="interest"
                  rows={4}
                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                  placeholder="Tell us about your use case..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-md bg-neon-cyan/10 text-neon-cyan border border-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300 button-glow cyan-glow font-medium"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
