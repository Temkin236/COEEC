import { NavItem, NewsItem, Department, StaffMember, ResearchProject } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Departments', path: '/departments' },
  { label: 'Staff', path: '/staff' },
  { label: 'Research', path: '/research' },
  { label: 'Academics', path: '/academics' },
  { label: 'Contact', path: '/contact' },
];

export const IMPACT_STATS = [
  { label: "Notable Alumni", value: "AAU Notable Alumni", icon: "Users", description: "Our university has produced numerous notable alumni" },
  { label: "Top Universities", value: "#1", icon: "Award", description: "Among Ethiopia's Top Universities" },
  { label: "Graduates", value: "120 K+", icon: "GraduationCap", description: "All Time Graduates" },
  { label: "Research", value: "5 K+", icon: "Search", description: "Scholarly Outputs Since 2014" },
];

export const QUICK_LINKS = [
  { label: "LIBRARY", url: "#" },
  { label: "E-LEARNING", url: "#" },
  { label: "CAMPUS LIFE", url: "#" },
  { label: "ALUMNI", url: "#" },
  { label: "MEET OUR STAFF", url: "/staff" },
];

export const UPCOMING_EVENTS = [
  { id: 1, day: "01", month: "Dec", title: "AAU 75th Diamond Jubilee Anniversary", time: "12 AM - Dec 31, 2025" },
  { id: 2, day: "15", month: "Jan", title: "International Conference on Green Energy", time: "9 AM - Jan 17, 2026" },
  { id: 3, day: "20", month: "Feb", title: "Annual Science & Tech Fair 2026", time: "10 AM - Feb 22, 2026" },
];

export const PARTNERS = [
  { name: "Sida", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Sida_logo.svg/1200px-Sida_logo.svg.png" },
  { name: "ASU", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Arizona_State_University_logo.svg/1200px-Arizona_State_University_logo.svg.png" },
  { name: "Ethio Telecom", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ethio_telecom_logo.png" }, // Placeholder
  { name: "Ministry of Education", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Emblem_of_Ethiopia.svg/1200px-Emblem_of_Ethiopia.svg.png" },
];

export const LATEST_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "COEEC Secures Grant for AI Research Lab",
    date: "November 10, 2025",
    category: "Research",
    excerpt: "The college has received significant funding to establish a state-of-the-art Artificial Intelligence research center aimed at solving local agricultural challenges.",
    image: "https://picsum.photos/800/600?random=1"
  },
  {
    id: 2,
    title: "AAU Showcases Digital Transformation",
    date: "November 05, 2025",
    category: "Conference",
    excerpt: "The university demonstrated its latest strides in digital education at the World Conference on Engineering Education.",
    image: "https://picsum.photos/800/600?random=2"
  },
  {
    id: 3,
    title: "Dr. Kebede Named Fellow of IEEE",
    date: "October 28, 2025",
    category: "Faculty",
    excerpt: "In recognition of his contributions to renewable energy systems, Dr. Kebede has been elevated to the grade of IEEE Fellow.",
    image: "https://picsum.photos/800/600?random=3"
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    description: "Focusing on software systems, AI, and cybersecurity to drive digital transformation.",
    head: "Dr. Sarah Ahmed",
    image: "https://picsum.photos/800/600?random=4",
    programs: ["B.Sc. Computer Science", "M.Sc. Software Engineering", "PhD AI & Data Science"]
  },
  {
    id: "ece",
    name: "Electrical & Computer Engineering",
    description: "Bridging hardware and software with a focus on embedded systems and telecommunications.",
    head: "Mr. Dawit Tadesse",
    image: "https://picsum.photos/800/600?random=5",
    programs: ["B.Sc. Electrical Engineering", "M.Sc. Communication Engineering"]
  },
  {
    id: "epce",
    name: "Electronics & Power Engineering",
    description: "Dedicated to power generation, distribution, and sustainable energy solutions.",
    head: "Dr. Solomon Bekele",
    image: "https://picsum.photos/800/600?random=6",
    programs: ["B.Sc. Power Engineering", "M.Sc. Power Systems"]
  }
];

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 1,
    name: "Dr. Berhanu Bulcha",
    role: "Dean of COEEC",
    department: "Computer Science & Engineering",
    researchAreas: ["Machine Learning", "Educational Technology"],
    email: "dean.coeec@astu.edu.et",
    image: "https://picsum.photos/300/300?random=7"
  },
  {
    id: 2,
    name: "Dr. Fikadu Tafesse",
    role: "Associate Professor",
    department: "Electronics & Power Engineering",
    researchAreas: ["Renewable Energy", "Smart Grids"],
    email: "fikadu.t@astu.edu.et",
    image: "https://picsum.photos/300/300?random=8"
  },
  {
    id: 3,
    name: "Ms. Tigist Alemu",
    role: "Lecturer",
    department: "Computer Science & Engineering",
    researchAreas: ["Cybersecurity", "Network Protocols"],
    email: "tigist.a@astu.edu.et",
    image: "https://picsum.photos/300/300?random=9"
  },
  {
    id: 4,
    name: "Mr. Henok Assefa",
    role: "Project Manager",
    department: "Administration",
    researchAreas: ["Project Management", "Software Architecture"],
    email: "henok.assefa@astu.edu.et",
    image: "https://picsum.photos/300/300?random=10"
  }
];

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 1,
    title: "Smart Agriculture IoT Network",
    lead: "Dr. Sarah Ahmed",
    status: "Ongoing",
    description: "Developing a sensor network to monitor soil moisture and automate irrigation for local farms in the Oromia region.",
    image: "https://picsum.photos/800/600?random=11"
  },
  {
    id: 2,
    title: "Low-Cost Solar Inverter Design",
    lead: "Dr. Fikadu Tafesse",
    status: "Completed",
    description: "Design and implementation of affordable solar inverters for rural electrification projects.",
    image: "https://picsum.photos/800/600?random=12"
  }
];