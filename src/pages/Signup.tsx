
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Key, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    
    try {
      const { error } = await signUp(values.email, values.password);
      
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-dark-card rounded-lg border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center text-neon-cyan hover:text-neon-cyan/80 transition">
            <ArrowLeft size={20} className="mr-1" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neon-lime/10 text-neon-lime mb-4">
            <UserPlus size={24} />
          </div>
          <h1 className="text-2xl font-bold">Join MicroForge</h1>
          <p className="mt-2 text-gray-400">Create your account to get started</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="you@example.com" 
                        type="email" 
                        className="bg-dark-lighter border-gray-700" 
                        {...field} 
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <Mail size={16} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        className="bg-dark-lighter border-gray-700" 
                        {...field} 
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <Key size={16} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        className="bg-dark-lighter border-gray-700" 
                        {...field} 
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <Key size={16} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-neon-lime/20 text-neon-lime hover:bg-neon-lime/30 border border-neon-lime/30"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-neon-lime hover:text-neon-lime/80">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
