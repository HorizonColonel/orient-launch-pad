
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
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
        <Route path="/watch-demo" element={<WatchDemoPage />} />
        <Route path="/schedule-demo" element={<ScheduleDemoPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        
        {/* Dashboard routes with sidebar layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="/my-training" element={<DashboardLayout />}>
          <Route index element={<MyTrainingPage />} />
        </Route>
        <Route path="/profile" element={<DashboardLayout />}>
          <Route index element={<ProfilePage />} />
        </Route>
        <Route path="/company" element={<DashboardLayout />}>
          <Route index element={<CompanyPage />} />
        </Route>
        <Route path="/help" element={<DashboardLayout />}>
          <Route index element={<HelpCenterPage />} />
        </Route>
        <Route path="/docs" element={<DashboardLayout />}>
          <Route index element={<DocumentationPage />} />
        </Route>
        <Route path="/account-settings" element={<DashboardLayout />}>
          <Route index element={<AccountSettingsPage />} />
        </Route>
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <ErrorBoundary>
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
  </ErrorBoundary>
);

export default App;
