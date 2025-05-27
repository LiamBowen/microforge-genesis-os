
import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
    };

    // Only add mouse move listener on desktop
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ 
        '--mouse-x': '0.5', 
        '--mouse-y': '0.5' 
      } as React.CSSProperties}
    >
      {/* Animated background gradient - only show on desktop */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-30 hidden md:block"
        style={{ 
          background: `radial-gradient(
            circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), 
            rgba(0, 255, 255, 0.15), 
            rgba(170, 255, 0, 0.05) 40%, 
            rgba(0, 0, 0, 0) 80%
          )` 
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
