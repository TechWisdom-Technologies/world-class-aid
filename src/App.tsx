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
import CityHub from "./pages/CityHub";
import UniversityDetail from "./pages/UniversityDetail";
import EligibilityWizard from "./pages/EligibilityWizard";
import B2BLanding from "./pages/B2BLanding";
import CostCalculator from "./pages/CostCalculator";
import GpaConverter from "./pages/GpaConverter";
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
import ComingSoon from "./pages/ComingSoon";
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
            {/* Core public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* Destinations */}
            <Route path="/destinations/malaysia" element={<StudyInMalaysia />} />
            <Route path="/destinations/malaysia/:citySlug" element={<CityHub />} />

            {/* Directories */}
            <Route path="/universities" element={<Universities />} />
            <Route path="/universities/:universityId" element={<UniversityDetail />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />

            {/* Tools */}
            <Route path="/tools/calculator" element={<CostCalculator />} />
            <Route path="/tools/gpa-converter" element={<GpaConverter />} />
            <Route path="/eligibility" element={<EligibilityWizard />} />
            <Route path="/compare" element={<Compare />} />

            {/* Resources */}
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/visa-guide" element={<VisaGuide />} />
            <Route path="/housing" element={<Housing />} />
            <Route path="/events" element={<Events />} />
            <Route path="/language-prep" element={<LanguagePrep />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/pre-departure" element={<PreDeparture />} />
            <Route path="/help" element={<HelpCenter />} />

            {/* Partner / Agency */}
            <Route path="/partner" element={<B2BLanding />} />
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

            {/* Redirects for old routes */}
            <Route path="/study-in-malaysia" element={<Navigate to="/destinations/malaysia" replace />} />
            <Route path="/countries" element={<Navigate to="/destinations/malaysia" replace />} />
            <Route path="/country/:countryId" element={<Navigate to="/destinations/malaysia" replace />} />
            <Route path="/university/:universityId" element={<Navigate to="/universities/:universityId" replace />} />
            <Route path="/cost-calculator" element={<Navigate to="/tools/calculator" replace />} />
            <Route path="/calculator" element={<Navigate to="/tools/calculator" replace />} />
            <Route path="/gpa-converter" element={<Navigate to="/tools/gpa-converter" replace />} />
            <Route path="/eligibility-test" element={<Navigate to="/eligibility" replace />} />
            <Route path="/b2b" element={<Navigate to="/partner" replace />} />

            {/* Catch-all for coming soon */}
            <Route path="/virtual-tours" element={<ComingSoon />} />
            <Route path="/student-dashboard/*" element={<ComingSoon />} />

            {/* Admin */}
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

            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
