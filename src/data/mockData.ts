export interface Country {
  id: number;
  name: string;
  code: string;
}

export interface University {
  id: number;
  name: string;
  country_id: number;
  city: string;
  logo_url: string;
  description: string;
  ranking: number;
}

export interface Course {
  id: number;
  title: string;
  university_id: number;
  degree_level: string;
  tuition_fee: number;
  duration: string;
}

export interface Accommodation {
  id: number;
  name: string;
  city: string;
  near_university_ids: number[];
  price_per_month: number;
  type: string;
}

export interface B2BPartner {
  id: number;
  agency_name: string;
  contact_person: string;
  total_referrals: number;
  successful_enrollments: number;
  commission_earned: number;
}

export interface Student {
  id: number;
  name: string;
  referred_by_partner_id: number;
  target_university_id: number;
  target_course_id: number;
  application_status: "Pending" | "Processing" | "Accepted" | "Rejected";
}

export interface Testimonial {
  id: number;
  name: string;
  country: string;
  university: string;
  quote: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

export const countries: Country[] = [
  { id: 1, name: "Malaysia", code: "MY" },
  { id: 2, name: "United Kingdom", code: "GB" },
  { id: 3, name: "Australia", code: "AU" },
  { id: 4, name: "Canada", code: "CA" },
];

export const universities: University[] = [
  { id: 1, name: "University of Malaya", country_id: 1, city: "Kuala Lumpur", logo_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop", description: "Malaysia's oldest and top-ranked university, renowned for research excellence.", ranking: 65 },
  { id: 2, name: "Universiti Teknologi Malaysia", country_id: 1, city: "Johor Bahru", logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop", description: "Leading technical university with strong engineering programs.", ranking: 188 },
  { id: 3, name: "Monash University Malaysia", country_id: 1, city: "Subang Jaya", logo_url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=200&fit=crop", description: "A branch campus of Australia's prestigious Monash University.", ranking: 42 },
  { id: 4, name: "Taylor's University", country_id: 1, city: "Subang Jaya", logo_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&h=200&fit=crop", description: "Premier private university known for hospitality and business programs.", ranking: 284 },
  { id: 5, name: "UCSI University", country_id: 1, city: "Kuala Lumpur", logo_url: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=200&h=200&fit=crop", description: "Top private university with diverse programs and global partnerships.", ranking: 347 },
  { id: 6, name: "Universiti Putra Malaysia", country_id: 1, city: "Serdang", logo_url: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200&h=200&fit=crop", description: "Research-intensive university with agriculture and science focus.", ranking: 123 },
];

export const courses: Course[] = [
  { id: 1, title: "Bachelor of Computer Science", university_id: 1, degree_level: "Bachelor", tuition_fee: 12000, duration: "3 years" },
  { id: 2, title: "Master of Business Administration", university_id: 1, degree_level: "Master", tuition_fee: 18000, duration: "2 years" },
  { id: 3, title: "Bachelor of Engineering (Mechanical)", university_id: 2, degree_level: "Bachelor", tuition_fee: 14000, duration: "4 years" },
  { id: 4, title: "Bachelor of Medicine (MBBS)", university_id: 3, degree_level: "Bachelor", tuition_fee: 45000, duration: "5 years" },
  { id: 5, title: "Diploma in Culinary Arts", university_id: 4, degree_level: "Diploma", tuition_fee: 8000, duration: "2 years" },
  { id: 6, title: "Bachelor of Pharmacy", university_id: 5, degree_level: "Bachelor", tuition_fee: 16000, duration: "4 years" },
  { id: 7, title: "PhD in Agricultural Science", university_id: 6, degree_level: "PhD", tuition_fee: 10000, duration: "3 years" },
  { id: 8, title: "Master of Data Science", university_id: 1, degree_level: "Master", tuition_fee: 20000, duration: "2 years" },
  { id: 9, title: "Bachelor of Hospitality Management", university_id: 4, degree_level: "Bachelor", tuition_fee: 15000, duration: "3 years" },
  { id: 10, title: "Master of Engineering (Electrical)", university_id: 2, degree_level: "Master", tuition_fee: 16000, duration: "2 years" },
];

export const accommodations: Accommodation[] = [
  { id: 1, name: "KL Sentral Residence", city: "Kuala Lumpur", near_university_ids: [1, 5], price_per_month: 800, type: "Apartment" },
  { id: 2, name: "Subang Student Hostel", city: "Subang Jaya", near_university_ids: [3, 4], price_per_month: 450, type: "Hostel" },
  { id: 3, name: "JB Student Lodge", city: "Johor Bahru", near_university_ids: [2], price_per_month: 350, type: "Hostel" },
  { id: 4, name: "Serdang Heights Condo", city: "Serdang", near_university_ids: [6], price_per_month: 600, type: "Condominium" },
  { id: 5, name: "Bangsar South Studio", city: "Kuala Lumpur", near_university_ids: [1, 5], price_per_month: 950, type: "Studio" },
  { id: 6, name: "SS15 Shared House", city: "Subang Jaya", near_university_ids: [3, 4], price_per_month: 300, type: "Shared House" },
];

export const b2bPartners: B2BPartner[] = [
  { id: 1, agency_name: "Global Education Hub", contact_person: "Ahmad Ibrahim", total_referrals: 156, successful_enrollments: 124, commission_earned: 62000 },
  { id: 2, agency_name: "StudyBridge International", contact_person: "Sarah Chen", total_referrals: 89, successful_enrollments: 67, commission_earned: 33500 },
  { id: 3, agency_name: "EduConnect Africa", contact_person: "James Okonkwo", total_referrals: 210, successful_enrollments: 178, commission_earned: 89000 },
  { id: 4, agency_name: "Pacific Student Services", contact_person: "Mei Ling Wong", total_referrals: 45, successful_enrollments: 38, commission_earned: 19000 },
  { id: 5, agency_name: "Mideast Scholars Agency", contact_person: "Omar Farouk", total_referrals: 112, successful_enrollments: 95, commission_earned: 47500 },
];

export const students: Student[] = [
  { id: 1, name: "Ali Hassan", referred_by_partner_id: 1, target_university_id: 1, target_course_id: 1, application_status: "Accepted" },
  { id: 2, name: "Fatima Zahra", referred_by_partner_id: 1, target_university_id: 3, target_course_id: 4, application_status: "Processing" },
  { id: 3, name: "John Doe", referred_by_partner_id: 2, target_university_id: 4, target_course_id: 5, application_status: "Pending" },
  { id: 4, name: "Priya Sharma", referred_by_partner_id: 3, target_university_id: 1, target_course_id: 2, application_status: "Accepted" },
  { id: 5, name: "David Osei", referred_by_partner_id: 3, target_university_id: 2, target_course_id: 3, application_status: "Rejected" },
  { id: 6, name: "Yuki Tanaka", referred_by_partner_id: 4, target_university_id: 5, target_course_id: 6, application_status: "Processing" },
  { id: 7, name: "Chen Wei", referred_by_partner_id: 1, target_university_id: 6, target_course_id: 7, application_status: "Accepted" },
  { id: 8, name: "Maria Santos", referred_by_partner_id: 2, target_university_id: 1, target_course_id: 8, application_status: "Pending" },
  { id: 9, name: "Rashid Al-Nasser", referred_by_partner_id: 5, target_university_id: 4, target_course_id: 9, application_status: "Accepted" },
  { id: 10, name: "Aisha Mohammed", referred_by_partner_id: 5, target_university_id: 2, target_course_id: 10, application_status: "Processing" },
];

export const testimonials: Testimonial[] = [
  { id: 1, name: "Aminata Diallo", country: "Senegal", university: "University of Malaya", quote: "YourUni made my dream of studying in Malaysia a reality. From visa to accommodation, they handled everything!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { id: 2, name: "Ravi Patel", country: "India", university: "Taylor's University", quote: "The counselors at YourUni are incredibly helpful. I got my admission within 2 weeks!", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 3, name: "Sophie Muller", country: "Germany", university: "Monash University Malaysia", quote: "Professional service from start to finish. Highly recommend for international students.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
  { id: 4, name: "Omar Khalil", country: "Egypt", university: "UCSI University", quote: "They found me the perfect accommodation near my campus. Amazing support team!", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
];

export const blogPosts: BlogPost[] = [
  { id: 1, title: "Top 10 Reasons to Study in Malaysia", excerpt: "Discover why Malaysia is becoming the top destination for international students...", date: "2026-02-15", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=250&fit=crop", category: "Study Abroad" },
  { id: 2, title: "How to Apply for a Student Visa in Malaysia", excerpt: "A complete step-by-step guide to getting your Malaysian student visa...", date: "2026-02-10", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop", category: "Visa Guide" },
  { id: 3, title: "Scholarship Opportunities for 2026", excerpt: "Explore the latest scholarships available for international students...", date: "2026-01-28", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=250&fit=crop", category: "Scholarships" },
  { id: 4, title: "Student Life in Kuala Lumpur", excerpt: "What to expect from the vibrant student community in KL...", date: "2026-01-20", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&h=250&fit=crop", category: "Student Life" },
];

export const referralChartData = [
  { month: "Oct", referrals: 12 },
  { month: "Nov", referrals: 19 },
  { month: "Dec", referrals: 8 },
  { month: "Jan", referrals: 22 },
  { month: "Feb", referrals: 16 },
  { month: "Mar", referrals: 25 },
];
