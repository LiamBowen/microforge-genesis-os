
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, LayoutGrid, Activity, Bot, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would also clear auth tokens, etc.
    // For now, we'll just redirect to the login page
    navigate("/login");
  };

  const sidebarItems = [
    { label: "Overview", icon: <LayoutGrid size={18} />, route: "/dashboard" },
    { label: "Machines", icon: <Layout size={18} />, route: "/dashboard/machines" },
    { label: "Jobs", icon: <Activity size={18} />, route: "/dashboard/jobs" },
    { label: "AI Assistant", icon: <Bot size={18} />, route: "/dashboard/ai" },
    { label: "Settings", icon: <Settings size={18} />, route: "/dashboard/settings" },
  ];

  return (
    <div className="flex h-screen bg-dark">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-dark-darker border-r border-gray-800">
        <div className="p-4 flex items-center gap-2">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 bg-neon-cyan rounded-md opacity-20 animate-pulse-glow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/b74af20b-1111-4c06-8b41-ce0fec9793a0.png" 
                alt="MicroForge Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
          <span className="text-lg font-bold gradient-text">MicroForge</span>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.route}
              variant="ghost"
              className={`w-full justify-start mb-1 ${
                window.location.pathname === item.route
                  ? "bg-neon-cyan/10 text-neon-cyan"
                  : "text-gray-400 hover:text-white hover:bg-dark-lighter"
              }`}
              onClick={() => navigate(item.route)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-dark-lighter"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-dark-darker border-b border-gray-800 p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 bg-neon-cyan rounded-md opacity-20 animate-pulse-glow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/b74af20b-1111-4c06-8b41-ce0fec9793a0.png" 
                alt="MicroForge Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
          <span className="text-lg font-bold gradient-text">MicroForge</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-gray-400"
          onClick={handleLogout}
        >
          <LogOut size={18} />
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10 mt-16 md:mt-0">
          {children}
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-darker border-t border-gray-800 flex justify-around p-2 z-10">
        {sidebarItems.map((item) => (
          <Button
            key={item.route}
            variant="ghost"
            size="sm"
            className={`px-2 ${
              window.location.pathname === item.route
                ? "text-neon-cyan"
                : "text-gray-400"
            }`}
            onClick={() => navigate(item.route)}
          >
            <span>{item.icon}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DashboardLayout;
