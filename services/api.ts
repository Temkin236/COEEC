const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://coeec-dev-backend.onrender.com/api';

async function fetchJSON<T>(path: string): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return await res.json();
}

// ========== NEWS ==========
export async function getNews() {
  try {
    const data = await fetchJSON('/news/public');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] News fetch failed:', err);
    return [];
  }
}

export async function getNewsById(id: number | string) {
  try {
    return await fetchJSON(`/news/${id}`);
  } catch (err) {
    console.error('[API] News detail fetch failed:', err);
    return null;
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
    const url = `${BASE_URL}/contact-messages`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('[API] Contact form submission failed:', err);
    throw err;
  }
}

// ========== RESEARCH ==========
export async function getResearchProjects() {
  try {
    const data = await fetchJSON('/research-projects');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] Research projects fetch failed:', err);
    return [];
  }
}

export async function getResearchProjectById(id: number | string) {
  try {
    return await fetchJSON(`/research-projects/${id}`);
  } catch (err) {
    console.error('[API] Research project detail fetch failed:', err);
    return null;
  }
}

// ========== PUBLICATIONS ==========
export async function getPublications() {
  try {
    const data = await fetchJSON('/publications');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] Publications fetch failed:', err);
    return [];
  }
}

// ========== STUDENT LIFE / CLUBS ==========
export async function getClubs() {
  try {
    const data = await fetchJSON('/student-life/clubs');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] Clubs fetch failed:', err);
    return [];
  }
}

export async function getCareerOpportunities() {
  try {
    const data = await fetchJSON('/student-life/career');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] Career opportunities fetch failed:', err);
    return [];
  }
}

export async function getStudentLife() {
  try {
    return await fetchJSON('/student-life/public');
  } catch (err) {
    console.error('[API] Student life fetch failed:', err);
    return null;
  }
}

// ========== EVENTS ==========
export async function getEvents() {
  try {
    const data = await fetchJSON('/events/public');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] Events fetch failed:', err);
    return [];
  }
}

export async function getEventById(id: number | string) {
  try {
    return await fetchJSON(`/events/${id}`);
  } catch (err) {
    console.error('[API] Event detail fetch failed:', err);
    return null;
  }
}

// ========== ACADEMIC CALENDAR ==========
export async function getCalendarEvents() {
  try {
    const data = await fetchJSON('/academic-calendar');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] Calendar fetch failed:', err);
    return [];
  }
}

export async function getCalendarEventById(id: number | string) {
  try {
    return await fetchJSON(`/academic-calendar/${id}`);
  } catch (err) {
    console.error('[API] Calendar event detail fetch failed:', err);
    return null;
  }
}

// ========== DEPARTMENTS ==========
export async function getDepartments() {
  try {
    const data = await fetchJSON('/departments');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] Departments fetch failed:', err);
    return [];
  }
}

export async function getDepartmentById(id: number | string) {
  try {
    return await fetchJSON(`/departments/${id}`);
  } catch (err) {
    console.error('[API] Department detail fetch failed:', err);
    return null;
  }
}

// ========== STAFF ==========
export async function getStaff() {
  try {
    const data = await fetchJSON('/staff');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] Staff fetch failed:', err);
    return [];
  }
}

export async function getStaffById(id: number | string) {
  try {
    return await fetchJSON(`/staff/${id}`);
  } catch (err) {
    console.error('[API] Staff profile fetch failed:', err);
    return null;
  }
}

// ========== PROGRAMS ==========
export async function getPrograms() {
  try {
    const data = await fetchJSON('/programs');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] Programs fetch failed:', err);
    return [];
  }
}

export async function getProgramById(id: number | string) {
  try {
    return await fetchJSON(`/programs/${id}`);
  } catch (err) {
    console.error('[API] Program detail fetch failed:', err);
    return null;
  }
}

// ========== DOWNLOADS ==========
export async function getDownloads() {
  try {
    const data = await fetchJSON('/downloads/public');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] Downloads fetch failed:', err);
    return [];
  }
}

export async function getDownloadCategories() {
  try {
    const data = await fetchJSON('/downloads/categories');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] Download categories fetch failed:', err);
    return [];
  }
}

// ========== PAGES (CMS) ==========
export async function getPages() {
  try {
    const data = await fetchJSON('/pages');
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[API] Pages fetch failed:', err);
    return [];
  }
}

export async function getPageBySlug(slug: string) {
  try {
    return await fetchJSON(`/pages/slug/${slug}`);
  } catch (err) {
    console.error(`[API] Page '${slug}' fetch failed:`, err);
    return null;
  }
}

// ========== MEDIA ==========
export async function getMediaFiles() {
  try {
    const url = `${BASE_URL}/media/public/media`;
    const res = await fetch(url);
    if (!res.ok) {
      // Server returned an error (500, etc.) — don't throw to avoid noisy uncaught promise logs in the UI.
      console.warn('[API] Media files fetch returned non-OK status:', res.status);
      return [];
    }
    const data = await res.json().catch(() => []);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    // Network or other unexpected error — return empty list silently.
    console.warn('[API] Media files fetch failed:', err);
    return [];
  }
}

// ========== HEALTH CHECK ==========
export async function checkHealth() {
  try {
    return await fetchJSON('/health');
  } catch (err) {
    console.error('[API] Health check failed:', err);
    return { status: 'error' };
  }
}


