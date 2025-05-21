
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: 'cyan' | 'lime' | 'orange';
  delay?: string;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color = 'cyan',
  delay = ''
}: FeatureCardProps) => {
  const colorClasses = {
    cyan: 'border-neon-cyan/20 hover:border-neon-cyan/50 bg-neon-cyan/5',
    lime: 'border-neon-lime/20 hover:border-neon-lime/50 bg-neon-lime/5',
    orange: 'border-neon-orange/20 hover:border-neon-orange/50 bg-neon-orange/5',
  };
  
  const textColorClasses = {
    cyan: 'text-neon-cyan',
    lime: 'text-neon-lime',
    orange: 'text-neon-orange',
  };

  return (
    <div 
      className={`border ${colorClasses[color]} rounded-lg p-6 transition-all duration-300 opacity-0 animate-fade-in-up ${delay}`}
    >
      <div className={`inline-flex items-center justify-center p-2 rounded-md ${colorClasses[color]} mb-4`}>
        <Icon className={`${textColorClasses[color]} h-6 w-6`} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
