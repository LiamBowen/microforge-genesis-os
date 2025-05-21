
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface RequestAccessButtonProps {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  variant?: "cyan" | "lime" | "orange";
  text?: string;
}

const RequestAccessButton = ({ 
  size = "md", 
  fullWidth = false, 
  variant = "cyan",
  text = "Request Access"
}: RequestAccessButtonProps) => {
  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-3 px-6 text-lg"
  };
  
  const variantClasses = {
    cyan: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan cyan-glow",
    lime: "bg-neon-lime/10 text-neon-lime border-neon-lime lime-glow",
    orange: "bg-neon-orange/10 text-neon-orange border-neon-orange orange-glow"
  };

  return (
    <Link
      to="/early-access"
      className={`
        inline-flex items-center justify-center 
        rounded-md border
        transition-all duration-300 
        button-glow
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        hover:bg-neon-${variant}/20
      `}
    >
      {text}
      <ArrowRight size={size === "sm" ? 16 : 20} className="ml-2" />
    </Link>
  );
};

export default RequestAccessButton;
