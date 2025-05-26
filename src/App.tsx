import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Auth Provider
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";

// Pages
import Index from "./pages/Index";
import Vision from "./pages/Vision";
import Product from "./pages/Product";
import UseCases from "./pages/UseCases";
import GetInvolved from "./pages/GetInvolved";
import EarlyAccess from "./pages/EarlyAccess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import MachinesPage from "./pages/dashboard/MachinesPage";
import JobsPage from "./pages/dashboard/JobsPage";
import AIAssistantPage from "./pages/dashboard/AIAssistantPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import AgentSetupPage from "./pages/dashboard/AgentSetupPage";
import AgentDevPage from "./pages/dashboard/AgentDevPage";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useNavigation } from "./hooks/useNavigation";

// Create a ScrollToTop component to ensure page scrolls to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Main layout component that handles showing/hiding navbar and footer
const AppLayout = () => {
  const { isDashboardRoute } = useNavigation();
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Show Navbar on all non-dashboard routes */}
      {!isDashboardRoute && <Navbar />}
      
      <main className={`flex-grow w-full ${!isDashboardRoute ? '' : 'p-0'}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/product" element={<Product />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/early-access" element={<EarlyAccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/machines" element={<ProtectedRoute><MachinesPage /></ProtectedRoute>} />
          <Route path="/dashboard/jobs" element={<ProtectedRoute><JobsPage /></ProtectedRoute>} />
          <Route path="/dashboard/ai" element={<ProtectedRoute><AIAssistantPage /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/dashboard/agent-setup" element={<ProtectedRoute><AgentSetupPage /></ProtectedRoute>} />
          <Route path="/dashboard/agent-dev" element={<ProtectedRoute><AgentDevPage /></ProtectedRoute>} />
          
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* Only show Footer on non-dashboard routes */}
      {!isDashboardRoute && <Footer />}
    </div>
  );
};

const App = () => {
  // Add viewport meta tag programmatically for better mobile support
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no');
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <div className="w-full min-h-screen">
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <AppLayout />
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
