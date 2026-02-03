import { LATEST_NEWS, RESEARCH_PROJECTS, UPCOMING_EVENTS } from '../constants';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function fetchJSON<T>(path: string): Promise<T> {
  const url = BASE_URL ? `${BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}` : path;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return await res.json();
}

export async function getNews() {
  try {
    return await fetchJSON('/news/public');
  } catch (err) {
    console.warn('API fetch failed, using local data:', err);
    return LATEST_NEWS;
  }
}

export async function getNewsById(id: number | string) {
  try {
    return await fetchJSON(`/news/${id}`);
  } catch (err) {
    console.warn('API fetch failed, using local data:', err);
    return LATEST_NEWS.find(n => n.id === Number(id)) || null;
  }
}

export async function getContactMessages() {
  try {
    return await fetchJSON('/contact-messages');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
}

export async function submitContactForm(data: any) {
  try {
    const url = BASE_URL ? `${BASE_URL.replace(/\/+$/, '')}/contact-messages` : '/contact-messages';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Contact form submission failed:', err);
    throw err;
  }
}

export async function getResearchProjects() {
  try {
    return await fetchJSON('/research-projects');
  } catch (err) {
    console.warn('API fetch failed, using local data:', err);
    return RESEARCH_PROJECTS;
  }
}

export async function getResearchProjectById(id: number | string) {
  try {
    return await fetchJSON(`/research-projects/${id}`);
  } catch (err) {
    console.warn('API fetch failed, using local data:', err);
    return RESEARCH_PROJECTS.find(p => p.id === Number(id)) || null;
  }
}

export async function getPublications() {
  try {
    return await fetchJSON('/publications');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
}

export async function getClubs() {
  try {
    return await fetchJSON('/student-life/clubs');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
}

export async function getCareerOpportunities() {
  try {
    return await fetchJSON('/student-life/career');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
}

export async function getStudentLife() {
  try {
    return await fetchJSON('/student-life/public');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return null;
  }
}

export async function getCalendarEvents() {
  try {
    return await fetchJSON('/events/public');
  } catch (err) {
    console.warn('API fetch failed, using local data:', err);
    return UPCOMING_EVENTS;
  }
}

export async function getAcademicCalendars() {
  try {
    return await fetchJSON('/academic-calendar');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
}

export async function getDepartments() {
  try {
    return await fetchJSON('/departments');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
}

export async function getDepartmentById(id: string) {
  try {
    return await fetchJSON(`/departments/${id}`);
  } catch (err) {
    console.warn('API fetch failed:', err);
    return null;
  }
}

export async function getStaff() {
  try {
    return await fetchJSON('/staff');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
}

export async function getStaffById(id: number | string) {
  try {
    return await fetchJSON(`/staff/${id}`);
  } catch (err) {
    console.warn('API fetch failed:', err);
    return null;
  }
}

export async function getPrograms() {
  try {
    return await fetchJSON('/programs');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
}

export async function getProgramById(id: number | string) {
  try {
    return await fetchJSON(`/programs/${id}`);
  } catch (err) {
    console.warn('API fetch failed:', err);
    return null;
  }
}

export async function getDownloads() {
  try {
    return await fetchJSON('/downloads/public');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
}

export async function getDownloadCategories() {
  try {
    return await fetchJSON('/downloads/categories');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
}

export async function getPages() {
  try {
    return await fetchJSON('/pages');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
}

export async function getPageBySlug(slug: string) {
  try {
    return await fetchJSON(`/pages/slug/${slug}`);
  } catch (err) {
    console.warn('API fetch failed:', err);
    return null;
  }
}

export default {
  getNews,
  getNewsById,
  getContactMessages,
  submitContactForm,
  getResearchProjects,
  getResearchProjectById,
  getPublications,
  getClubs,
  getCareerOpportunities,
  getStudentLife,
  getCalendarEvents,
  getAcademicCalendars,
  getDepartments,
  getDepartmentById,
  getStaff,
  getStaffById,
  getPrograms,
  getProgramById,
  getDownloads,
  getDownloadCategories,
  getPages,
  getPageBySlug,
};
