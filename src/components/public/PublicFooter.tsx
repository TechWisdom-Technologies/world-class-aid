import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function PublicFooter() {
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
              <li><a href="#universities" className="hover:text-secondary transition-colors">Universities</a></li>
              <li><a href="#courses" className="hover:text-secondary transition-colors">Courses</a></li>
              <li><a href="#accommodations" className="hover:text-secondary transition-colors">Accommodations</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Free Consultations</li>
              <li>Admission & Visa</li>
              <li>Accommodation</li>
              <li>Airport Pickup</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Connect With Us</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"><Linkedin className="h-4 w-4" /></a>
            </div>
            <p className="text-sm text-primary-foreground/70">info@youruni.com</p>
            <p className="text-sm text-primary-foreground/70">+60 12-345 6789</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 py-4 text-center text-sm text-primary-foreground/50">
          © 2026 YourUni. All rights reserved.
        </div>
      </footer>

      {/* WhatsApp Floating Widget */}
      <a
        href="https://wa.me/60123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-success text-success-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </>
  );
}
