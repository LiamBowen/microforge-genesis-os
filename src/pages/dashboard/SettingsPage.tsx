import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  User, 
  Factory, 
  Shield, 
  Plug, 
  Key, 
  CreditCard, 
  Users, 
  Bell, 
  FileText,
  Camera,
  Settings,
  CheckCircle,
  XCircle,
  Copy,
  LogOut,
  Download,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const accountFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
});

const factoryFormSchema = z.object({
  factoryName: z.string().min(1, "Factory name is required"),
  location: z.string().optional(),
  timezone: z.string().min(1, "Timezone is required"),
  defaultConfig: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;
type FactoryFormValues = z.infer<typeof factoryFormSchema>;

const SettingsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    machineStarted: true,
    protocolFailed: true,
    deploymentCompleted: false,
  });
  const { toast } = useToast();

  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "John Smith",
      email: "john@example.com",
    },
  });

  const factoryForm = useForm<FactoryFormValues>({
    resolver: zodResolver(factoryFormSchema),
    defaultValues: {
      factoryName: "Main Workshop",
      location: "London",
      timezone: "Europe/London",
      defaultConfig: "",
    },
  });

  const onAccountSubmit = async (values: AccountFormValues) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Account updated:", values);
      toast({
        title: "Account updated",
        description: "Your account information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your account.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFactorySubmit = async (values: FactoryFormValues) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Factory settings updated:", values);
      toast({
        title: "Factory settings updated",
        description: "Your factory configuration has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your factory settings.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The API key has been copied to your clipboard.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-1">Settings</h1>
          <p className="text-gray-400">Configure your account and factory preferences.</p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid grid-cols-9 w-full bg-gray-900 p-1">
            <TabsTrigger value="account" className="flex items-center gap-2 data-[state=active]:bg-gray-800">
              <User size={16} />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="factory" className="flex items-center gap-2 data-[state=active]:bg-gray-800">
              <Factory size={16} />
              <span className="hidden sm:inline">Factory</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-gray-800">
              <Shield size={16} />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2 data-[state=active]:bg-gray-800">
              <Plug size={16} />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2 data-[state=active]:bg-gray-800">
              <Key size={16} />
              <span className="hidden sm:inline">API</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2 data-[state=active]:bg-gray-800">
              <CreditCard size={16} />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2 data-[state=active]:bg-gray-800">
              <Users size={16} />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-gray-800">
              <Bell size={16} />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center gap-2 data-[state=active]:bg-gray-800">
              <FileText size={16} />
              <span className="hidden sm:inline">Legal</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User size={20} />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gray-700 text-white text-lg">JS</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="border-gray-700">
                    <Camera size={16} className="mr-2" />
                    Change Photo
                  </Button>
                </div>
                
                <Form {...accountForm}>
                  <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-4">
                    <FormField
                      control={accountForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input className="bg-dark-lighter border-gray-700" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={accountForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              className="bg-dark-lighter border-gray-700" 
                              {...field}
                              disabled 
                            />
                          </FormControl>
                          <p className="text-xs text-gray-500">Email cannot be changed once verified</p>
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="bg-neon-lime/20 text-neon-lime hover:bg-neon-lime/30 border border-neon-lime/30"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </Form>

                <Separator className="bg-gray-700" />
                
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold">Password</h4>
                  <Button variant="outline" className="border-gray-700">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Factory Tab */}
          <TabsContent value="factory" className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Factory size={20} />
                  Factory Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...factoryForm}>
                  <form onSubmit={factoryForm.handleSubmit(onFactorySubmit)} className="space-y-6">
                    <FormField
                      control={factoryForm.control}
                      name="factoryName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Factory Name</FormLabel>
                          <FormControl>
                            <Input className="bg-dark-lighter border-gray-700" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={factoryForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              className="bg-dark-lighter border-gray-700" 
                              placeholder="e.g. London, Remote"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={factoryForm.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timezone</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="bg-dark-lighter border-gray-700">
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                              <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                              <SelectItem value="America/Los_Angeles">America/Los_Angeles (PST)</SelectItem>
                              <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <div className="space-y-3">
                      <FormLabel>Factory ID</FormLabel>
                      <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-md border border-gray-700">
                        <code className="text-gray-400 text-sm font-mono">factory-uuid-12345</code>
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300">Read Only</Badge>
                      </div>
                    </div>
                    
                    <FormField
                      control={factoryForm.control}
                      name="defaultConfig"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Machine Configuration (JSON)</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="bg-dark-lighter border-gray-700 font-mono text-sm"
                              placeholder='{"timeout": 300, "retries": 3}'
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                          <p className="text-xs text-gray-500">Optional base configuration for new machines</p>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="bg-neon-lime/20 text-neon-lime hover:bg-neon-lime/30 border border-neon-lime/30"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Factory Settings"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield size={20} />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Sessions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Current Session</p>
                        <p className="text-xs text-gray-400">Chrome on MacOS • London, UK</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Previous Session</p>
                        <p className="text-xs text-gray-400">Mobile App • 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-700">
                        <LogOut size={14} className="mr-2" />
                        Log out
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="space-y-3">
                  <Button variant="destructive">
                    <LogOut size={16} className="mr-2" />
                    Sign out of all devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Plug size={20} />
                  Third-Party Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                      <Settings size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium">GitHub</h4>
                      <p className="text-sm text-gray-400">Connect your repositories</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-500" />
                    <Button variant="outline" size="sm" className="border-gray-700">
                      Disconnect
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                      <Bell size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium">Slack</h4>
                      <p className="text-sm text-gray-400">Get notifications in your workspace</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <XCircle size={16} className="text-gray-500" />
                    <Button variant="outline" size="sm" className="border-gray-700">
                      Connect
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                      <Plug size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium">Zapier</h4>
                      <p className="text-sm text-gray-400">Automate workflows</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-gray-700 text-gray-400">Coming Soon</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Key size={20} />
                  API Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Public API Key</h4>
                  <div className="flex items-center gap-3">
                    <Input 
                      value="pk_live_abc123def456" 
                      readOnly 
                      className="bg-dark-lighter border-gray-700 font-mono text-sm"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gray-700"
                      onClick={() => copyToClipboard("pk_live_abc123def456")}
                    >
                      <Copy size={14} />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Secret API Key</h4>
                  <div className="flex items-center gap-3">
                    <Input 
                      value="sk_live_••••••••••••••••" 
                      readOnly 
                      className="bg-dark-lighter border-gray-700 font-mono text-sm"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gray-700"
                      onClick={() => copyToClipboard("sk_live_xyz789uvw012")}
                    >
                      <Copy size={14} />
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-500 text-red-400">
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Rate Limits</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Requests per minute</p>
                      <p className="font-medium">100</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Daily limit</p>
                      <p className="font-medium">10,000</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Webhook Endpoints</h4>
                  <Input 
                    placeholder="https://your-app.com/webhooks/microforge"
                    className="bg-dark-lighter border-gray-700"
                  />
                  <Button variant="outline" className="border-gray-700">
                    Add Endpoint
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CreditCard size={20} />
                  Billing & Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border border-green-500/30 bg-green-500/10 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle size={20} className="text-green-500" />
                    <h4 className="font-medium text-green-400">Pilot Access</h4>
                  </div>
                  <p className="text-sm text-gray-300">You're currently on our pilot program with full access to all features.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Current Plan</p>
                    <p className="font-medium">Free / Pilot Access</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Billing Contact</p>
                    <p className="font-medium">john@example.com</p>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="text-center py-6">
                  <Button disabled className="bg-gray-700 text-gray-400 cursor-not-allowed">
                    <CreditCard size={16} className="mr-2" />
                    Upgrade Plan (Coming Soon)
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Paid plans will be available soon with enhanced features</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users size={20} />
                  Team Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-3">
                  <Input 
                    placeholder="teammate@company.com"
                    className="bg-dark-lighter border-gray-700"
                  />
                  <Button className="bg-neon-lime/20 text-neon-lime hover:bg-neon-lime/30 border border-neon-lime/30">
                    Invite Member
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Team Members</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gray-700">JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Smith</p>
                          <p className="text-sm text-gray-400">john@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-neon-lime/20 text-neon-lime">Owner</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-700 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">Team collaboration features coming soon</p>
                  <p className="text-xs text-gray-500 mt-1">Invite team members, assign roles, and manage permissions</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Bell size={20} />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Machine Started</h4>
                    <p className="text-sm text-gray-400">Get notified when a machine starts running</p>
                  </div>
                  <Switch
                    checked={notifications.machineStarted}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, machineStarted: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Protocol Failed</h4>
                    <p className="text-sm text-gray-400">Get notified when a protocol execution fails</p>
                  </div>
                  <Switch
                    checked={notifications.protocolFailed}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, protocolFailed: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Deployment Completed</h4>
                    <p className="text-sm text-gray-400">Get notified when a deployment finishes</p>
                  </div>
                  <Switch
                    checked={notifications.deploymentCompleted}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, deploymentCompleted: checked }))
                    }
                  />
                </div>

                <div className="pt-4">
                  <Button className="bg-neon-lime/20 text-neon-lime hover:bg-neon-lime/30 border border-neon-lime/30">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Legal Tab */}
          <TabsContent value="legal" className="space-y-6">
            <Card className="bg-dark-card border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText size={20} />
                  Legal & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                    <span className="font-medium">Privacy Policy</span>
                    <Link to="/privacy">
                      <Button variant="outline" size="sm" className="border-gray-700">
                        View
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                    <span className="font-medium">Terms of Service</span>
                    <Link to="/terms">
                      <Button variant="outline" size="sm" className="border-gray-700">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Privacy Policy Content */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Privacy Policy</h4>
                  <p className="text-sm text-gray-400 mb-4">Last updated: May 24, 2025</p>

                  <div className="space-y-4 text-gray-400 leading-relaxed text-sm">
                    <p>
                      MicroForge respects your privacy. We only collect data necessary to provide and improve our platform.
                      We do not sell or share your information with third parties.
                    </p>

                    <ul className="list-disc ml-6 space-y-2">
                      <li>We collect basic analytics to understand usage (via anonymized tools).</li>
                      <li>All data is encrypted and securely stored.</li>
                      <li>You may request your data or account deletion at any time.</li>
                    </ul>

                    <p>
                      For any questions, email us at{" "}
                      <a 
                        href="mailto:privacy@microforge.com" 
                        className="text-neon-cyan hover:text-neon-lime underline transition-colors"
                      >
                        privacy@microforge.com
                      </a>.
                    </p>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                {/* Terms of Service Content */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Terms of Use</h4>
                  <p className="text-sm text-gray-400 mb-4">Last updated: May 24, 2025</p>

                  <div className="space-y-4 text-gray-400 leading-relaxed text-sm">
                    <p>
                      By accessing or using MicroForge, you agree to the following terms:
                    </p>

                    <ul className="list-disc ml-6 space-y-2">
                      <li>You are responsible for how you use the platform.</li>
                      <li>MicroForge is provided "as is" without warranties of any kind.</li>
                      <li>We are not liable for any damages resulting from use of the platform.</li>
                      <li>You may not reverse-engineer, resell, or exploit any part of the service.</li>
                    </ul>

                    <p>
                      For legal inquiries, contact{" "}
                      <a 
                        href="mailto:legal@microforge.com" 
                        className="text-neon-cyan hover:text-neon-lime underline transition-colors"
                      >
                        legal@microforge.com
                      </a>.
                    </p>
                  </div>
                </div>

                <div className="p-4 border border-blue-500/30 bg-blue-500/10 rounded-lg">
                  <h4 className="font-medium text-blue-400 mb-2">Data Usage Information</h4>
                  <p className="text-sm text-gray-300">
                    MicroForge does not share or sell your data. All factory data remains encrypted and owned by you.
                    We use industry-standard security measures to protect your information.
                  </p>
                </div>

                <Separator className="bg-gray-700" />

                <div className="space-y-4">
                  <h4 className="font-medium">Data Management</h4>
                  <div className="flex gap-3">
                    <Button variant="outline" className="border-gray-700">
                      <Download size={16} className="mr-2" />
                      Request Data Export
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle size={20} className="text-red-400" />
                    <h4 className="font-medium text-red-400">Danger Zone</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">
                    Once you delete your account, there is no going back. This will permanently delete your account and all associated data.
                  </p>
                  <Button variant="destructive">
                    <Trash2 size={16} className="mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
