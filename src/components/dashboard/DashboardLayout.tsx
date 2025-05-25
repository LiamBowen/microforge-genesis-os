
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, LayoutGrid, Activity, Bot, Settings, LogOut, Menu, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock user and factory data - in real app this would come from auth context
  const user = { name: "John Doe", email: "john@example.com" };
  const factory = { name: "Factory Alpha" };

  // Mock notifications - in real app this would come from a notifications service
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      message: "ForgeBot-01 has completed job #1234",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false
    },
    {
      id: "2", 
      message: "CNC-Master requires maintenance check",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false
    },
    {
      id: "3",
      message: "New protocol uploaded successfully", 
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

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

  const handleNavigation = (route: string) => {
    navigate(route);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex w-64 xl:w-72 flex-col bg-dark border-r border-gray-800 transition-all duration-300`}>
        <div className="p-4 xl:p-6 flex items-center gap-3">
          <div className="w-8 h-8 xl:w-10 xl:h-10 relative">
            <div className="absolute inset-0 bg-neon-cyan rounded-md opacity-20 animate-pulse-glow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/b74af20b-1111-4c06-8b41-ce0fec9793a0.png" 
                alt="MicroForge Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
          <span className="text-lg xl:text-xl font-bold gradient-text">MicroForge</span>
        </div>
        
        <nav className="flex-1 px-3 xl:px-4 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.route}
              variant="ghost"
              className={`w-full justify-start mb-1 h-11 xl:h-12 text-sm xl:text-base ${
                window.location.pathname === item.route
                  ? "bg-neon-cyan/10 text-neon-cyan border-r-2 border-neon-cyan"
                  : "text-gray-400 hover:text-white hover:bg-dark-lighter"
              }`}
              onClick={() => handleNavigation(item.route)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </nav>
        
        <div className="p-4 xl:p-6 border-t border-gray-800">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-dark-lighter h-11 xl:h-12"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-dark border-r border-gray-800 z-50 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
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
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </Button>
        </div>
        
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.route}
              variant="ghost"
              className={`w-full justify-start mb-1 h-11 ${
                window.location.pathname === item.route
                  ? "bg-neon-cyan/10 text-neon-cyan"
                  : "text-gray-400 hover:text-white hover:bg-dark-lighter"
              }`}
              onClick={() => handleNavigation(item.route)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-dark-lighter h-11"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-dark border-b border-gray-800 p-4 flex justify-between items-center z-30 h-16">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="text-gray-400 hover:text-white"
        >
          <Menu size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 relative">
            <div className="absolute inset-0 bg-neon-cyan rounded-md opacity-20 animate-pulse-glow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/b74af20b-1111-4c06-8b41-ce0fec9793a0.png" 
                alt="MicroForge Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
          <span className="text-base font-bold gradient-text">MicroForge</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white">
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-dark border-gray-800" align="end">
              <div className="p-3">
                <h4 className="font-semibold mb-3">Notifications</h4>
                <ScrollArea className="h-64">
                  {notifications.length > 0 ? (
                    <div className="space-y-2">
                      {notifications.map((notification) => (
                        <Card key={notification.id} className="bg-dark-card border-gray-800">
                          <CardContent className="p-3">
                            <p className="text-sm text-gray-300">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatTimeAgo(notification.timestamp)}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2"></div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No notifications.</p>
                  )}
                </ScrollArea>
              </div>
            </PopoverContent>
          </Popover>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut size={18} />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-end p-4 xl:p-6 border-b border-gray-800 bg-dark">
          <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="text-right">
              <p className="text-xs text-gray-400">Logged in as</p>
              <p className="text-sm font-semibold text-white">{user.name}</p>
              <p className="text-xs text-gray-400">{factory.name}</p>
            </div>
            
            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white">
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-dark border-gray-800" align="end">
                <div className="p-3">
                  <h4 className="font-semibold mb-3">Notifications</h4>
                  <ScrollArea className="h-64">
                    {notifications.length > 0 ? (
                      <div className="space-y-2">
                        {notifications.map((notification) => (
                          <Card key={notification.id} className="bg-dark-card border-gray-800">
                            <CardContent className="p-3">
                              <p className="text-sm text-gray-300">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTimeAgo(notification.timestamp)}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2"></div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">No notifications.</p>
                    )}
                  </ScrollArea>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 xl:py-10 ${
            isMobile ? 'mt-16 mb-16' : 'mt-0'
          }`}>
            {children}
          </div>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-dark border-t border-gray-800 flex justify-around p-2 z-30 h-16">
          {sidebarItems.slice(0, 4).map((item) => (
            <Button
              key={item.route}
              variant="ghost"
              size="sm"
              className={`flex-1 px-2 py-3 flex flex-col items-center gap-1 ${
                window.location.pathname === item.route
                  ? "text-neon-cyan"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => handleNavigation(item.route)}
            >
              <span>{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
