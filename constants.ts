
import { NavItem } from './types';

// ❌ ALL MOCK DATA REMOVED - Frontend fetches all dynamic content from API
// ✅ Only UI-specific static constants remain below

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
      { label: 'Publications', path: '/publications' },
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
       { label: 'Upcoming Events', path: '/events' },
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
  { label: "Notable Alumni", value: "ASTU Notable Alumni", icon: "Users", description: "Our university has produced numerous notable alumni" },
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
  { id: 1, day: "01", month: "Dec", title: "ASTU 75th Diamond Jubilee Anniversary", time: "12 AM - Dec 31, 2025" },
  { id: 2, day: "15", month: "Jan", title: "International Conference on Green Energy", time: "9 AM - Jan 17, 2026" },
  { id: 3, day: "20", month: "Feb", title: "Annual Science & Tech Fair 2026", time: "10 AM - Feb 22, 2026" },
];

export const PARTNERS = [
  { name: "INSA", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Logo_of_Ethiopian_INSA.png" },
  { name: "Ethio Airlines", logo: "http://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJNLAab0C07S5-KaRvzakBrJOTTr71OV1px6v9GOJ0WHmzTmzz3ipjfMzj7gzzNwfelG4&usqp=CAU" },
  { name: "Ethio Telecom", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHCbY7ehFiDHEe5TohsUEf2EQsX66tkp17SYkgPQ6nTkI8uTU4nB0efaWfOgrDOzf2WQ&usqp=CAU" }, 
  { name: "Ministry of Education", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiDI7riRUyG4Nf_c0VUJqUfFYLoVFIJHlw1y8pbLIx3cA5ua5gw8vfPFDvPilLd54wK6I&usqp=CAU" },
];

// ❌ ALL DUMMY DATA REMOVED
// All dynamic content (News, Departments, Staff, Research Projects, Downloads) is now fetched from the backend API.
// Use the functions from services/api.ts: getNews(), getDepartments(), getStaff(), getResearchProjects(), getDownloads(), etc.
