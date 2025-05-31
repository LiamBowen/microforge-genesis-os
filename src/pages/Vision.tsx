
const Vision = () => {
  return (
    <div className="pt-16 bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-hero-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 opacity-0 animate-fade-in-up">
              <span className="gradient-text text-5xl md:text-6xl font-bold">The Future of Manufacturing Is Autonomous</span>
            </h1>
          </div>
        </div>
      </section>
      
      {/* Vision Content */}
      <section className="py-24 bg-dark-lighter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-lg text-gray-300 opacity-0 animate-fade-in-up delay-100">
              <p>
                We believe the next industrial revolution will be driven by small, intelligent factories — not giant centralized plants.
              </p>
              
              <p>
                MicroForge gives every team the tools to build faster, smarter, and with full autonomy.
              </p>
              
              <p>
                Our mission is to bring autonomous manufacturing to everyone — starting with the innovators building tomorrow's physical world.
              </p>
            </div>
            
            {/* Quote Box */}
            <div className="mt-16 bg-dark-card border-l-4 border-neon-cyan p-8 opacity-0 animate-fade-in-up delay-200">
              <blockquote className="text-xl italic text-gray-300 mb-4">
                "Modern machines are capable of incredible things — but they're stuck behind broken workflows. MicroForge is here to fix that."
              </blockquote>
              <cite className="text-neon-cyan font-medium">— Founder, MicroForge</cite>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vision;
