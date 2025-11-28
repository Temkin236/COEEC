
import { NavItem, NewsItem, Department, StaffMember, ResearchProject } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    path: '/about',
    children: [
      { label: 'College Overview', path: '/about' },
      { label: 'Staff Directory', path: '/staff' },
    ]
  },
  {
    label: 'Academics',
    path: '/academics',
    children: [
      { label: 'Departments', path: '/departments' },
      { label: 'Academic Calendar', path: '/academics' }, 
      { label: 'Resources', path: '/academics' }, 
    ]
  },
  {
    label: 'Research',
    path: '/research',
    children: [
      { label: 'Projects & Labs', path: '/research' },
      { label: 'Publications', path: '/research' },
    ]
  },
  {
    label: 'Students',
    path: '/students',
    children: [
      { label: 'Student Life', path: '/students' },
      { label: 'Career Center', path: '/students' },
      { label: 'Download Center', path: '/downloads' },
    ]
  },
  {
    label: 'News & Events', 
    path: '/news',
    children: [
       { label: 'Latest News', path: '/news' },
       { label: 'Upcoming Events', path: '/news' },
    ]
  },
  {
    label: 'Contact Us',
    path: '/contact',
    children: [
      { label: 'Get in Touch', path: '/contact' },
    ]
  },
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
  { label: "CAMPUS LIFE", url: "/students" },
  { label: "ALUMNI", url: "/students" },
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
  { name: "Ethio Telecom", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Ethio_telecom_logo.png" }, 
  { name: "Ministry of Education", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Emblem_of_Ethiopia.svg/1200px-Emblem_of_Ethiopia.svg.png" },
];

export const LATEST_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "COEEC Secures Grant for AI Research Lab",
    date: "November 10, 2025",
    category: "Research",
    author: "Research Office",
    excerpt: "The college has received significant funding to establish a state-of-the-art Artificial Intelligence research center aimed at solving local agricultural challenges.",
    content: "The College of Electrical Engineering and Computing (COEEC) is proud to announce a historic milestone in its research trajectory. We have successfully secured a multi-million dollar grant to establish the 'Center for AI in Agriculture'. This state-of-the-art facility will focus on developing machine learning models to predict crop yields, detect diseases in coffee plants early, and optimize irrigation systems for the Oromia region. <br/><br/> The grant, provided by a consortium of international partners including Sida and the Ministry of Innovation, will fund high-performance computing clusters and student scholarships.",
    image: "https://picsum.photos/800/600?random=1"
  },
  {
    id: 2,
    title: "AAU Showcases Digital Transformation",
    date: "November 05, 2025",
    category: "Conference",
    author: "Dr. Sarah Ahmed",
    excerpt: "The university demonstrated its latest strides in digital education at the World Conference on Engineering Education.",
    content: "At the recent World Conference on Engineering Education held in Geneva, ASTU's delegation, led by COEEC representatives, showcased our proprietary E-Learning platform. The platform, built entirely by our Computer Science faculty and students, now supports over 20,000 concurrent users. <br/><br/> 'This is a testament to the capability of Ethiopian software engineers,' remarked Dr. Sarah Ahmed during her keynote address.",
    image: "https://picsum.photos/800/600?random=2"
  },
  {
    id: 3,
    title: "Dr. Kebede Named Fellow of IEEE",
    date: "October 28, 2025",
    category: "Faculty",
    author: "Dean's Office",
    excerpt: "In recognition of his contributions to renewable energy systems, Dr. Kebede has been elevated to the grade of IEEE Fellow.",
    content: "We are thrilled to announce that Dr. Kebede, a senior professor in the Power Engineering department, has been named an IEEE Fellow. This is one of the highest honors in the engineering profession. Dr. Kebede's work on microgrid stability in developing nations has been cited over 5,000 times and has influenced policy in three African nations.",
    image: "https://picsum.photos/800/600?random=3"
  },
  {
    id: 4,
    title: "Annual Innovation Hackathon Winners",
    date: "September 20, 2025",
    category: "Campus Life",
    author: "Student Council",
    excerpt: "Students from the CSE department took home the grand prize for their automated irrigation system powered by AI.",
    content: "The 2025 Innovation Hackathon concluded this weekend with team 'GreenTech' taking the top prize. Their solution, a solar-powered irrigation controller that communicates via SMS for remote areas without internet, wowed the judges. <br/><br/> The team will represent ASTU at the national finals in Addis Ababa next month.",
    image: "https://picsum.photos/800/600?random=20"
  },
  {
    id: 5,
    title: "New Partnership with Ethio Telecom",
    date: "September 15, 2025",
    category: "Partnership",
    author: "Corporate Relations",
    excerpt: "A strategic alliance to provide internship opportunities and joint research initiatives in 5G technologies.",
    content: "COEEC and Ethio Telecom have signed a Memorandum of Understanding (MoU) to bridge the industry-academia gap. The partnership includes a dedicated 5G lab on campus, summer internships for 50 3rd-year students annually, and joint curriculum development for telecommunications courses.",
    image: "https://picsum.photos/800/600?random=21"
  },
  {
    id: 6,
    title: "Visiting Professor Lecture Series",
    date: "September 05, 2025",
    category: "Events",
    author: "Academic Office",
    excerpt: "Renowned expert Dr. Elena Rossi will be delivering a series of lectures on Quantum Computing next week.",
    content: "The Academic Office invites all students and staff to the 'Frontiers of Computing' lecture series. This month, we host Dr. Elena Rossi from MIT, who will demystify Quantum Computing. The sessions will cover Quantum Gates, Algorithms, and the future of cryptography.",
    image: "https://picsum.photos/800/600?random=22"
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
    title: "PhD in Computer Engineering",
    role: "Dean of COEEC",
    academicRank: "Professor",
    department: "Computer Science & Engineering",
    email: "dean.coeec@astu.edu.et",
    phone: "+251-911-234-567",
    office: "B-201, COEEC Main Building",
    image: "https://picsum.photos/300/300?random=7",
    bio: "Dr. Berhanu Bulcha is a distinguished scholar with over 20 years of experience in higher education and research. He has led numerous national projects on digital literacy and infrastructure. His vision for COEEC is to become a leading hub for technological innovation in East Africa.",
    resumeUrl: "#",
    socialLinks: {
      linkedin: "https://linkedin.com",
      googleScholar: "https://scholar.google.com"
    },
    researchAreas: ["Machine Learning", "Educational Technology", "Cloud Computing"],
    education: [
       { degree: "PhD in Computer Engineering", institution: "Technical University of Munich", year: "2010" },
       { degree: "MSc in Electrical Engineering", institution: "Addis Ababa University", year: "2004" }
    ],
    experience: [
       { role: "Dean", organization: "COEEC - ASTU", period: "2018 - Present", description: "Leading the college's strategic direction and academic operations." },
       { role: "Department Head", organization: "ASTU", period: "2014 - 2018", description: "Managed the Computer Science department curriculum and staff." }
    ],
    publications: [
       { title: "AI-Driven Adaptive Learning Systems for Rural Education", journal: "Journal of Educational Computing", year: "2023" },
       { title: "Cloud Infrastructure Challenges in Developing Nations", journal: "IEEE Access", year: "2021" }
    ],
    events: [
       { title: "National Digital Transformation Summit", date: "Nov 20, 2025", role: "Speaker", description: "Keynote speech on the future of engineering education." }
    ]
  },
  {
    id: 2,
    name: "Dr. Fikadu Tafesse",
    title: "PhD in Power Systems",
    role: "Associate Professor",
    academicRank: "Associate Professor",
    department: "Electronics & Power Engineering",
    email: "fikadu.t@astu.edu.et",
    image: "https://picsum.photos/300/300?random=8",
    bio: "Dr. Fikadu is passionate about renewable energy solutions for rural electrification. He leads the Green Energy Lab at ASTU.",
    researchAreas: ["Renewable Energy", "Smart Grids", "Power Electronics"],
    education: [
       { degree: "PhD in Power Engineering", institution: "IIT Bombay", year: "2012" }
    ],
    experience: [
       { role: "Associate Professor", organization: "ASTU", period: "2015 - Present", description: "Teaching advanced power system analysis and conducting research." }
    ],
    publications: [
       { title: "Optimization of Microgrids in Off-Grid Communities", journal: "Renewable Energy Journal", year: "2022" }
    ],
    events: [
       { title: "Green Energy Workshop", date: "Oct 15, 2025", role: "Organizer", description: "Hands-on workshop for solar panel installation." }
    ]
  },
  {
    id: 3,
    name: "Ms. Tigist Alemu",
    title: "MSc in Network Security",
    role: "Lecturer & Researcher",
    academicRank: "Lecturer",
    department: "Computer Science & Engineering",
    email: "tigist.a@astu.edu.et",
    image: "https://picsum.photos/300/300?random=9",
    bio: "Ms. Tigist specializes in network security protocols and cybersecurity awareness. She mentors the university's competitive hacking team.",
    researchAreas: ["Cybersecurity", "Network Protocols", "IoT Security"],
    education: [
       { degree: "MSc in Network Engineering", institution: "ASTU", year: "2016" }
    ],
    experience: [
       { role: "Lecturer", organization: "ASTU", period: "2017 - Present", description: "Teaching Network Security and Cryptography." }
    ],
    publications: [],
    events: []
  },
  {
    id: 4,
    name: "Mr. Henok Assefa",
    title: "MSc in Software Engineering",
    role: "Project Manager",
    academicRank: "Administrator",
    department: "Administration",
    email: "henok.assefa@astu.edu.et",
    image: "https://picsum.photos/300/300?random=10",
    bio: "Mr. Henok oversees the college's digital infrastructure projects and industry partnerships. He brings 10 years of industry experience.",
    researchAreas: ["Project Management", "Software Architecture"],
    education: [
       { degree: "MSc in Software Engineering", institution: "Hilcoe", year: "2014" }
    ],
    experience: [
       { role: "Project Manager", organization: "COEEC", period: "2019 - Present", description: "Managing industry-linkage projects." }
    ],
    publications: [],
    events: []
  }
];

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 1,
    title: "Smart Agriculture IoT Network",
    lead: "Dr. Sarah Ahmed",
    status: "Ongoing",
    description: "Developing a sensor network to monitor soil moisture and automate irrigation for local farms in the Oromia region.",
    content: "Agriculture is the backbone of the Ethiopian economy, yet many farmers rely on traditional methods that can be inefficient. This project aims to deploy a robust Internet of Things (IoT) network across pilot farms in the Oromia region. By installing soil moisture, temperature, and humidity sensors, we can collect real-time data. <br/><br/> This data is processed in the cloud using AI algorithms to determine the optimal watering schedules. The system then automatically triggers irrigation valves, saving water and improving crop yields by an estimated 20%.",
    objectives: [
       "Design low-power wireless sensor nodes",
       "Develop a localized cloud platform for data analysis",
       "Train 100 local farmers on digital tool usage",
       "Reduce water wastage by 30%"
    ],
    fundingSource: "Ministry of Innovation & Technology",
    duration: "2024 - 2026",
    partners: ["Oromia Agriculture Bureau", "Ethio Telecom"],
    image: "https://picsum.photos/800/600?random=11"
  },
  {
    id: 2,
    title: "Low-Cost Solar Inverter Design",
    lead: "Dr. Fikadu Tafesse",
    status: "Completed",
    description: "Design and implementation of affordable solar inverters for rural electrification projects.",
    content: "Access to reliable electricity remains a challenge in many off-grid rural communities. Imported solar inverters are often expensive and difficult to repair. This project focused on designing a high-efficiency solar inverter using locally sourced components and simplified circuitry. <br/><br/> The final prototype is 40% cheaper than imported alternatives and includes features specifically tailored for the local climate, such as enhanced heat dissipation and dust protection.",
    objectives: [
       "Create an open-source inverter design",
       "Achieve 95% conversion efficiency",
       "Pilot deployment in 50 households"
    ],
    fundingSource: "Sida (Swedish International Development Cooperation Agency)",
    duration: "2023 - 2024",
    partners: ["Rural Energy Agency", "TVET Institutes"],
    image: "https://picsum.photos/800/600?random=12"
  }
];
