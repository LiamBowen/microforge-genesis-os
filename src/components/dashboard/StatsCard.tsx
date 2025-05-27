
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "alert";
  showTooltip?: boolean;
  tooltipText?: string;
}

const StatsCard = ({ label, value, change, trend, showTooltip, tooltipText }: StatsCardProps) => {
  return (
    <Card className="bg-dark-card border-gray-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-400">{label}</p>
          {showTooltip && tooltipText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-xs text-white">?</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <h3 className={`text-3xl font-bold ${
          trend === "alert" ? "text-red-400" : "text-white"
        }`}>
          {value}
        </h3>
        <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              trend === "up" ? "bg-green-500" : 
              trend === "alert" ? "bg-red-500" : "bg-gray-600"
            }`}
            style={{ width: `${Math.random() * 60 + 20}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">{change}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
