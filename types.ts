
export interface NavItem {
  label: string;
  path: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  image: string;
  programs: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface Publication {
  title: string;
  journal: string;
  year: string;
  link?: string;
}

export interface Event {
  title: string;
  date: string;
  role: 'Speaker' | 'Organizer' | 'Attendee';
  description: string;
}

export interface StaffMember {
  id: number;
  name: string;
  title: string; // e.g. PhD, MSc
  role: string; // e.g. Dean, Associate Professor
  academicRank: 'Professor' | 'Associate Professor' | 'Assistant Professor' | 'Lecturer' | 'Administrator';
  department: string;
  bio: string;
  email: string;
  phone?: string;
  office?: string;
  image: string;
  resumeUrl?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    googleScholar?: string;
  };
  researchAreas: string[];
  education: Education[];
  experience: Experience[];
  publications: Publication[];
  events: Event[];
}

export interface ResearchProject {
  id: number;
  title: string;
  lead: string;
  status: 'Ongoing' | 'Completed';
  description: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
