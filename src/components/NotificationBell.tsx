
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertCircle, Info, Wifi, WifiOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Notification {
  id: string;
  type: 'job_started' | 'job_completed' | 'error' | 'agent_status';
  message: string;
  timestamp: string;
  read: boolean;
}

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'job_started',
      message: 'Job #214 started on CNC-01',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: '2', 
      type: 'agent_status',
      message: 'Agent offline for 2 mins',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: '3',
      type: 'job_completed',
      message: 'Job #215 completed',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      read: true
    }
  ]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job_started':
        return <Info size={16} className="text-blue-400" />;
      case 'job_completed':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-400" />;
      case 'agent_status':
        return <WifiOff size={16} className="text-yellow-400" />;
      default:
        return <Bell size={16} className="text-gray-400" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  // Set up real-time subscriptions for job and machine events
  useEffect(() => {
    if (!user) return;

    const jobsChannel = supabase
      .channel('notification-jobs')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jobs',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const job = payload.new as any;
          if (payload.eventType === 'UPDATE' && job) {
            let message = '';
            let type: Notification['type'] = 'job_started';
            
            if (job.status === 'running') {
              message = `Job "${job.name}" started`;
              type = 'job_started';
            } else if (job.status === 'completed') {
              message = `Job "${job.name}" completed successfully`;
              type = 'job_completed';
            } else if (job.status === 'error') {
              message = `Job "${job.name}" failed: ${job.error_message}`;
              type = 'error';
            }

            if (message) {
              const newNotification: Notification = {
                id: `job-${job.id}-${Date.now()}`,
                type,
                message,
                timestamp: new Date().toISOString(),
                read: false
              };
              
              setNotifications(prev => [newNotification, ...prev].slice(0, 50));
            }
          }
        }
      )
      .subscribe();

    const eventsChannel = supabase
      .channel('notification-events')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'machine_events'
        },
        (payload) => {
          const event = payload.new as any;
          if (event.event_type === 'error' || event.event_type === 'agent_ping') {
            const newNotification: Notification = {
              id: `event-${event.id}`,
              type: event.event_type === 'error' ? 'error' : 'agent_status',
              message: event.message,
              timestamp: new Date().toISOString(),
              read: false
            };
            
            setNotifications(prev => [newNotification, ...prev].slice(0, 50));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(jobsChannel);
      supabase.removeChannel(eventsChannel);
    };
  }, [user]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-dark-card border-gray-800" align="end">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs text-gray-400 hover:text-white"
            >
              Mark all read
            </Button>
          )}
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800/50 ${
                  !notification.read ? 'bg-blue-500/5' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!notification.read ? 'text-white font-medium' : 'text-gray-300'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTimestamp(notification.timestamp)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
