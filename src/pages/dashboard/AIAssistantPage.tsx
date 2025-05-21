
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Bot, SendHorizonalIcon, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I'm your AI Factory Assistant. Ask me to generate G-code, schedule jobs, or troubleshoot machines.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    
    try {
      // Simulate API call to AI service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample responses based on input keywords
      let response = "I'm not sure how to help with that. Could you provide more details about what you need?";
      
      if (userMessage.toLowerCase().includes("g-code")) {
        response = "I can help generate G-code for your project. To start, please specify the dimensions and type of part you're trying to create.";
      } else if (userMessage.toLowerCase().includes("schedule")) {
        response = "I can help optimize your job scheduling. Based on your current queue, I recommend processing the bracket job next as it has the shortest completion time.";
      } else if (userMessage.toLowerCase().includes("error") || userMessage.toLowerCase().includes("troubleshoot")) {
        response = "I see the LaserCutter-X is reporting an alignment fault. This typically happens when the beam calibration is off. Try running the calibration routine from the maintenance menu.";
      }
      
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Could not connect to the AI service. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">AI Assistant</h1>
          <p className="text-gray-400">Get help with your manufacturing operations.</p>
        </div>

        <section className="h-[calc(100vh-200px)] flex flex-col">
          <Card className="bg-dark-card border-gray-800 flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot size={20} className="text-neon-cyan" />
                AI Lab Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-3/4 rounded-lg p-3 ${
                        message.role === "user" 
                          ? "bg-neon-lime/10 border border-neon-lime/20"
                          : "bg-neon-cyan/10 border border-neon-cyan/20"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.role === "user" ? (
                          <>
                            <span className="font-medium">You</span>
                            <User size={14} className="text-neon-lime" />
                          </>
                        ) : (
                          <>
                            <span className="font-medium">AI Assistant</span>
                            <Bot size={14} className="text-neon-cyan" />
                          </>
                        )}
                      </div>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-3/4 rounded-lg p-3 bg-neon-cyan/10 border border-neon-cyan/20">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">AI Assistant</span>
                        <Bot size={14} className="text-neon-cyan" />
                      </div>
                      <div className="flex gap-1 mt-2">
                        <div className="w-2 h-2 rounded-full bg-neon-cyan/50 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-neon-cyan/50 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-neon-cyan/50 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask the assistant..."
                  className="bg-dark-lighter border-gray-700"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isLoading) {
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 border border-neon-cyan/30"
                >
                  <SendHorizonalIcon size={18} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistantPage;
