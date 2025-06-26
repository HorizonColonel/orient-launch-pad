import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import WatchDemoPage from "./pages/WatchDemoPage";
import ScheduleDemoPage from "./pages/ScheduleDemoPage";
import AboutUsPage from "./pages/AboutUsPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import CompanyPage from "./pages/CompanyPage";
import MyTrainingPage from "./pages/MyTrainingPage";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import DocumentationPage from "./pages/DocumentationPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Dashboard routes with sidebar layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/my-training" element={<MyTrainingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/docs" element={<DocumentationPage />} />
          <Route path="/account-settings" element={<AccountSettingsPage />} />
        </Route>
        
        {/* Standalone routes */}
        <Route path="/watch-demo" element={<WatchDemoPage />} />
        <Route path="/schedule-demo" element={<ScheduleDemoPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
