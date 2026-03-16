
export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export interface NewsItem {
  id: number | string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content?: string; // Full article content
  image: string;
  author?: string;
}

export interface Department {
  id: string;
  name: string;
  slug?: string;
  description: string;
  head: string | { id?: string; name?: string; displayName?: string; title?: string; [key: string]: any } | null;
  image: string;
  programs: Array<string | { id?: string; name?: string; title?: string; code?: string; [key: string]: any }>;
  staffCount?: number;
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
  isCurrent?: boolean;
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
  id: number | string;
  name: string;
  title: string; // e.g. PhD, MSc
  role: string; // e.g. Dean, Associate Professor
  academicRank: string;
  department: string | { id?: string; name?: string; [key: string]: any };
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
  content?: string;
  objectives?: string[];
  fundingSource?: string;
  duration?: string;
  partners?: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
