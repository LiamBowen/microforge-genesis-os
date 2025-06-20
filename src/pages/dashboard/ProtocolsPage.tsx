
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateProtocolDialog from "@/components/CreateProtocolDialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { FileText, Trash2, Edit, Calendar } from "lucide-react";

interface Protocol {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  configuration: any;
}

const ProtocolCard = React.memo(({ protocol, onDelete }: { protocol: Protocol; onDelete: (id: string) => void }) => {
  const handleDelete = useCallback(() => {
    onDelete(protocol.id);
  }, [onDelete, protocol.id]);

  const formattedDate = useMemo(() => 
    new Date(protocol.created_at).toLocaleDateString(),
    [protocol.created_at]
  );

  return (
    <Card className="bg-dark-card border-gray-800">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText size={20} className="text-neon-lime" />
          <CardTitle className="text-lg">{protocol.name}</CardTitle>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar size={16} />
          {formattedDate}
        </div>
      </CardHeader>
      <CardContent>
        {protocol.description && (
          <p className="text-sm text-gray-400">{protocol.description}</p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-700"
        >
          <Edit size={16} className="mr-1" />
          Edit
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={handleDelete}
        >
          <Trash2 size={16} className="mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
});

ProtocolCard.displayName = 'ProtocolCard';

const ProtocolsPage = () => {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchProtocols = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('protocols')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching protocols:', error);
        toast({
          title: "Error",
          description: "Failed to fetch protocols",
          variant: "destructive",
        });
        return;
      }

      setProtocols(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch protocols",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const deleteProtocol = useCallback(async (protocolId: string) => {
    try {
      const { error } = await supabase
        .from('protocols')
        .delete()
        .eq('id', protocolId);

      if (error) {
        console.error('Error deleting protocol:', error);
        toast({
          title: "Error",
          description: "Failed to delete protocol",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Protocol deleted successfully",
      });

      fetchProtocols();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to delete protocol",
        variant: "destructive",
      });
    }
  }, [fetchProtocols, toast]);

  useEffect(() => {
    fetchProtocols();
  }, [fetchProtocols]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Protocols</h1>
            <p className="text-gray-400">Manage your protocol configurations.</p>
          </div>
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Protocols</h2>
              <Skeleton className="h-10 w-32 rounded" />
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-lg" />
              ))}
            </div>
          </section>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Protocols</h1>
          <p className="text-gray-400">Manage your protocol configurations and deploy them to machines.</p>
        </div>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Protocols</h2>
            <CreateProtocolDialog onCreateProtocol={fetchProtocols} />
          </div>
          
          {protocols.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p>No protocols found. Create your first protocol to get started.</p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {protocols.map((protocol) => (
                <ProtocolCard
                  key={protocol.id}
                  protocol={protocol}
                  onDelete={deleteProtocol}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ProtocolsPage;
