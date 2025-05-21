
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Cpu, Activity, Bot, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  active: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
        active
          ? "bg-neon-cyan/10 text-neon-cyan"
          : "text-gray-400 hover:bg-dark-lighter hover:text-gray-100"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarItems = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Overview",
      href: "/dashboard",
    },
    {
      icon: <Cpu size={18} />,
      label: "Machines",
      href: "/dashboard/machines",
    },
    {
      icon: <Activity size={18} />,
      label: "Jobs",
      href: "/dashboard/jobs",
    },
    {
      icon: <Bot size={18} />,
      label: "AI Assistant",
      href: "/dashboard/ai",
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r border-gray-800 bg-dark-card">
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <Link to="/dashboard" className="flex items-center">
            <div className="w-9 h-9 relative mr-2">
              <div className="absolute inset-0 bg-neon-cyan rounded-md opacity-20 animate-pulse-glow"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-6 h-6 text-neon-cyan"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
            </div>
            <span className="text-xl font-bold gradient-text">MicroForge</span>
          </Link>
        </div>
        
        <div className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={
                currentPath === item.href ||
                (item.href !== "/dashboard" && currentPath.startsWith(item.href))
              }
            />
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-dark-lighter hover:text-gray-100">
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-gray-800 bg-dark z-10 flex items-center justify-between px-4">
        <Link to="/dashboard" className="flex items-center">
          <div className="w-8 h-8 relative mr-2">
            <div className="absolute inset-0 bg-neon-cyan rounded-md opacity-20 animate-pulse-glow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 text-neon-cyan"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
          </div>
          <span className="text-lg font-bold gradient-text">MicroForge</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8">
          {children}
        </main>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-dark-card">
        <div className="grid grid-cols-5 h-16">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-xs",
                currentPath === item.href ||
                (item.href !== "/dashboard" && currentPath.startsWith(item.href))
                  ? "text-neon-cyan"
                  : "text-gray-400"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
