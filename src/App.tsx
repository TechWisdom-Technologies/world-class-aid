import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Universities from "./pages/Universities";
import CoursesPage from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import StudyInMalaysia from "./pages/StudyInMalaysia";
import UniversityDetail from "./pages/UniversityDetail";
import EligibilityWizard from "./pages/EligibilityWizard";
import B2BLanding from "./pages/B2BLanding";
import CostCalculator from "./pages/CostCalculator";
import Compare from "./pages/Compare";
import Events from "./pages/Events";
import Scholarships from "./pages/Scholarships";
import VisaGuide from "./pages/VisaGuide";
import Housing from "./pages/Housing";
import LanguagePrep from "./pages/LanguagePrep";
import Careers from "./pages/Careers";
import Alumni from "./pages/Alumni";
import PreDeparture from "./pages/PreDeparture";
import HelpCenter from "./pages/HelpCenter";
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
            <Route path="/universities" element={<Universities />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/study-in-malaysia" element={<StudyInMalaysia />} />
            <Route path="/university/:universityId" element={<UniversityDetail />} />
            <Route path="/universities/:universityId" element={<UniversityDetail />} />
            <Route path="/eligibility" element={<EligibilityWizard />} />
            <Route path="/eligibility-test" element={<EligibilityWizard />} />
            <Route path="/b2b" element={<B2BLanding />} />
            <Route path="/cost-calculator" element={<CostCalculator />} />
            <Route path="/calculator" element={<CostCalculator />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/events" element={<Events />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/visa-guide" element={<VisaGuide />} />
            <Route path="/housing" element={<Housing />} />
            <Route path="/language-prep" element={<LanguagePrep />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/pre-departure" element={<PreDeparture />} />
            <Route path="/help" element={<HelpCenter />} />
            {/* Redirect old country routes */}
            <Route path="/countries" element={<Navigate to="/study-in-malaysia" replace />} />
            <Route path="/country/:countryId" element={<Navigate to="/study-in-malaysia" replace />} />
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
