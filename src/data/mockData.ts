export interface Country {
  id: number;
  name: string;
  code: string;
  flag_icon: string;
}

export interface University {
  id: number;
  name: string;
  country_id: number;
  city: string;
  logo_url: string;
  description: string;
  ranking: number;
  global_score: number;
}

export interface Course {
  id: number;
  title: string;
  university_id: number;
  degree_level: string;
  tuition_fee: number;
  duration: string;
  intake_months: string[];
}

export interface Accommodation {
  id: number;
  name: string;
  city: string;
  distance_to_university_id: number;
  near_university_ids: number[];
  price_per_month: number;
  type: string;
  amenities: string[];
}

export interface Scholarship {
  id: number;
  name: string;
  university_id: number;
  coverage_amount: string;
  criteria: string;
}

export interface B2BPartner {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  total_sent: number;
  processing: number;
  converted: number;
  commission: number;
  // legacy compat
  agency_name: string;
  contact_person: string;
  total_referrals: number;
  successful_enrollments: number;
  commission_earned: number;
}

export interface Student {
  id: number;
  name: string;
  partner_id: number | null;
  academic_score: number;
  ielts_score: number;
  status: "Document Review" | "Applied" | "Offer Letter" | "Visa" | "Done" | "Rejected";
  target_university_id: number;
  target_course_id: number;
  referred_by_partner_id: number;
  application_status: string;
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

export interface CostOfLivingData {
  country: string;
  city: string;
  rent: number;
  food: number;
  transport: number;
  utilities: number;
  entertainment: number;
}

export interface UniversityComparison {
  university_id: number;
  academic_difficulty: number;
  affordability: number;
  campus_life: number;
  min_ielts: number;
  min_toefl: number;
  avg_living_cost: number;
}

export interface IntakeDeadline {
  id: number;
  university_id: number;
  intake: string;
  deadline: string;
  semester: "Fall" | "Spring" | "Summer";
}

export interface Event {
  id: number;
  title: string;
  type: "Open Day" | "Workshop" | "Webinar" | "Info Session";
  date: string;
  time: string;
  university_ids: number[];
  description: string;
  spots_left: number;
}

export interface Ambassador {
  id: number;
  name: string;
  country: string;
  university: string;
  course: string;
  avatar: string;
  bio: string;
  icebreakers: string[];
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  type: "checklist" | "guide" | "ebook";
  icon: string;
}

export const countries: Country[] = [
  { id: 1, name: "Malaysia", code: "MY", flag_icon: "🇲🇾" },
  { id: 2, name: "United Kingdom", code: "GB", flag_icon: "🇬🇧" },
  { id: 3, name: "Australia", code: "AU", flag_icon: "🇦🇺" },
  { id: 4, name: "Canada", code: "CA", flag_icon: "🇨🇦" },
];

export const universities: University[] = [
  { id: 1, name: "University of Malaya", country_id: 1, city: "Kuala Lumpur", logo_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop", description: "Malaysia's oldest and top-ranked university, renowned for research excellence and a vibrant international community.", ranking: 65, global_score: 88 },
  { id: 2, name: "Universiti Teknologi Malaysia", country_id: 1, city: "Johor Bahru", logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop", description: "Leading technical university with strong engineering programs and industry partnerships.", ranking: 188, global_score: 74 },
  { id: 3, name: "Monash University Malaysia", country_id: 1, city: "Subang Jaya", logo_url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=200&fit=crop", description: "A branch campus of Australia's prestigious Monash University with world-class facilities.", ranking: 42, global_score: 91 },
  { id: 4, name: "Taylor's University", country_id: 1, city: "Subang Jaya", logo_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&h=200&fit=crop", description: "Premier private university known for hospitality and business programs.", ranking: 284, global_score: 68 },
  { id: 5, name: "UCSI University", country_id: 1, city: "Kuala Lumpur", logo_url: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=200&h=200&fit=crop", description: "Top private university with diverse programs and global partnerships.", ranking: 347, global_score: 63 },
  { id: 6, name: "Universiti Putra Malaysia", country_id: 1, city: "Serdang", logo_url: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200&h=200&fit=crop", description: "Research-intensive university with agriculture and science focus.", ranking: 123, global_score: 81 },
  { id: 7, name: "University of Oxford", country_id: 2, city: "Oxford", logo_url: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200&h=200&fit=crop", description: "World-leading research and teaching university with centuries of academic excellence.", ranking: 1, global_score: 99 },
  { id: 8, name: "University of Melbourne", country_id: 3, city: "Melbourne", logo_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop", description: "Australia's leading university with cutting-edge research programs.", ranking: 14, global_score: 96 },
  { id: 9, name: "University of Toronto", country_id: 4, city: "Toronto", logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop", description: "Canada's top-ranked university with a diverse global community.", ranking: 18, global_score: 95 },
  { id: 10, name: "Asia Pacific University (APU)", country_id: 1, city: "Kuala Lumpur", logo_url: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=200&h=200&fit=crop", description: "Award-winning university specialising in technology, innovation, and digital skills.", ranking: 450, global_score: 60 },
  { id: 11, name: "HELP University", country_id: 1, city: "Kuala Lumpur", logo_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&h=200&fit=crop", description: "Leading private university with strong psychology and business faculties.", ranking: 520, global_score: 55 },
  { id: 12, name: "Imperial College London", country_id: 2, city: "London", logo_url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=200&fit=crop", description: "World-renowned STEM-focused institution in the heart of London.", ranking: 6, global_score: 97 },
  { id: 13, name: "University of Cambridge", country_id: 2, city: "Cambridge", logo_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop", description: "One of the world's oldest and most prestigious universities.", ranking: 2, global_score: 99 },
  { id: 14, name: "University of Sydney", country_id: 3, city: "Sydney", logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop", description: "Australia's first university with a global reputation for excellence.", ranking: 19, global_score: 94 },
  { id: 15, name: "University of Queensland", country_id: 3, city: "Brisbane", logo_url: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200&h=200&fit=crop", description: "Top research university known for innovation and sustainability.", ranking: 43, global_score: 90 },
  { id: 16, name: "McGill University", country_id: 4, city: "Montreal", logo_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&h=200&fit=crop", description: "Prestigious Canadian university with bilingual heritage and strong medical faculty.", ranking: 31, global_score: 92 },
  { id: 17, name: "University of British Columbia", country_id: 4, city: "Vancouver", logo_url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=200&fit=crop", description: "Top Canadian university surrounded by mountains and Pacific coastline.", ranking: 35, global_score: 91 },
  { id: 18, name: "Sunway University", country_id: 1, city: "Subang Jaya", logo_url: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=200&h=200&fit=crop", description: "Rapidly growing private university with Lancaster University partnerships.", ranking: 580, global_score: 52 },
  { id: 19, name: "University of Edinburgh", country_id: 2, city: "Edinburgh", logo_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop", description: "Scotland's leading university known for arts, sciences, and medicine.", ranking: 15, global_score: 95 },
  { id: 20, name: "Multimedia University", country_id: 1, city: "Cyberjaya", logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop", description: "Pioneer in multimedia and IT education in Malaysia.", ranking: 600, global_score: 50 },
];

export const courses: Course[] = [
  { id: 1, title: "Bachelor of Computer Science", university_id: 1, degree_level: "Bachelor", tuition_fee: 12000, duration: "3 years", intake_months: ["March", "September"] },
  { id: 2, title: "Master of Business Administration", university_id: 1, degree_level: "Master", tuition_fee: 18000, duration: "2 years", intake_months: ["September"] },
  { id: 3, title: "Bachelor of Engineering (Mechanical)", university_id: 2, degree_level: "Bachelor", tuition_fee: 14000, duration: "4 years", intake_months: ["February", "September"] },
  { id: 4, title: "Bachelor of Medicine (MBBS)", university_id: 3, degree_level: "Bachelor", tuition_fee: 45000, duration: "5 years", intake_months: ["March"] },
  { id: 5, title: "Diploma in Culinary Arts", university_id: 4, degree_level: "Foundation", tuition_fee: 8000, duration: "2 years", intake_months: ["January", "May", "September"] },
  { id: 6, title: "Bachelor of Pharmacy", university_id: 5, degree_level: "Bachelor", tuition_fee: 16000, duration: "4 years", intake_months: ["March", "September"] },
  { id: 7, title: "PhD in Agricultural Science", university_id: 6, degree_level: "PhD", tuition_fee: 10000, duration: "3 years", intake_months: ["February"] },
  { id: 8, title: "Master of Data Science", university_id: 1, degree_level: "Master", tuition_fee: 20000, duration: "2 years", intake_months: ["September"] },
  { id: 9, title: "Bachelor of Hospitality Management", university_id: 4, degree_level: "Bachelor", tuition_fee: 15000, duration: "3 years", intake_months: ["January", "September"] },
  { id: 10, title: "Master of Engineering (Electrical)", university_id: 2, degree_level: "Master", tuition_fee: 16000, duration: "2 years", intake_months: ["September"] },
  { id: 11, title: "MSc Computer Science", university_id: 7, degree_level: "Master", tuition_fee: 35000, duration: "1 year", intake_months: ["October"] },
  { id: 12, title: "Bachelor of Arts", university_id: 8, degree_level: "Bachelor", tuition_fee: 28000, duration: "3 years", intake_months: ["February", "July"] },
  { id: 13, title: "Master of Finance", university_id: 9, degree_level: "Master", tuition_fee: 42000, duration: "2 years", intake_months: ["September"] },
  { id: 14, title: "Foundation in Science", university_id: 10, degree_level: "Foundation", tuition_fee: 6000, duration: "1 year", intake_months: ["January", "May", "September"] },
  { id: 15, title: "Bachelor of Software Engineering", university_id: 10, degree_level: "Bachelor", tuition_fee: 13000, duration: "3 years", intake_months: ["March", "September"] },
  { id: 16, title: "Bachelor of Psychology", university_id: 11, degree_level: "Bachelor", tuition_fee: 11000, duration: "3 years", intake_months: ["January", "September"] },
  { id: 17, title: "Master of Biotechnology", university_id: 12, degree_level: "Master", tuition_fee: 38000, duration: "1 year", intake_months: ["October"] },
  { id: 18, title: "PhD in Artificial Intelligence", university_id: 12, degree_level: "PhD", tuition_fee: 30000, duration: "4 years", intake_months: ["October"] },
  { id: 19, title: "Bachelor of Law (LLB)", university_id: 13, degree_level: "Bachelor", tuition_fee: 40000, duration: "3 years", intake_months: ["October"] },
  { id: 20, title: "Foundation in Engineering", university_id: 14, degree_level: "Foundation", tuition_fee: 9000, duration: "1 year", intake_months: ["February", "July"] },
  { id: 21, title: "Bachelor of Nursing", university_id: 14, degree_level: "Bachelor", tuition_fee: 32000, duration: "3 years", intake_months: ["February"] },
  { id: 22, title: "Master of Environmental Science", university_id: 15, degree_level: "Master", tuition_fee: 34000, duration: "2 years", intake_months: ["February", "July"] },
  { id: 23, title: "Bachelor of Commerce", university_id: 16, degree_level: "Bachelor", tuition_fee: 36000, duration: "4 years", intake_months: ["September"] },
  { id: 24, title: "PhD in Physics", university_id: 16, degree_level: "PhD", tuition_fee: 25000, duration: "4 years", intake_months: ["September", "January"] },
  { id: 25, title: "Master of Computer Science", university_id: 17, degree_level: "Master", tuition_fee: 40000, duration: "2 years", intake_months: ["September"] },
  { id: 26, title: "Bachelor of Accounting", university_id: 18, degree_level: "Bachelor", tuition_fee: 10000, duration: "3 years", intake_months: ["January", "March", "September"] },
  { id: 27, title: "Foundation in Business", university_id: 18, degree_level: "Foundation", tuition_fee: 5500, duration: "1 year", intake_months: ["January", "May", "September"] },
  { id: 28, title: "Master of Public Health", university_id: 19, degree_level: "Master", tuition_fee: 33000, duration: "1 year", intake_months: ["September"] },
  { id: 29, title: "Bachelor of Multimedia Design", university_id: 20, degree_level: "Bachelor", tuition_fee: 9000, duration: "3 years", intake_months: ["February", "September"] },
  { id: 30, title: "Master of Cybersecurity", university_id: 20, degree_level: "Master", tuition_fee: 14000, duration: "2 years", intake_months: ["September"] },
];

export const accommodations: Accommodation[] = [
  { id: 1, name: "KL Sentral Residence", city: "Kuala Lumpur", near_university_ids: [1, 5], distance_to_university_id: 1, price_per_month: 800, type: "Apartment", amenities: ["WiFi", "Gym", "Pool", "Security"] },
  { id: 2, name: "Subang Student Hostel", city: "Subang Jaya", near_university_ids: [3, 4], distance_to_university_id: 3, price_per_month: 450, type: "Hostel", amenities: ["WiFi", "Laundry", "Cafeteria"] },
  { id: 3, name: "JB Student Lodge", city: "Johor Bahru", near_university_ids: [2], distance_to_university_id: 2, price_per_month: 350, type: "Hostel", amenities: ["WiFi", "Study Room", "Bus Service"] },
  { id: 4, name: "Serdang Heights Condo", city: "Serdang", near_university_ids: [6], distance_to_university_id: 6, price_per_month: 600, type: "Condominium", amenities: ["WiFi", "Pool", "Parking", "Gym"] },
  { id: 5, name: "Bangsar South Studio", city: "Kuala Lumpur", near_university_ids: [1, 5], distance_to_university_id: 1, price_per_month: 950, type: "Studio", amenities: ["WiFi", "Gym", "Concierge", "Pool"] },
  { id: 6, name: "SS15 Shared House", city: "Subang Jaya", near_university_ids: [3, 4], distance_to_university_id: 4, price_per_month: 300, type: "Shared House", amenities: ["WiFi", "Kitchen", "Garden"] },
];

export const scholarships: Scholarship[] = [
  { id: 1, name: "UM Global Excellence Award", university_id: 1, coverage_amount: "Full Tuition", criteria: "GPA 3.7+, IELTS 7.0+" },
  { id: 2, name: "UM Merit Scholarship", university_id: 1, coverage_amount: "50% Tuition", criteria: "GPA 3.5+, IELTS 6.5+" },
  { id: 3, name: "UTM Engineering Grant", university_id: 2, coverage_amount: "RM 15,000/year", criteria: "GPA 3.5+, Engineering applicants" },
  { id: 4, name: "Monash International Scholarship", university_id: 3, coverage_amount: "Full Tuition + Stipend", criteria: "GPA 3.8+, IELTS 7.0+" },
  { id: 5, name: "Taylor's Excellence Award", university_id: 4, coverage_amount: "30% Tuition", criteria: "GPA 3.3+, Leadership activities" },
  { id: 6, name: "UCSI Global Award", university_id: 5, coverage_amount: "RM 10,000/year", criteria: "GPA 3.4+, Community service" },
  { id: 7, name: "UPM Research Fellowship", university_id: 6, coverage_amount: "Full Tuition + Monthly Stipend", criteria: "PhD applicants, Published research" },
  { id: 8, name: "Oxford Clarendon Fund", university_id: 7, coverage_amount: "Full Tuition + Living", criteria: "Outstanding academic merit" },
  { id: 9, name: "Melbourne Graduate Scholarship", university_id: 8, coverage_amount: "Full Tuition", criteria: "GPA 3.8+, Research proposal" },
  { id: 10, name: "Lester B. Pearson Scholarship", university_id: 9, coverage_amount: "Full Tuition + Living", criteria: "Academic excellence + Leadership" },
];

export const b2bPartners: B2BPartner[] = [
  { id: 1, company_name: "Global Education Hub", contact_name: "Ahmad Ibrahim", email: "ahmad@globaledhub.com", total_sent: 156, processing: 18, converted: 124, commission: 62000, agency_name: "Global Education Hub", contact_person: "Ahmad Ibrahim", total_referrals: 156, successful_enrollments: 124, commission_earned: 62000 },
  { id: 2, company_name: "StudyBridge International", contact_name: "Sarah Chen", email: "sarah@studybridge.com", total_sent: 89, processing: 12, converted: 67, commission: 33500, agency_name: "StudyBridge International", contact_person: "Sarah Chen", total_referrals: 89, successful_enrollments: 67, commission_earned: 33500 },
  { id: 3, company_name: "EduConnect Africa", contact_name: "James Okonkwo", email: "james@educonnect.africa", total_sent: 210, processing: 22, converted: 178, commission: 89000, agency_name: "EduConnect Africa", contact_person: "James Okonkwo", total_referrals: 210, successful_enrollments: 178, commission_earned: 89000 },
  { id: 4, company_name: "Pacific Student Services", contact_name: "Mei Ling Wong", email: "mei@pacificstudent.com", total_sent: 45, processing: 5, converted: 38, commission: 19000, agency_name: "Pacific Student Services", contact_person: "Mei Ling Wong", total_referrals: 45, successful_enrollments: 38, commission_earned: 19000 },
  { id: 5, company_name: "Mideast Scholars Agency", contact_name: "Omar Farouk", email: "omar@mideastscholars.com", total_sent: 112, processing: 9, converted: 95, commission: 47500, agency_name: "Mideast Scholars Agency", contact_person: "Omar Farouk", total_referrals: 112, successful_enrollments: 95, commission_earned: 47500 },
];

export const students: Student[] = [
  { id: 1, name: "Ali Hassan", partner_id: 1, academic_score: 85, ielts_score: 7.0, status: "Done", target_university_id: 1, target_course_id: 1, referred_by_partner_id: 1, application_status: "Accepted" },
  { id: 2, name: "Fatima Zahra", partner_id: 1, academic_score: 78, ielts_score: 6.5, status: "Visa", target_university_id: 3, target_course_id: 4, referred_by_partner_id: 1, application_status: "Processing" },
  { id: 3, name: "John Doe", partner_id: 2, academic_score: 72, ielts_score: 6.0, status: "Document Review", target_university_id: 4, target_course_id: 5, referred_by_partner_id: 2, application_status: "Pending" },
  { id: 4, name: "Priya Sharma", partner_id: 3, academic_score: 91, ielts_score: 7.5, status: "Done", target_university_id: 1, target_course_id: 2, referred_by_partner_id: 3, application_status: "Accepted" },
  { id: 5, name: "David Osei", partner_id: 3, academic_score: 65, ielts_score: 5.5, status: "Rejected", target_university_id: 2, target_course_id: 3, referred_by_partner_id: 3, application_status: "Rejected" },
  { id: 6, name: "Yuki Tanaka", partner_id: 4, academic_score: 82, ielts_score: 6.5, status: "Applied", target_university_id: 5, target_course_id: 6, referred_by_partner_id: 4, application_status: "Processing" },
  { id: 7, name: "Chen Wei", partner_id: 1, academic_score: 88, ielts_score: 7.0, status: "Offer Letter", target_university_id: 6, target_course_id: 7, referred_by_partner_id: 1, application_status: "Accepted" },
  { id: 8, name: "Maria Santos", partner_id: 2, academic_score: 76, ielts_score: 6.0, status: "Document Review", target_university_id: 1, target_course_id: 8, referred_by_partner_id: 2, application_status: "Pending" },
  { id: 9, name: "Rashid Al-Nasser", partner_id: 5, academic_score: 89, ielts_score: 7.0, status: "Done", target_university_id: 4, target_course_id: 9, referred_by_partner_id: 5, application_status: "Accepted" },
  { id: 10, name: "Aisha Mohammed", partner_id: 5, academic_score: 80, ielts_score: 6.5, status: "Visa", target_university_id: 2, target_course_id: 10, referred_by_partner_id: 5, application_status: "Processing" },
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

export const costOfLivingData: CostOfLivingData[] = [
  { country: "Malaysia", city: "Kuala Lumpur", rent: 700, food: 250, transport: 50, utilities: 60, entertainment: 100 },
  { country: "Malaysia", city: "Johor Bahru", rent: 450, food: 200, transport: 40, utilities: 50, entertainment: 80 },
  { country: "Malaysia", city: "Subang Jaya", rent: 550, food: 220, transport: 45, utilities: 55, entertainment: 90 },
  { country: "Malaysia", city: "Serdang", rent: 500, food: 200, transport: 40, utilities: 50, entertainment: 70 },
  { country: "United Kingdom", city: "Oxford", rent: 1400, food: 400, transport: 100, utilities: 120, entertainment: 200 },
  { country: "Australia", city: "Melbourne", rent: 1200, food: 350, transport: 80, utilities: 100, entertainment: 180 },
  { country: "Canada", city: "Toronto", rent: 1300, food: 380, transport: 90, utilities: 110, entertainment: 190 },
];

export const referralChartData = [
  { month: "Oct", referrals: 12 },
  { month: "Nov", referrals: 19 },
  { month: "Dec", referrals: 8 },
  { month: "Jan", referrals: 22 },
  { month: "Feb", referrals: 16 },
  { month: "Mar", referrals: 25 },
];

export const funnelData = [
  { stage: "Lead", value: 500, fill: "hsl(220, 60%, 18%)" },
  { stage: "Applied", value: 380, fill: "hsl(220, 45%, 30%)" },
  { stage: "Offer Received", value: 240, fill: "hsl(38, 92%, 50%)" },
  { stage: "Visa Approved", value: 180, fill: "hsl(142, 76%, 36%)" },
  { stage: "Enrolled", value: 150, fill: "hsl(142, 76%, 28%)" },
];

export const universityComparisons: UniversityComparison[] = [
  { university_id: 1, academic_difficulty: 82, affordability: 78, campus_life: 85, min_ielts: 6.0, min_toefl: 80, avg_living_cost: 1160 },
  { university_id: 2, academic_difficulty: 75, affordability: 82, campus_life: 70, min_ielts: 5.5, min_toefl: 70, avg_living_cost: 820 },
  { university_id: 3, academic_difficulty: 90, affordability: 55, campus_life: 88, min_ielts: 6.5, min_toefl: 90, avg_living_cost: 960 },
  { university_id: 4, academic_difficulty: 68, affordability: 65, campus_life: 92, min_ielts: 5.5, min_toefl: 70, avg_living_cost: 960 },
  { university_id: 5, academic_difficulty: 65, affordability: 72, campus_life: 75, min_ielts: 5.5, min_toefl: 68, avg_living_cost: 1160 },
  { university_id: 6, academic_difficulty: 78, affordability: 80, campus_life: 72, min_ielts: 5.5, min_toefl: 72, avg_living_cost: 860 },
  { university_id: 7, academic_difficulty: 98, affordability: 20, campus_life: 95, min_ielts: 7.5, min_toefl: 110, avg_living_cost: 2220 },
  { university_id: 8, academic_difficulty: 92, affordability: 30, campus_life: 90, min_ielts: 7.0, min_toefl: 100, avg_living_cost: 1910 },
  { university_id: 9, academic_difficulty: 93, affordability: 25, campus_life: 91, min_ielts: 7.0, min_toefl: 100, avg_living_cost: 2070 },
];

export const intakeDeadlines: IntakeDeadline[] = [
  { id: 1, university_id: 1, intake: "September 2026", deadline: "2026-06-15", semester: "Fall" },
  { id: 2, university_id: 2, intake: "September 2026", deadline: "2026-05-30", semester: "Fall" },
  { id: 3, university_id: 3, intake: "March 2027", deadline: "2026-11-30", semester: "Spring" },
  { id: 4, university_id: 4, intake: "September 2026", deadline: "2026-06-01", semester: "Fall" },
  { id: 5, university_id: 5, intake: "September 2026", deadline: "2026-07-15", semester: "Fall" },
  { id: 6, university_id: 1, intake: "March 2027", deadline: "2026-12-01", semester: "Spring" },
  { id: 7, university_id: 7, intake: "October 2026", deadline: "2026-01-15", semester: "Fall" },
  { id: 8, university_id: 8, intake: "February 2027", deadline: "2026-10-31", semester: "Spring" },
  { id: 9, university_id: 9, intake: "September 2026", deadline: "2026-04-01", semester: "Fall" },
  { id: 10, university_id: 6, intake: "February 2027", deadline: "2026-09-30", semester: "Spring" },
];

export const events: Event[] = [
  { id: 1, title: "Malaysia Virtual Open Day 2026", type: "Open Day", date: "2026-04-15", time: "10:00 AM GMT+8", university_ids: [1, 2, 6], description: "Explore top Malaysian universities from the comfort of your home. Live campus tours and Q&A sessions.", spots_left: 120 },
  { id: 2, title: "Student Visa Workshop — Malaysia", type: "Workshop", date: "2026-04-22", time: "2:00 PM GMT+8", university_ids: [], description: "Step-by-step visa application walkthrough with our immigration experts. Bring your documents!", spots_left: 45 },
  { id: 3, title: "Scholarship Application Masterclass", type: "Webinar", date: "2026-05-05", time: "11:00 AM GMT+8", university_ids: [1, 3, 4], description: "Learn insider tips to craft winning scholarship applications from previous recipients.", spots_left: 200 },
  { id: 4, title: "Engineering Careers Info Session", type: "Info Session", date: "2026-05-12", time: "3:00 PM GMT+8", university_ids: [2], description: "Discover engineering career paths in Malaysia with UTM faculty and industry partners.", spots_left: 80 },
  { id: 5, title: "Study in the UK — Oxford Showcase", type: "Open Day", date: "2026-05-20", time: "4:00 PM GMT", university_ids: [7], description: "An exclusive virtual showcase of Oxford's international programs and campus life.", spots_left: 60 },
  { id: 6, title: "Pre-Departure Briefing — Fall 2026", type: "Workshop", date: "2026-07-10", time: "10:00 AM GMT+8", university_ids: [1, 2, 3, 4, 5, 6], description: "Everything you need to know before arriving in Malaysia. Accommodation, banking, transport tips.", spots_left: 150 },
];

export const ambassadors: Ambassador[] = [
  { id: 1, name: "Abeer Rahman", country: "Bangladesh", university: "University of Malaya", course: "BSc Computer Science", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", bio: "3rd year CS student. Love hackathons and Malaysian food!", icebreakers: ["What's campus life really like?", "How's the food in KL?", "Any tips for new students?"] },
  { id: 2, name: "Chiamaka Obi", country: "Nigeria", university: "Taylor's University", course: "BBA Hospitality", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", bio: "Passionate about hospitality. Former student council president.", icebreakers: ["How did you choose Taylor's?", "What's the social scene like?", "Is it hard to make friends?"] },
  { id: 3, name: "Liam Chen", country: "Singapore", university: "Monash University Malaysia", course: "MBBS Medicine", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", bio: "Future doctor who also plays guitar. Happy to help!", icebreakers: ["How intense is the med program?", "What about accommodation?", "Any scholarship advice?"] },
  { id: 4, name: "Sara Al-Mutairi", country: "Kuwait", university: "UCSI University", course: "BPharm Pharmacy", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", bio: "Pharmacy nerd and travel enthusiast. KL is amazing!", icebreakers: ["Is Malaysia safe for women?", "How's the pharmacy program?", "Cost of living tips?"] },
];

export const resources: Resource[] = [
  { id: 1, title: "Pre-Departure Checklist 2026", description: "The complete checklist of everything to do before flying to Malaysia.", type: "checklist", icon: "✈️" },
  { id: 2, title: "SOP Writing Guide", description: "Step-by-step guide to writing a compelling Statement of Purpose.", type: "guide", icon: "📝" },
  { id: 3, title: "Ultimate Study in Malaysia Guide", description: "The definitive 50-page guide covering universities, visas, and student life.", type: "ebook", icon: "📚" },
  { id: 4, title: "Scholarship Application Template", description: "Ready-to-use templates for scholarship applications with examples.", type: "guide", icon: "🏆" },
];
