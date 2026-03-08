import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Countries from "./pages/Countries";
import CountryHub from "./pages/CountryHub";
import UniversityDetail from "./pages/UniversityDetail";
import EligibilityWizard from "./pages/EligibilityWizard";
import B2BLanding from "./pages/B2BLanding";
import CostCalculator from "./pages/CostCalculator";
import Compare from "./pages/Compare";
import Events from "./pages/Events";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUniversities from "./pages/admin/AdminUniversities";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminAccommodations from "./pages/admin/AdminAccommodations";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminSettings from "./pages/admin/AdminSettings";
import PartnerLayout from "./pages/partner/PartnerLayout";
import PartnerOverview from "./pages/partner/PartnerOverview";
import PartnerWallet from "./pages/partner/PartnerWallet";
import PartnerMarketing from "./pages/partner/PartnerMarketing";
import PartnerTeam from "./pages/partner/PartnerTeam";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/country/:countryId" element={<CountryHub />} />
            <Route path="/university/:universityId" element={<UniversityDetail />} />
            <Route path="/eligibility" element={<EligibilityWizard />} />
            <Route path="/b2b" element={<B2BLanding />} />
            <Route path="/cost-calculator" element={<CostCalculator />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/events" element={<Events />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="universities" element={<AdminUniversities />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="accommodations" element={<AdminAccommodations />} />
              <Route path="partners" element={<AdminPartners />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route
              path="/partner-dashboard"
              element={
                <ProtectedRoute requiredRole="partner">
                  <PartnerLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<PartnerOverview />} />
              <Route path="wallet" element={<PartnerWallet />} />
              <Route path="marketing" element={<PartnerMarketing />} />
              <Route path="team" element={<PartnerTeam />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
