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

export interface StaffMember {
  id: number;
  name: string;
  role: string;
  department: string;
  researchAreas: string[];
  email: string;
  image: string;
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