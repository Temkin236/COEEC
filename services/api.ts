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
    return await fetchJSON('/news');
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

export async function getContacts() {
  try {
    return await fetchJSON('/contacts');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return null;
  }
}

export async function submitContactForm(data: any) {
  try {
    const url = BASE_URL ? `${BASE_URL.replace(/\/+$/, '')}/contact` : '/contact';
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
    return await fetchJSON('/research/projects');
  } catch (err) {
    console.warn('API fetch failed, using local data:', err);
    return RESEARCH_PROJECTS;
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
    return await fetchJSON('/clubs');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
}

export async function getCalendarEvents() {
  try {
    return await fetchJSON('/events');
  } catch (err) {
    console.warn('API fetch failed, using local data:', err);
    return UPCOMING_EVENTS;
  }
}

export default {
  getNews,
  getNewsById,
  getContacts,
  submitContactForm,
  getResearchProjects,
  getPublications,
  getClubs,
  getCalendarEvents,
};
