
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const UserInfoSection = () => {
  // Mock user and factory data - in real app this would come from auth context
  const user = { name: "John Doe", email: "john@example.com" };
  const factory = { name: "Factory Alpha" };

  // Mock notifications - in real app this would come from a notifications service
  const notifications: Notification[] = [
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
  ];

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

  return (
    <div className="flex items-center gap-4">
      {/* User Info */}
      <div className="text-right">
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
  );
};

export default UserInfoSection;
