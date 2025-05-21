
interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const TestimonialCard = ({ quote, name, role, company }: TestimonialCardProps) => {
  return (
    <div className="bg-dark-card border border-gray-800 rounded-lg p-6 opacity-0 animate-fade-in-up">
      <div className="mb-4 text-neon-cyan">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.667 13.333H5.33366C5.33366 8 10.667 6.66667 10.667 6.66667C10.667 10.6667 13.3337 13.333 13.3337 13.333V24H2.66699V13.333H10.667Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M26.6667 13.333H21.3334C21.3334 8 26.6667 6.66667 26.6667 6.66667C26.6667 10.6667 29.3334 13.333 29.3334 13.333V24H18.6667V13.333H26.6667Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="text-gray-300 mb-6">{quote}</p>
      <div className="border-t border-gray-800 pt-4">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-400">{role}, {company}</div>
      </div>
    </div>
  );
};

export default TestimonialCard;
