import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, MessageCircle, BookOpen, MapPin, Sparkles, Calendar, Calculator, RefreshCw, Award, FileText, Zap, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { SupportFaqWidget } from "@/components/public/SupportFaqWidget";

interface PublicFooterProps {
  bannerVisible?: boolean;
}

export function PublicFooter({ bannerVisible = false }: PublicFooterProps) {
  const bottomClass = bannerVisible ? "bottom-20" : "bottom-6";
  return (
    <>
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-7 w-7 text-secondary" />
              <span className="text-xl font-extrabold">
                Your<span className="text-secondary">Uni</span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Expert guidance for international students seeking quality education in Malaysia.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-secondary" /><Link to="/universities" className="hover:text-secondary transition-colors">Universities</Link></li>
              <li className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-secondary" /><Link to="/courses" className="hover:text-secondary transition-colors">Courses</Link></li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" /><Link to="/destinations/malaysia" className="hover:text-secondary transition-colors">Study in Malaysia</Link></li>
              <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-secondary" /><Link to="/eligibility" className="hover:text-secondary transition-colors">Eligibility Test</Link></li>
              <li className="flex items-center gap-2"><Calendar className="h-4 w-4 text-secondary" /><Link to="/events" className="hover:text-secondary transition-colors">Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Tools & Resources</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2"><Calculator className="h-4 w-4 text-secondary" /><Link to="/tools/calculator" className="hover:text-secondary transition-colors">Cost Calculator</Link></li>
              <li className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-secondary" /><Link to="/tools/gpa-converter" className="hover:text-secondary transition-colors">GPA Converter</Link></li>
              <li className="flex items-center gap-2"><Award className="h-4 w-4 text-secondary" /><Link to="/scholarships" className="hover:text-secondary transition-colors">Scholarships</Link></li>
              <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-secondary" /><Link to="/visa-guide" className="hover:text-secondary transition-colors">Visa Guide</Link></li>
              <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-secondary" /><Link to="/partner" className="hover:text-secondary transition-colors">For Agencies</Link></li>
              <li className="flex items-center gap-2"><LogIn className="h-4 w-4 text-secondary" /><Link to="/login" className="hover:text-secondary transition-colors">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Connect With Us</h4>
            <div className="flex gap-3 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"><Facebook className="h-4 w-4" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"><Twitter className="h-4 w-4" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"><Linkedin className="h-4 w-4" /></a>
            </div>
            <p className="text-sm text-primary-foreground/70">info@youruni.com</p>
            <p className="text-sm text-primary-foreground/70">+60 12-345 6789</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 py-4 text-center text-sm text-primary-foreground/50">
          <p>© 2026 YourUni. All rights reserved.</p>
          <p className="mt-2">Developed by TechWisdom Technologies</p>
        </div>
      </footer>

      <SupportFaqWidget bannerVisible={bannerVisible} />

      {/* WhatsApp Floating Widget */}
      <a
        href="https://wa.me/60123456789"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed ${bottomClass} right-6 z-40 h-14 w-14 rounded-full bg-success text-success-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300`}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </>
  );
}
