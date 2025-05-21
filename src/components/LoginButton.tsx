
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

interface LoginButtonProps {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  text?: string;
}

const LoginButton = ({ 
  size = "md", 
  fullWidth = false,
  text = "Login"
}: LoginButtonProps) => {
  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-3 px-6 text-lg"
  };

  return (
    <Link
      to="/login"
      className={`
        inline-flex items-center justify-center 
        rounded-md border border-neon-lime/30
        bg-neon-lime/10 text-neon-lime
        transition-all duration-300 
        hover:bg-neon-lime/20
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
      `}
    >
      {text}
      <LogIn size={size === "sm" ? 16 : 20} className="ml-2" />
    </Link>
  );
};

export default LoginButton;
