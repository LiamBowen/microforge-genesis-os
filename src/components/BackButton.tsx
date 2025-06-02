
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-400 hover:text-neon-cyan transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
      </div>
    </div>
  );
};

export default BackButton;
