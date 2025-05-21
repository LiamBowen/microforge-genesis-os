
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import Vision from "./pages/Vision";
import Product from "./pages/Product";
import UseCases from "./pages/UseCases";
import GetInvolved from "./pages/GetInvolved";
import EarlyAccess from "./pages/EarlyAccess";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import MachinesPage from "./pages/dashboard/MachinesPage";
import JobsPage from "./pages/dashboard/JobsPage";
import AIAssistantPage from "./pages/dashboard/AIAssistantPage";
import SettingsPage from "./pages/dashboard/SettingsPage";

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

const queryClient = new QueryClient();

// Main layout component that handles showing/hiding navbar and footer
const AppLayout = () => {
  const { isDashboardRoute } = useNavigation();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Show Navbar on all non-dashboard routes */}
      {!isDashboardRoute && <Navbar />}
      
      <main className={`flex-grow ${!isDashboardRoute ? '' : 'p-0'}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/product" element={<Product />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/early-access" element={<EarlyAccess />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/machines" element={<MachinesPage />} />
          <Route path="/dashboard/jobs" element={<JobsPage />} />
          <Route path="/dashboard/ai" element={<AIAssistantPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AppLayout />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
