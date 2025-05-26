
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const AgentStatusDisplay = () => {
  const [agentOnline, setAgentOnline] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const checkAgentStatus = async () => {
      try {
        // Check for recent agent pings across all user machines
        const { data: recentPings } = await supabase
          .from('machine_events')
          .select('created_at, machines!inner(*)')
          .eq('event_type', 'agent_ping')
          .eq('machines.user_id', user.id)
          .gte('created_at', new Date(Date.now() - 5 * 60 * 1000).toISOString()) // Last 5 minutes
          .limit(1);

        setAgentOnline(recentPings && recentPings.length > 0);
      } catch (error) {
        console.error('Error checking agent status:', error);
        setAgentOnline(false);
      }
    };

    // Check status immediately
    checkAgentStatus();

    // Set up periodic checks
    const interval = setInterval(checkAgentStatus, 30000); // Check every 30 seconds

    // Listen for real-time agent ping events
    const channel = supabase
      .channel('agent-status')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'machine_events',
          filter: 'event_type=eq.agent_ping'
        },
        () => {
          checkAgentStatus();
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (!user) return null;

  return (
    <div className="text-right">
      <p className="text-sm text-gray-300">
        Logged in as <span className="font-medium text-white">{user.email}</span>
      </p>
      <p className="text-sm text-gray-300">
        at <span className="font-medium text-white">Factory Alpha</span>
      </p>
      <div className="flex items-center justify-end gap-2 mt-1">
        <span className="text-sm text-gray-400">Agent:</span>
        <Badge 
          variant={agentOnline ? "default" : "destructive"}
          className={`${
            agentOnline 
              ? "bg-green-500/20 text-green-400 border-green-500/30" 
              : "bg-red-500/20 text-red-400 border-red-500/30"
          }`}
        >
          {agentOnline ? (
            <>
              <Wifi size={12} className="mr-1" />
              Online
            </>
          ) : (
            <>
              <WifiOff size={12} className="mr-1" />
              Offline
            </>
          )}
        </Badge>
      </div>
    </div>
  );
};

export default AgentStatusDisplay;
