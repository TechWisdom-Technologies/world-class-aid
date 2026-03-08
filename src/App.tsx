import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUniversities from "./pages/admin/AdminUniversities";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminAccommodations from "./pages/admin/AdminAccommodations";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminSettings from "./pages/admin/AdminSettings";
import PartnerDashboard from "./pages/PartnerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="universities" element={<AdminUniversities />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="accommodations" element={<AdminAccommodations />} />
            <Route path="partners" element={<AdminPartners />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="/partner-dashboard" element={<PartnerDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
