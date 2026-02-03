import { LATEST_NEWS, RESEARCH_PROJECTS, UPCOMING_EVENTS } from '../constants';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
console.log('[API] Base URL:', BASE_URL || '(not set)');

async function fetchJSON<T>(path: string): Promise<T> {
  const url = BASE_URL ? `${BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}` : path;
  console.log('[API] Fetching:', url);
  const res = await fetch(url);
  console.log('[API] Response:', res.status, res.statusText);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const data = await res.json();
  console.log('[API] Data received:', Array.isArray(data) ? `${data.length} items` : typeof data);
  return data;
}

// ========== NEWS ==========
export async function getNews() {
  try {
    const data = await fetchJSON('/news/public');
    console.log('[API] News fetched from backend:', data);
    return data;
  } catch (err) {
    console.warn('[API] News fetch failed, using local data:', err);
    return LATEST_NEWS;
  }
}

export async function getNewsById(id: number | string) {
  try {
    return await fetchJSON(`/news/${id}`);
  } catch (err) {
    console.warn('[API] News fetch failed, using local data:', err);
    return LATEST_NEWS.find(n => n.id === Number(id)) || null;
  }
}

// ========== CONTACT ==========
export async function getContactMessages() {
  try {
    return await fetchJSON('/contact-messages');
  } catch (err) {
    console.warn('[API] Contact messages fetch failed:', err);
    return [];
  }
}

export async function submitContactForm(data: any) {
  try {
    const url = BASE_URL ? `${BASE_URL.replace(/\/+$/, '')}/contact-messages` : '/contact-messages';
    console.log('[API] Submitting contact form to:', url);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const result = await res.json();
    console.log('[API] Contact form submitted successfully');
    return result;
  } catch (err) {
    console.error('[API] Contact form submission failed:', err);
    throw err;
  }
}

// ========== RESEARCH ==========
export async function getResearchProjects() {
  try {
    const data = await fetchJSON('/research-projects');
    console.log('[API] Research projects fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Research projects fetch failed, using local data:', err);
    return RESEARCH_PROJECTS;
  }
}

export async function getResearchProjectById(id: number | string) {
  try {
    return await fetchJSON(`/research-projects/${id}`);
  } catch (err) {
    console.warn('[API] Research project fetch failed, using local data:', err);
    return RESEARCH_PROJECTS.find(p => p.id === Number(id)) || null;
  }
}

// ========== PUBLICATIONS ==========
export async function getPublications() {
  try {
    const data = await fetchJSON('/publications');
    console.log('[API] Publications fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Publications fetch failed:', err);
    return [];
  }
}

// ========== STUDENT LIFE / CLUBS ==========
export async function getClubs() {
  try {
    const data = await fetchJSON('/student-life/clubs');
    console.log('[API] Clubs fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Clubs fetch failed:', err);
    return [];
  }
}

export async function getCareerOpportunities() {
  try {
    const data = await fetchJSON('/student-life/career');
    console.log('[API] Career opportunities fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Career opportunities fetch failed:', err);
    return [];
  }
}

export async function getStudentLife() {
  try {
    const data = await fetchJSON('/student-life/public');
    console.log('[API] Student life fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Student life fetch failed:', err);
    return null;
  }
}

// ========== EVENTS / CALENDAR ==========
export async function getCalendarEvents() {
  try {
    const data = await fetchJSON('/events/public');
    console.log('[API] Events fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Events fetch failed, using local data:', err);
    return UPCOMING_EVENTS;
  }
}

export async function getAcademicCalendars() {
  try {
    const data = await fetchJSON('/academic-calendar');
    console.log('[API] Academic calendars fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Academic calendars fetch failed:', err);
    return [];
  }
}

// ========== DEPARTMENTS ==========
export async function getDepartments() {
  try {
    const data = await fetchJSON('/departments');
    console.log('[API] Departments fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Departments fetch failed:', err);
    return [];
  }
}

export async function getDepartmentById(id: string) {
  try {
    return await fetchJSON(`/departments/${id}`);
  } catch (err) {
    console.warn('[API] Department fetch failed:', err);
    return null;
  }
}

// ========== STAFF ==========
export async function getStaff() {
  try {
    const data = await fetchJSON('/staff');
    console.log('[API] Staff fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Staff fetch failed:', err);
    return [];
  }
}

export async function getStaffById(id: number | string) {
  try {
    return await fetchJSON(`/staff/${id}`);
  } catch (err) {
    console.warn('[API] Staff member fetch failed:', err);
    return null;
  }
}

// ========== PROGRAMS ==========
export async function getPrograms() {
  try {
    const data = await fetchJSON('/programs');
    console.log('[API] Programs fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Programs fetch failed:', err);
    return [];
  }
}

export async function getProgramById(id: number | string) {
  try {
    return await fetchJSON(`/programs/${id}`);
  } catch (err) {
    console.warn('[API] Program fetch failed:', err);
    return null;
  }
}

// ========== DOWNLOADS ==========
export async function getDownloads() {
  try {
    const data = await fetchJSON('/downloads/public');
    console.log('[API] Downloads fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Downloads fetch failed:', err);
    return [];
  }
}

export async function getDownloadCategories() {
  try {
    const data = await fetchJSON('/downloads/categories');
    console.log('[API] Download categories fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Download categories fetch failed:', err);
    return [];
  }
}

// ========== PAGES ==========
export async function getPages() {
  try {
    const data = await fetchJSON('/pages');
    console.log('[API] Pages fetched from backend');
    return data;
  } catch (err) {
    console.warn('[API] Pages fetch failed:', err);
    return [];
  }
}

export async function getPageBySlug(slug: string) {
  try {
    return await fetchJSON(`/pages/slug/${slug}`);
  } catch (err) {
    console.warn('[API] Page fetch failed:', err);
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
