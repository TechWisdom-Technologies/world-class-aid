export interface Country {
  id: number;
  name: string;
  code: string;
  flag_icon: string;
}

export interface UniversityFAQ {
  question: string;
  answer: string;
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
  aboutText?: string;
  studyReasons?: string[];
  faqs?: UniversityFAQ[];
  registrationSteps?: string[];
  totalStudents?: number;
  internationalRatio?: number;
  established?: number;
  campusSize?: string;
  heroImage?: string;
}

export interface CurriculumYear {
  year: string;
  modules: string[];
}

export interface EntryRequirements {
  gpa: number;
  ielts: number;
}

export interface Course {
  id: number;
  title: string;
  university_id: number;
  degree_level: string;
  tuition_fee: number;
  duration: string;
  intake_months: string[];
  overview?: string;
  curriculum?: CurriculumYear[];
  entryRequirements?: EntryRequirements;
  careerOutcomes?: string[];
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

const defaultFaqs: UniversityFAQ[] = [
  { question: "Are scholarships available for international students?", answer: "Yes, we offer a range of merit-based and need-based scholarships for international students. Eligibility varies by program and academic performance. Contact our admissions team for details." },
  { question: "Is on-campus accommodation guaranteed?", answer: "On-campus housing is available on a first-come, first-served basis. We also assist students in finding affordable off-campus accommodation near the university." },
  { question: "Can I work part-time while studying?", answer: "International students on a student visa are typically allowed to work part-time (up to 20 hours/week) during semester breaks, subject to local regulations." },
  { question: "What is the language of instruction?", answer: "All programs are taught in English. Some universities may offer preparatory English courses if you need additional language support." },
  { question: "How do I apply for a student visa?", answer: "Once you receive your offer letter, our international office will guide you through the entire visa application process, including EMGS processing for Malaysia-based universities." },
];

const defaultSteps = [
  "Submit your application and supporting documents online",
  "Receive your Conditional Offer Letter within 5-10 business days",
  "Pay the EMGS/Visa processing fee and submit medical reports",
  "Receive Visa Approval Letter (VAL) from immigration",
  "Book your flight and arrive on campus for orientation",
];

export const universities: University[] = [
  { id: 1, name: "University of Malaya", country_id: 1, city: "Kuala Lumpur", logo_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=600&fit=crop", description: "Malaysia's oldest and top-ranked university, renowned for research excellence and a vibrant international community.", ranking: 65, global_score: 88, totalStudents: 28000, internationalRatio: 25, established: 1905, campusSize: "900 Acres", aboutText: "Founded in 1905, the University of Malaya (UM) is Malaysia's oldest and highest-ranked university. Located in the heart of Kuala Lumpur, UM is a comprehensive research university with a commitment to academic excellence, innovative research, and community engagement. With over 28,000 students from more than 80 countries, UM provides a truly global learning environment.", studyReasons: ["Top-ranked university in Malaysia with global recognition", "World-class research facilities and laboratories", "Vibrant multicultural campus in the heart of KL", "Strong industry partnerships and career placement", "Affordable tuition compared to Western universities", "Beautiful 900-acre campus with modern amenities"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 2, name: "Universiti Teknologi Malaysia", country_id: 1, city: "Johor Bahru", logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop", description: "Leading technical university with strong engineering programs and industry partnerships.", ranking: 188, global_score: 74, totalStudents: 22000, internationalRatio: 18, established: 1972, campusSize: "1200 Acres", aboutText: "Universiti Teknologi Malaysia (UTM) is a premier science and technology university committed to developing creative and innovative human capital. With a sprawling 1200-acre campus in Johor Bahru, UTM is known for its engineering programs and deep industry ties with companies like Petronas and Intel.", studyReasons: ["Leading engineering and technology programs", "Massive 1200-acre campus with cutting-edge labs", "Strong industry partnerships with Fortune 500 companies", "Affordable living costs in Johor Bahru", "Dedicated international student support", "Active student clubs and sports facilities"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 3, name: "Monash University Malaysia", country_id: 1, city: "Subang Jaya", logo_url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&h=600&fit=crop", description: "A branch campus of Australia's prestigious Monash University with world-class facilities.", ranking: 42, global_score: 91, totalStudents: 8500, internationalRatio: 40, established: 1998, campusSize: "65 Acres", aboutText: "Monash University Malaysia is the largest campus outside Australia of the prestigious Monash University. Located in Subang Jaya, it offers Australian-quality education at Malaysian prices. Students receive a Monash Australia degree while benefiting from Southeast Asia's dynamic growth.", studyReasons: ["Australian degree at a fraction of the cost", "40% international student community", "World-class medical and engineering programs", "Seamless transfer pathways to Australia campus", "Modern campus with state-of-the-art facilities", "Strong alumni network across Asia-Pacific"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 4, name: "Taylor's University", country_id: 1, city: "Subang Jaya", logo_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&h=600&fit=crop", description: "Premier private university known for hospitality and business programs.", ranking: 284, global_score: 68, totalStudents: 12000, internationalRatio: 22, established: 1969, campusSize: "27 Acres", aboutText: "Taylor's University is Malaysia's top private university, ranked among the world's best for hospitality and leisure management. Its lakeside campus in Subang Jaya offers a vibrant student experience with modern facilities, industry-linked programs, and a strong entrepreneurial culture.", studyReasons: ["#1 in Malaysia for Hospitality & Tourism", "Award-winning lakeside campus", "Industry-integrated curriculum with internships", "Entrepreneurship hub and startup incubator", "Diverse student body from 80+ countries", "Strong career services and employer connections"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 5, name: "UCSI University", country_id: 1, city: "Kuala Lumpur", logo_url: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1200&h=600&fit=crop", description: "Top private university with diverse programs and global partnerships.", ranking: 347, global_score: 63, totalStudents: 10000, internationalRatio: 30, established: 1986, campusSize: "19 Acres", aboutText: "UCSI University is one of Malaysia's leading private universities, recognized for its commitment to praxis-oriented education. With campuses in KL, Kuching, and Springhill, UCSI offers a diverse range of programs with strong emphasis on practical, hands-on learning.", studyReasons: ["Praxis-oriented education philosophy", "30% international student population", "Strong music and pharmacy programs", "Multiple campus locations in Malaysia", "Industry-certified training programs", "Active research culture with funded projects"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 6, name: "Universiti Putra Malaysia", country_id: 1, city: "Serdang", logo_url: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=1200&h=600&fit=crop", description: "Research-intensive university with agriculture and science focus.", ranking: 123, global_score: 81, totalStudents: 30000, internationalRatio: 15, established: 1931, campusSize: "1500 Acres", aboutText: "Universiti Putra Malaysia (UPM) is a leading research university with roots in agriculture and a modern focus spanning science, engineering, and the humanities. Its massive 1500-acre campus in Serdang is one of the most beautiful in Malaysia.", studyReasons: ["Top 5 in Malaysia for research output", "Massive 1500-acre green campus", "World-leading agricultural science programs", "Affordable tuition and living costs", "Strong postgraduate research community", "Excellent sports and recreational facilities"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 7, name: "University of Oxford", country_id: 2, city: "Oxford", logo_url: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1548793977-f8c4c0c28cd2?w=1200&h=600&fit=crop", description: "World-leading research and teaching university with centuries of academic excellence.", ranking: 1, global_score: 99, totalStudents: 26000, internationalRatio: 45, established: 1096, campusSize: "Historic City Campus", aboutText: "The University of Oxford is the oldest university in the English-speaking world, with evidence of teaching dating back to 1096. It consistently ranks as one of the top universities globally, known for its tutorial-based teaching system, world-class research, and a unique collegiate structure.", studyReasons: ["#1 ranked university in the world", "Tutorial-based teaching with world-leading scholars", "Historic college system with rich traditions", "Unmatched global alumni network", "Cutting-edge research across all disciplines", "Vibrant city with centuries of academic heritage"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 8, name: "University of Melbourne", country_id: 3, city: "Melbourne", logo_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=600&fit=crop", description: "Australia's leading university with cutting-edge research programs.", ranking: 14, global_score: 96, totalStudents: 52000, internationalRatio: 42, established: 1853, campusSize: "350 Acres", aboutText: "The University of Melbourne is Australia's second-oldest university and consistently ranks as the country's top institution. Located in one of the world's most liveable cities, it offers a Melbourne Model of education that provides broad undergraduate training before specialisation.", studyReasons: ["Australia's #1 ranked university", "Located in the world's most liveable city", "Innovative Melbourne Model curriculum", "42% international student community", "World-class research in biomedical sciences", "Strong connections to Asia-Pacific industries"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 9, name: "University of Toronto", country_id: 4, city: "Toronto", logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop", description: "Canada's top-ranked university with a diverse global community.", ranking: 18, global_score: 95, totalStudents: 97000, internationalRatio: 28, established: 1827, campusSize: "700 Acres", aboutText: "The University of Toronto is Canada's premier institution and one of the world's top research universities. Spread across three campuses in the Greater Toronto Area, it offers an extraordinary range of programs and is home to groundbreaking research in AI, medicine, and engineering.", studyReasons: ["Canada's #1 ranked university", "Pioneering AI and machine learning research", "Three diverse campuses in Toronto", "Post-graduation work permits available", "Highly multicultural student body", "Strong ties to Canada's booming tech industry"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 10, name: "Asia Pacific University (APU)", country_id: 1, city: "Kuala Lumpur", logo_url: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1200&h=600&fit=crop", description: "Award-winning university specialising in technology, innovation, and digital skills.", ranking: 450, global_score: 60, totalStudents: 13000, internationalRatio: 50, established: 1993, campusSize: "Modern Campus", aboutText: "Asia Pacific University (APU) is one of Malaysia's most international universities, with students from over 130 countries making up 50% of its student body. Located in the Technology Park Malaysia, APU specialises in computing, engineering, and business programs with strong industry partnerships.", studyReasons: ["50% international student body from 130+ countries", "Specialised in technology and digital innovation", "Located in Technology Park Malaysia", "Award-winning teaching and learning", "Strong employability rate of 100% within 6 months", "Industry-certified programs (Cisco, Oracle, IBM)"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 11, name: "HELP University", country_id: 1, city: "Kuala Lumpur", logo_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&h=600&fit=crop", description: "Leading private university with strong psychology and business faculties.", ranking: 520, global_score: 55, totalStudents: 8000, internationalRatio: 15, established: 1986, campusSize: "Urban Campus", aboutText: "HELP University is renowned for its psychology and business programs, consistently producing top-performing graduates. Located in the heart of Kuala Lumpur, HELP offers a supportive learning environment with small class sizes and personalised mentoring.", studyReasons: ["Top psychology program in Malaysia", "Small class sizes for personalised learning", "Central KL location with excellent connectivity", "Strong career counselling services", "Affordable tuition with scholarship options", "Active student clubs and professional societies"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 12, name: "Imperial College London", country_id: 2, city: "London", logo_url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&h=600&fit=crop", description: "World-renowned STEM-focused institution in the heart of London.", ranking: 6, global_score: 97, totalStudents: 22000, internationalRatio: 60, established: 1907, campusSize: "South Kensington Campus", aboutText: "Imperial College London is a world-leading STEM-focused university located in South Kensington, London. Known for its rigorous academic standards and groundbreaking research in science, engineering, medicine, and business, Imperial attracts top talent from around the globe.", studyReasons: ["Top 10 globally for STEM subjects", "Located in prestigious South Kensington, London", "60% international student community", "Cutting-edge research labs and facilities", "Strong industry links with leading tech firms", "Excellent graduate employment outcomes"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 13, name: "University of Cambridge", country_id: 2, city: "Cambridge", logo_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=600&fit=crop", description: "One of the world's oldest and most prestigious universities.", ranking: 2, global_score: 99, totalStudents: 24000, internationalRatio: 40, established: 1209, campusSize: "Historic Collegiate Campus", aboutText: "The University of Cambridge is the second-oldest university in the English-speaking world, famous for its collegiate system, world-class research, and the production of Nobel laureates. Cambridge offers an unparalleled academic experience in one of the most beautiful university cities in the world.", studyReasons: ["#2 ranked university in the world", "31 historic colleges to choose from", "121 Nobel Prize affiliates", "Supervision-based teaching system", "Unrivalled library and archive collections", "Beautiful historic city campus"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 14, name: "University of Sydney", country_id: 3, city: "Sydney", logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop", description: "Australia's first university with a global reputation for excellence.", ranking: 19, global_score: 94, totalStudents: 73000, internationalRatio: 38, established: 1850, campusSize: "180 Acres", aboutText: "The University of Sydney is Australia's first university, established in 1850. Known for its sandstone architecture, cutting-edge research, and diverse student community, it consistently ranks among the top 20 universities globally.", studyReasons: ["Australia's first and most iconic university", "Located in the vibrant city of Sydney", "World-class facilities and research centres", "38% international student body", "Strong post-study work rights in Australia", "Beautiful heritage-listed campus"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 15, name: "University of Queensland", country_id: 3, city: "Brisbane", logo_url: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=1200&h=600&fit=crop", description: "Top research university known for innovation and sustainability.", ranking: 43, global_score: 90, totalStudents: 55000, internationalRatio: 32, established: 1909, campusSize: "274 Acres", aboutText: "The University of Queensland (UQ) is one of Australia's leading research-intensive institutions, known for its commitment to sustainability, innovation, and teaching excellence. Its St Lucia campus in Brisbane is one of the most beautiful in Australia.", studyReasons: ["Top 50 globally with strong research output", "Brisbane's affordable and sunny lifestyle", "Leader in sustainability and environmental science", "Beautiful riverside campus", "Strong employability and career services", "Supportive international student community"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 16, name: "McGill University", country_id: 4, city: "Montreal", logo_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&h=600&fit=crop", description: "Prestigious Canadian university with bilingual heritage and strong medical faculty.", ranking: 31, global_score: 92, totalStudents: 40000, internationalRatio: 30, established: 1821, campusSize: "80 Acres", aboutText: "McGill University in Montreal is one of Canada's most prestigious institutions, known worldwide for its medical school, engineering programs, and bilingual environment. Located in the vibrant city of Montreal, McGill attracts students from over 150 countries.", studyReasons: ["Top 30 globally with world-class medical school", "Bilingual French-English environment in Montreal", "Affordable tuition compared to US peers", "Vibrant cultural scene and student life", "Post-graduation work permit pathways", "Strong alumni network including 12 Nobel laureates"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 17, name: "University of British Columbia", country_id: 4, city: "Vancouver", logo_url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&h=600&fit=crop", description: "Top Canadian university surrounded by mountains and Pacific coastline.", ranking: 35, global_score: 91, totalStudents: 68000, internationalRatio: 33, established: 1908, campusSize: "1000 Acres", aboutText: "The University of British Columbia (UBC) is set on 1000 acres of stunning Pacific coast land in Vancouver, one of the world's most liveable cities. UBC is a global leader in sustainability, computer science, and life sciences research.", studyReasons: ["Stunning 1000-acre campus on the Pacific coast", "Located in the world's most liveable city", "Leader in sustainability and clean technology", "Strong computer science and AI programs", "33% international student community", "Excellent co-op and internship opportunities"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 18, name: "Sunway University", country_id: 1, city: "Subang Jaya", logo_url: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1200&h=600&fit=crop", description: "Rapidly growing private university with Lancaster University partnerships.", ranking: 580, global_score: 52, totalStudents: 9000, internationalRatio: 20, established: 2004, campusSize: "Integrated Resort Campus", aboutText: "Sunway University is part of the Sunway Education Group and offers dual-degree programs with Lancaster University, UK. Located within the vibrant Sunway City integrated township, students enjoy world-class facilities including a medical centre, shopping mall, and theme park.", studyReasons: ["Dual-degree programs with Lancaster University", "Integrated township with all amenities", "Modern campus with green building design", "Strong business and computing programs", "Active student exchange opportunities", "Scholarship programs for top achievers"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 19, name: "University of Edinburgh", country_id: 2, city: "Edinburgh", logo_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=600&fit=crop", description: "Scotland's leading university known for arts, sciences, and medicine.", ranking: 15, global_score: 95, totalStudents: 45000, internationalRatio: 46, established: 1583, campusSize: "Historic City Campus", aboutText: "The University of Edinburgh is one of the world's top 20 universities, located in Scotland's historic and culturally rich capital. Founded in 1583, it has produced countless world leaders, scientists, and writers, including Charles Darwin and Alexander Graham Bell.", studyReasons: ["Top 15 globally with 400+ years of history", "Located in a UNESCO World Heritage city", "46% international student population", "Leading AI and data science research hub", "Vibrant arts and cultural scene", "Three-year undergraduate degrees saving time and money"], faqs: defaultFaqs, registrationSteps: defaultSteps },
  { id: 20, name: "Multimedia University", country_id: 1, city: "Cyberjaya", logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop", heroImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop", description: "Pioneer in multimedia and IT education in Malaysia.", ranking: 600, global_score: 50, totalStudents: 18000, internationalRatio: 12, established: 1996, campusSize: "Cyberjaya & Melaka Campuses", aboutText: "Multimedia University (MMU) was Malaysia's first private university dedicated to ICT and multimedia education. Located in the tech hub of Cyberjaya, MMU is a pioneer in creative technology, film, and animation education, producing graduates who lead Malaysia's digital economy.", studyReasons: ["Pioneer in multimedia and ICT education", "Located in Malaysia's tech hub Cyberjaya", "Award-winning film and animation programs", "Strong ties with Telekom Malaysia", "Affordable tuition and living costs", "Active esports and gaming community"], faqs: defaultFaqs, registrationSteps: defaultSteps },
];

export const courses: Course[] = [
  { id: 1, title: "Bachelor of Computer Science", university_id: 1, degree_level: "Bachelor", tuition_fee: 12000, duration: "3 years", intake_months: ["March", "September"], overview: "This program equips students with a strong foundation in algorithms, software engineering, data structures, and AI. Graduates are prepared for careers in the rapidly growing tech industry across Southeast Asia and beyond.", curriculum: [{ year: "Year 1", modules: ["Introduction to Programming", "Discrete Mathematics", "Computer Architecture", "Web Development Fundamentals"] }, { year: "Year 2", modules: ["Data Structures & Algorithms", "Database Systems", "Operating Systems", "Software Engineering"] }, { year: "Year 3", modules: ["Artificial Intelligence", "Cloud Computing", "Capstone Project", "Cybersecurity Fundamentals"] }], entryRequirements: { gpa: 3.0, ielts: 6.0 }, careerOutcomes: ["Software Engineer", "Data Analyst", "Full-Stack Developer", "Systems Architect", "DevOps Engineer", "AI/ML Engineer"] },
  { id: 2, title: "Master of Business Administration", university_id: 1, degree_level: "Master", tuition_fee: 18000, duration: "2 years", intake_months: ["September"], overview: "A transformative MBA program designed for aspiring leaders. Covers strategic management, finance, marketing, and entrepreneurship with real-world case studies and industry projects.", curriculum: [{ year: "Year 1", modules: ["Strategic Management", "Financial Accounting", "Marketing Management", "Organizational Behaviour"] }, { year: "Year 2", modules: ["Entrepreneurship & Innovation", "Global Business Strategy", "Leadership Seminar", "MBA Capstone Project"] }], entryRequirements: { gpa: 3.2, ielts: 6.5 }, careerOutcomes: ["Business Consultant", "Marketing Director", "Product Manager", "Startup Founder", "Operations Manager"] },
  { id: 3, title: "Bachelor of Engineering (Mechanical)", university_id: 2, degree_level: "Bachelor", tuition_fee: 14000, duration: "4 years", intake_months: ["February", "September"], overview: "A comprehensive mechanical engineering program covering thermodynamics, materials science, and manufacturing processes with hands-on lab experience.", curriculum: [{ year: "Year 1", modules: ["Engineering Mathematics", "Physics for Engineers", "Engineering Drawing", "Workshop Practice"] }, { year: "Year 2", modules: ["Thermodynamics", "Mechanics of Materials", "Fluid Mechanics", "Manufacturing Processes"] }, { year: "Year 3", modules: ["Machine Design", "Control Systems", "Heat Transfer", "Industrial Training"] }, { year: "Year 4", modules: ["Finite Element Analysis", "Robotics", "Final Year Project", "Professional Ethics"] }], entryRequirements: { gpa: 3.0, ielts: 5.5 }, careerOutcomes: ["Mechanical Engineer", "Design Engineer", "Project Manager", "Manufacturing Engineer", "R&D Engineer"] },
  { id: 4, title: "Bachelor of Medicine (MBBS)", university_id: 3, degree_level: "Bachelor", tuition_fee: 45000, duration: "5 years", intake_months: ["March"], overview: "A world-class medical program offering clinical rotations at leading hospitals. Graduates are eligible to practice medicine globally with additional licensing.", curriculum: [{ year: "Year 1-2", modules: ["Anatomy", "Biochemistry", "Physiology", "Pathology", "Pharmacology"] }, { year: "Year 3-4", modules: ["Clinical Medicine", "Surgery", "Paediatrics", "Obstetrics & Gynaecology"] }, { year: "Year 5", modules: ["Hospital Rotations", "Emergency Medicine", "Community Medicine", "Final Clinical Exams"] }], entryRequirements: { gpa: 3.7, ielts: 7.0 }, careerOutcomes: ["Medical Doctor", "Surgeon", "Specialist Physician", "Medical Researcher", "Hospital Administrator"] },
  { id: 5, title: "Diploma in Culinary Arts", university_id: 4, degree_level: "Foundation", tuition_fee: 8000, duration: "2 years", intake_months: ["January", "May", "September"], overview: "Hands-on culinary training covering international cuisines, pastry arts, food safety, and restaurant management in professional kitchen facilities.", curriculum: [{ year: "Year 1", modules: ["Culinary Fundamentals", "Food Safety & Hygiene", "Pastry & Bakery Basics", "Asian Cuisines"] }, { year: "Year 2", modules: ["Western Cuisines", "Restaurant Management", "Food Photography", "Industry Internship"] }], entryRequirements: { gpa: 2.5, ielts: 5.0 }, careerOutcomes: ["Chef de Partie", "Pastry Chef", "Restaurant Manager", "Food Consultant", "Catering Manager"] },
  { id: 6, title: "Bachelor of Pharmacy", university_id: 5, degree_level: "Bachelor", tuition_fee: 16000, duration: "4 years", intake_months: ["March", "September"], overview: "A rigorous pharmacy program covering pharmaceutical sciences, clinical pharmacy, and drug development with extensive practical training.", curriculum: [{ year: "Year 1", modules: ["Pharmaceutical Chemistry", "Human Anatomy", "Microbiology", "Mathematics for Pharmacy"] }, { year: "Year 2", modules: ["Pharmacology", "Pharmaceutical Analysis", "Medicinal Chemistry", "Pharmacognosy"] }, { year: "Year 3", modules: ["Clinical Pharmacy", "Hospital Pharmacy Practice", "Drug Formulation", "Regulatory Affairs"] }, { year: "Year 4", modules: ["Advanced Pharmacotherapy", "Research Project", "Community Pharmacy Internship", "Professional Practice"] }], entryRequirements: { gpa: 3.2, ielts: 6.0 }, careerOutcomes: ["Hospital Pharmacist", "Clinical Pharmacist", "Pharmaceutical Researcher", "Regulatory Affairs Specialist", "Drug Safety Officer"] },
  { id: 7, title: "PhD in Agricultural Science", university_id: 6, degree_level: "PhD", tuition_fee: 10000, duration: "3 years", intake_months: ["February"], overview: "An advanced research program focused on sustainable agriculture, crop science, and food security. Students conduct original research under expert supervision.", curriculum: [{ year: "Year 1", modules: ["Research Methodology", "Advanced Crop Science", "Soil Science & Sustainability", "Literature Review"] }, { year: "Year 2", modules: ["Fieldwork & Data Collection", "Statistical Analysis", "Publication Writing", "Conference Presentation"] }, { year: "Year 3", modules: ["Thesis Writing", "Viva Voce Preparation", "Knowledge Transfer", "Final Defence"] }], entryRequirements: { gpa: 3.5, ielts: 6.5 }, careerOutcomes: ["Agricultural Researcher", "University Lecturer", "Policy Advisor", "Agri-Tech Consultant", "Sustainability Officer"] },
  { id: 8, title: "Master of Data Science", university_id: 1, degree_level: "Master", tuition_fee: 20000, duration: "2 years", intake_months: ["September"], overview: "A cutting-edge program combining statistics, machine learning, and big data analytics. Ideal for professionals transitioning into data-driven roles.", curriculum: [{ year: "Year 1", modules: ["Statistical Learning", "Big Data Technologies", "Machine Learning", "Data Visualization"] }, { year: "Year 2", modules: ["Deep Learning", "Natural Language Processing", "Capstone Project", "Ethics in AI"] }], entryRequirements: { gpa: 3.0, ielts: 6.5 }, careerOutcomes: ["Data Scientist", "Machine Learning Engineer", "Business Intelligence Analyst", "AI Researcher", "Chief Data Officer"] },
  { id: 9, title: "Bachelor of Hospitality Management", university_id: 4, degree_level: "Bachelor", tuition_fee: 15000, duration: "3 years", intake_months: ["January", "September"], overview: "Combines business management with hands-on hospitality training. Students gain experience through internships at 5-star hotels and resorts.", curriculum: [{ year: "Year 1", modules: ["Introduction to Hospitality", "Food & Beverage Operations", "Front Office Management", "Business Communication"] }, { year: "Year 2", modules: ["Revenue Management", "Event Planning", "Housekeeping Management", "Industry Internship"] }, { year: "Year 3", modules: ["Strategic Hotel Management", "Tourism Marketing", "Hospitality Entrepreneurship", "Final Year Project"] }], entryRequirements: { gpa: 2.8, ielts: 5.5 }, careerOutcomes: ["Hotel Manager", "Event Coordinator", "Tourism Officer", "F&B Director", "Hospitality Consultant"] },
  { id: 10, title: "Master of Engineering (Electrical)", university_id: 2, degree_level: "Master", tuition_fee: 16000, duration: "2 years", intake_months: ["September"], overview: "Advanced electrical engineering covering power systems, telecommunications, and embedded systems with research-oriented coursework.", curriculum: [{ year: "Year 1", modules: ["Advanced Power Systems", "Digital Signal Processing", "Embedded Systems Design", "Research Methods"] }, { year: "Year 2", modules: ["IoT & Smart Systems", "Renewable Energy Engineering", "Dissertation", "Industry Seminar"] }], entryRequirements: { gpa: 3.0, ielts: 6.0 }, careerOutcomes: ["Electrical Engineer", "Power Systems Analyst", "Telecommunications Engineer", "IoT Specialist", "R&D Manager"] },
  { id: 11, title: "MSc Computer Science", university_id: 7, degree_level: "Master", tuition_fee: 35000, duration: "1 year", intake_months: ["October"], overview: "A prestigious one-year programme at Oxford covering advanced computing theory, AI, and software engineering with world-leading research faculty.", curriculum: [{ year: "Year 1", modules: ["Advanced Algorithms", "Machine Learning", "Quantum Computing", "Dissertation"] }], entryRequirements: { gpa: 3.7, ielts: 7.5 }, careerOutcomes: ["Research Scientist", "Software Architect", "Quantitative Analyst", "Tech Lead", "AI Researcher"] },
  { id: 12, title: "Bachelor of Arts", university_id: 8, degree_level: "Bachelor", tuition_fee: 28000, duration: "3 years", intake_months: ["February", "July"], overview: "A broad liberal arts degree with majors in English, History, Philosophy, and Cultural Studies at one of Australia's leading universities.", curriculum: [{ year: "Year 1", modules: ["Critical Thinking", "Introduction to Literature", "World History", "Academic Writing"] }, { year: "Year 2", modules: ["Cultural Studies", "Philosophy of Mind", "Media & Communication", "Research Methods"] }, { year: "Year 3", modules: ["Honours Thesis", "Advanced Seminar", "Professional Practicum", "Elective Major"] }], entryRequirements: { gpa: 2.8, ielts: 6.5 }, careerOutcomes: ["Journalist", "Policy Analyst", "Content Strategist", "Cultural Consultant", "PR Manager"] },
  { id: 13, title: "Master of Finance", university_id: 9, degree_level: "Master", tuition_fee: 42000, duration: "2 years", intake_months: ["September"], overview: "An elite finance program covering investment banking, risk management, and financial modelling with CFA preparation integrated into the curriculum.", curriculum: [{ year: "Year 1", modules: ["Corporate Finance", "Financial Modelling", "Risk Management", "Econometrics"] }, { year: "Year 2", modules: ["Portfolio Management", "Derivatives & Options", "Fintech Innovation", "Capstone Project"] }], entryRequirements: { gpa: 3.5, ielts: 7.0 }, careerOutcomes: ["Investment Banker", "Financial Analyst", "Risk Manager", "Portfolio Manager", "CFO"] },
  { id: 14, title: "Foundation in Science", university_id: 10, degree_level: "Foundation", tuition_fee: 6000, duration: "1 year", intake_months: ["January", "May", "September"], overview: "A pathway program preparing students for degree-level studies in IT, engineering, and science disciplines.", curriculum: [{ year: "Year 1", modules: ["Mathematics", "Physics", "Chemistry", "English Proficiency", "IT Fundamentals"] }], entryRequirements: { gpa: 2.0, ielts: 5.0 }, careerOutcomes: ["Progress to Bachelor's Degree"] },
  { id: 15, title: "Bachelor of Software Engineering", university_id: 10, degree_level: "Bachelor", tuition_fee: 13000, duration: "3 years", intake_months: ["March", "September"], overview: "Focuses on software design patterns, agile methodologies, and full-stack development with industry certifications included.", curriculum: [{ year: "Year 1", modules: ["Programming Fundamentals", "Web Technologies", "Mathematics for Computing", "Database Design"] }, { year: "Year 2", modules: ["Software Architecture", "Mobile App Development", "Agile Project Management", "UI/UX Design"] }, { year: "Year 3", modules: ["Cloud Architecture", "DevOps Practices", "Industry Project", "Entrepreneurship"] }], entryRequirements: { gpa: 2.8, ielts: 5.5 }, careerOutcomes: ["Software Developer", "Mobile App Developer", "QA Engineer", "Scrum Master", "Technical Project Manager"] },
  { id: 16, title: "Bachelor of Psychology", university_id: 11, degree_level: "Bachelor", tuition_fee: 11000, duration: "3 years", intake_months: ["January", "September"], overview: "An accredited psychology program covering clinical, developmental, and organizational psychology with supervised practicum.", curriculum: [{ year: "Year 1", modules: ["Introduction to Psychology", "Biological Psychology", "Statistics for Psychology", "Developmental Psychology"] }, { year: "Year 2", modules: ["Cognitive Psychology", "Social Psychology", "Research Methods", "Abnormal Psychology"] }, { year: "Year 3", modules: ["Clinical Psychology", "Counselling Practicum", "Honours Research", "Organizational Psychology"] }], entryRequirements: { gpa: 3.0, ielts: 6.0 }, careerOutcomes: ["Clinical Psychologist", "Counsellor", "HR Specialist", "UX Researcher", "Organizational Consultant"] },
  { id: 17, title: "Master of Biotechnology", university_id: 12, degree_level: "Master", tuition_fee: 38000, duration: "1 year", intake_months: ["October"], overview: "An intensive programme combining molecular biology, bioinformatics, and pharmaceutical biotechnology at Imperial College London.", curriculum: [{ year: "Year 1", modules: ["Molecular Biology", "Bioinformatics", "Pharmaceutical Biotechnology", "Research Project"] }], entryRequirements: { gpa: 3.5, ielts: 7.0 }, careerOutcomes: ["Biotech Researcher", "Pharmaceutical Scientist", "Bioinformatics Analyst", "Lab Director", "Patent Attorney"] },
  { id: 18, title: "PhD in Artificial Intelligence", university_id: 12, degree_level: "PhD", tuition_fee: 30000, duration: "4 years", intake_months: ["October"], overview: "Cutting-edge AI research programme at Imperial, focusing on deep learning, computer vision, and natural language processing.", curriculum: [{ year: "Year 1", modules: ["Advanced Machine Learning", "Research Proposal", "Literature Survey", "Teaching Assistantship"] }, { year: "Year 2-3", modules: ["Original Research", "Paper Publications", "Conference Presentations", "Collaboration Projects"] }, { year: "Year 4", modules: ["Thesis Completion", "Viva Voce", "Knowledge Transfer", "Career Development"] }], entryRequirements: { gpa: 3.7, ielts: 7.0 }, careerOutcomes: ["AI Research Scientist", "Professor", "Chief AI Officer", "Tech Entrepreneur", "Principal Engineer"] },
  { id: 19, title: "Bachelor of Law (LLB)", university_id: 13, degree_level: "Bachelor", tuition_fee: 40000, duration: "3 years", intake_months: ["October"], overview: "One of the world's most prestigious law programmes, covering English law, international law, and jurisprudence at Cambridge.", curriculum: [{ year: "Year 1", modules: ["Constitutional Law", "Criminal Law", "Contract Law", "Tort Law"] }, { year: "Year 2", modules: ["EU Law", "Property Law", "Equity & Trusts", "Public International Law"] }, { year: "Year 3", modules: ["Jurisprudence", "Dissertation", "Commercial Law", "Human Rights Law"] }], entryRequirements: { gpa: 3.8, ielts: 7.5 }, careerOutcomes: ["Barrister", "Solicitor", "Legal Advisor", "Judge", "Policy Maker"] },
  { id: 20, title: "Foundation in Engineering", university_id: 14, degree_level: "Foundation", tuition_fee: 9000, duration: "1 year", intake_months: ["February", "July"], overview: "A preparatory program for engineering degrees at the University of Sydney covering mathematics, physics, and computing.", curriculum: [{ year: "Year 1", modules: ["Advanced Mathematics", "Physics", "Engineering Computing", "Academic English", "Chemistry"] }], entryRequirements: { gpa: 2.2, ielts: 5.5 }, careerOutcomes: ["Progress to Bachelor of Engineering"] },
  { id: 21, title: "Bachelor of Nursing", university_id: 14, degree_level: "Bachelor", tuition_fee: 32000, duration: "3 years", intake_months: ["February"], overview: "An accredited nursing program with extensive clinical placements across Sydney's top hospitals.", curriculum: [{ year: "Year 1", modules: ["Anatomy & Physiology", "Foundations of Nursing", "Health Assessment", "Pharmacology"] }, { year: "Year 2", modules: ["Medical-Surgical Nursing", "Mental Health Nursing", "Clinical Placement I", "Evidence-Based Practice"] }, { year: "Year 3", modules: ["Advanced Clinical Practice", "Community Health", "Leadership in Nursing", "Clinical Placement II"] }], entryRequirements: { gpa: 3.0, ielts: 7.0 }, careerOutcomes: ["Registered Nurse", "Clinical Nurse Specialist", "Nurse Practitioner", "Healthcare Manager", "Nursing Educator"] },
  { id: 22, title: "Master of Environmental Science", university_id: 15, degree_level: "Master", tuition_fee: 34000, duration: "2 years", intake_months: ["February", "July"], overview: "An interdisciplinary program tackling climate change, conservation biology, and sustainable development.", curriculum: [{ year: "Year 1", modules: ["Environmental Policy", "Climate Science", "Conservation Biology", "GIS & Remote Sensing"] }, { year: "Year 2", modules: ["Sustainable Development", "Environmental Impact Assessment", "Research Thesis", "Field Studies"] }], entryRequirements: { gpa: 3.0, ielts: 6.5 }, careerOutcomes: ["Environmental Consultant", "Sustainability Manager", "Conservation Scientist", "Policy Advisor", "Climate Analyst"] },
  { id: 23, title: "Bachelor of Commerce", university_id: 16, degree_level: "Bachelor", tuition_fee: 36000, duration: "4 years", intake_months: ["September"], overview: "A comprehensive commerce degree at McGill with concentrations in finance, accounting, marketing, and management.", curriculum: [{ year: "Year 1", modules: ["Microeconomics", "Macroeconomics", "Financial Accounting", "Statistics"] }, { year: "Year 2", modules: ["Corporate Finance", "Marketing Principles", "Operations Management", "Business Law"] }, { year: "Year 3", modules: ["Strategic Management", "International Business", "Concentration Electives", "Internship"] }, { year: "Year 4", modules: ["Advanced Finance", "Business Ethics", "Capstone Project", "Elective Seminar"] }], entryRequirements: { gpa: 3.3, ielts: 6.5 }, careerOutcomes: ["Financial Analyst", "Management Consultant", "Marketing Manager", "Accountant", "Entrepreneur"] },
  { id: 24, title: "PhD in Physics", university_id: 16, degree_level: "PhD", tuition_fee: 25000, duration: "4 years", intake_months: ["September", "January"], overview: "A rigorous physics research program at McGill covering particle physics, condensed matter, and astrophysics.", curriculum: [{ year: "Year 1", modules: ["Quantum Mechanics II", "Statistical Mechanics", "Research Proposal", "Teaching Assistantship"] }, { year: "Year 2-3", modules: ["Original Research", "Lab Work", "Publications", "Conference Attendance"] }, { year: "Year 4", modules: ["Thesis Writing", "Defence Preparation", "Postdoc Applications", "Final Seminar"] }], entryRequirements: { gpa: 3.5, ielts: 6.5 }, careerOutcomes: ["Research Physicist", "University Professor", "Data Scientist", "Quantitative Analyst", "Lab Director"] },
  { id: 25, title: "Master of Computer Science", university_id: 17, degree_level: "Master", tuition_fee: 40000, duration: "2 years", intake_months: ["September"], overview: "An advanced CS program at UBC with specialisations in AI, systems, and human-computer interaction.", curriculum: [{ year: "Year 1", modules: ["Advanced Algorithms", "Computer Vision", "Distributed Systems", "HCI Research"] }, { year: "Year 2", modules: ["Thesis Research", "Machine Learning Systems", "Industry Collaboration", "Thesis Defence"] }], entryRequirements: { gpa: 3.3, ielts: 7.0 }, careerOutcomes: ["Software Architect", "ML Engineer", "Research Scientist", "Tech Lead", "Startup CTO"] },
  { id: 26, title: "Bachelor of Accounting", university_id: 18, degree_level: "Bachelor", tuition_fee: 10000, duration: "3 years", intake_months: ["January", "March", "September"], overview: "An ACCA-accredited accounting program with exemptions covering financial reporting, auditing, and taxation.", curriculum: [{ year: "Year 1", modules: ["Financial Accounting", "Business Mathematics", "Economics", "Business Law"] }, { year: "Year 2", modules: ["Management Accounting", "Taxation", "Auditing", "Corporate Finance"] }, { year: "Year 3", modules: ["Advanced Financial Reporting", "Strategic Management Accounting", "Internship", "Final Year Project"] }], entryRequirements: { gpa: 2.5, ielts: 5.5 }, careerOutcomes: ["Chartered Accountant", "Auditor", "Tax Consultant", "Financial Controller", "CFO"] },
  { id: 27, title: "Foundation in Business", university_id: 18, degree_level: "Foundation", tuition_fee: 5500, duration: "1 year", intake_months: ["January", "May", "September"], overview: "A pathway into business degrees covering accounting, economics, and business fundamentals.", curriculum: [{ year: "Year 1", modules: ["Business Studies", "Accounting Principles", "Economics", "Mathematics", "English for Academic Purposes"] }], entryRequirements: { gpa: 2.0, ielts: 5.0 }, careerOutcomes: ["Progress to Bachelor's Degree"] },
  { id: 28, title: "Master of Public Health", university_id: 19, degree_level: "Master", tuition_fee: 33000, duration: "1 year", intake_months: ["September"], overview: "A globally recognised MPH at Edinburgh covering epidemiology, health policy, and global health challenges.", curriculum: [{ year: "Year 1", modules: ["Epidemiology", "Biostatistics", "Health Policy", "Global Health", "Dissertation"] }], entryRequirements: { gpa: 3.2, ielts: 7.0 }, careerOutcomes: ["Public Health Officer", "Epidemiologist", "Health Policy Advisor", "WHO Consultant", "NGO Director"] },
  { id: 29, title: "Bachelor of Multimedia Design", university_id: 20, degree_level: "Bachelor", tuition_fee: 9000, duration: "3 years", intake_months: ["February", "September"], overview: "A creative program covering 3D animation, motion graphics, and interactive media at Malaysia's pioneer multimedia university.", curriculum: [{ year: "Year 1", modules: ["Design Fundamentals", "Digital Illustration", "Photography", "Web Design"] }, { year: "Year 2", modules: ["3D Modelling", "Motion Graphics", "UI/UX Design", "Video Production"] }, { year: "Year 3", modules: ["Advanced Animation", "Interactive Media", "Portfolio Project", "Industry Internship"] }], entryRequirements: { gpa: 2.5, ielts: 5.5 }, careerOutcomes: ["Graphic Designer", "Motion Graphics Artist", "UI/UX Designer", "3D Animator", "Creative Director"] },
  { id: 30, title: "Master of Cybersecurity", university_id: 20, degree_level: "Master", tuition_fee: 14000, duration: "2 years", intake_months: ["September"], overview: "An industry-aligned cybersecurity program covering ethical hacking, digital forensics, and security architecture.", curriculum: [{ year: "Year 1", modules: ["Network Security", "Ethical Hacking", "Cryptography", "Digital Forensics"] }, { year: "Year 2", modules: ["Security Architecture", "Incident Response", "Research Project", "Cloud Security"] }], entryRequirements: { gpa: 3.0, ielts: 6.0 }, careerOutcomes: ["Security Analyst", "Penetration Tester", "CISO", "Security Consultant", "Forensics Investigator"] },
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
