const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://coeec-dev-backend.onrender.com/api';

function getAuthToken(): string | null {
  const envToken = import.meta.env.VITE_API_TOKEN;
  if (typeof envToken === 'string' && envToken.trim()) return envToken.trim();

  if (typeof window === 'undefined') return null;

  const directKeys = ['token', 'accessToken', 'authToken', 'jwt'];
  for (const key of directKeys) {
    const value = window.localStorage.getItem(key);
    if (value && value.trim()) return value.trim();
  }

  const jsonKeys = ['auth', 'user', 'session'];
  for (const key of jsonKeys) {
    const raw = window.localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      const token = parsed?.token || parsed?.accessToken || parsed?.jwt;
      if (typeof token === 'string' && token.trim()) return token.trim();
    } catch {
      // ignore invalid JSON values
    }
  }

  return null;
}

async function fetchJSON<T>(path: string): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const token = getAuthToken();
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return await res.json();
}

// Normalize common API list payloads: [] or { data/items/results: [] }.
function toList<T>(payload: any): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (!payload || typeof payload !== 'object') return [];
  const candidates = [payload.data, payload.items, payload.results];
  const firstList = candidates.find((c) => Array.isArray(c));
  return (firstList as T[]) || [];
}

function humanizeEnum(value: string | null | undefined): string {
  if (!value) return '';
  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeStaffMember(item: any) {
  if (!item || typeof item !== 'object') return null;

  const biography = item.biography;
  const bioText = typeof biography === 'string'
    ? biography
    : typeof biography?.description === 'string'
      ? biography.description
      : typeof biography?.content === 'string'
        ? biography.content
        : '';

  const department = item.department && typeof item.department === 'object'
    ? item.department
    : item.department || '';

  const academicRank = humanizeEnum(item.rank) || item.academicRank || 'Staff Member';
  const title = item.title || item.position || '';

  return {
    id: item.id,
    name: item.displayName || item.name || 'Unnamed Staff',
    title,
    role: item.role || title || academicRank,
    academicRank,
    department,
    bio: bioText,
    email: item.email || '',
    phone: item.phone || '',
    office: item.officeLocation || item.office || '',
    image: item.photo?.url || item.image || '',
    resumeUrl: item.cv?.url || item.resumeUrl || '',
    socialLinks: item.socialLinks || undefined,
    researchAreas: Array.isArray(item.researchAreas) ? item.researchAreas : [],
    education: Array.isArray(item.education) ? item.education : [],
    experience: Array.isArray(item.experience) ? item.experience : [],
    publications: Array.isArray(item.publications) ? item.publications : [],
    events: Array.isArray(item.events) ? item.events : [],
  };
}

function normalizeDepartment(item: any) {
  if (!item || typeof item !== 'object') return null;

  // Some endpoints return wrapped payloads like { department: {...} } or { data: {...} }.
  const raw = item.department && typeof item.department === 'object'
    ? item.department
    : item.data && typeof item.data === 'object' && !Array.isArray(item.data)
      ? item.data
      : item;

  const pickText = (...values: any[]) => {
    for (const value of values) {
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed) return trimmed;
      }
    }
    return '';
  };

  const programs = Array.isArray(raw.programs)
    ? raw.programs
    : Array.isArray(raw.programList)
      ? raw.programList
      : [];

  return {
    id: raw.id,
    name: pickText(raw.name, raw.displayName, raw.departmentName, raw.title) || 'Unnamed Department',
    slug: pickText(raw.slug),
    description: pickText(raw.description, raw.summary) || 'Department information will be available soon.',
    head: raw.head || null,
    image: pickText(raw.image, raw.bannerImage, raw.coverImage, raw.page?.image?.url, raw.page?.coverImage?.url),
    programs,
    staffCount: typeof raw.staffCount === 'number' ? raw.staffCount : Array.isArray(raw.staff) ? raw.staff.length : 0,
  };
}

function extractTextFromRichContent(content: any): string {
  if (!content) return '';

  if (typeof content === 'string') return content;

  if (Array.isArray(content)) {
    return content.map(extractTextFromRichContent).filter(Boolean).join(' ').trim();
  }

  if (typeof content === 'object') {
    if (typeof content.text === 'string' && content.text.trim()) return content.text.trim();

    // EditorJS-like shape
    if (Array.isArray(content.blocks)) {
      return content.blocks
        .map((block: any) => extractTextFromRichContent(block?.data))
        .filter(Boolean)
        .join(' ')
        .trim();
    }

    // TipTap/ProseMirror-like shape
    if (Array.isArray(content.content)) {
      return content.content
        .map((node: any) => extractTextFromRichContent(node))
        .filter(Boolean)
        .join(' ')
        .trim();
    }
  }

  return '';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function applyTextMarks(text: string, marks: any[]): string {
  return (marks || []).reduce((acc, mark) => {
    switch (mark?.type) {
      case 'bold':
        return `<strong>${acc}</strong>`;
      case 'italic':
        return `<em>${acc}</em>`;
      case 'underline':
        return `<u>${acc}</u>`;
      case 'strike':
        return `<s>${acc}</s>`;
      case 'code':
        return `<code>${acc}</code>`;
      case 'link': {
        const href = mark?.attrs?.href ? escapeHtml(String(mark.attrs.href)) : '#';
        return `<a href="${href}" target="_blank" rel="noreferrer">${acc}</a>`;
      }
      default:
        return acc;
    }
  }, text);
}

function tipTapNodeToHtml(node: any): string {
  if (!node || typeof node !== 'object') return '';

  if (node.type === 'text') {
    const escaped = escapeHtml(String(node.text || ''));
    return applyTextMarks(escaped, node.marks || []);
  }

  if (node.type === 'hardBreak') return '<br />';

  if (node.type === 'image') {
    const src = node?.attrs?.src ? escapeHtml(String(node.attrs.src)) : '';
    if (!src) return '';
    const alt = node?.attrs?.alt ? escapeHtml(String(node.attrs.alt)) : 'News image';
    return `<img src="${src}" alt="${alt}" class="my-4 rounded-lg max-w-full h-auto" />`;
  }

  const children = Array.isArray(node.content)
    ? node.content.map(tipTapNodeToHtml).join('')
    : '';

  switch (node.type) {
    case 'doc':
      return children;
    case 'paragraph':
      return `<p>${children || ''}</p>`;
    case 'heading': {
      const level = Math.min(6, Math.max(1, Number(node?.attrs?.level || 2)));
      return `<h${level}>${children}</h${level}>`;
    }
    case 'bulletList':
      return `<ul>${children}</ul>`;
    case 'orderedList':
      return `<ol>${children}</ol>`;
    case 'listItem':
      return `<li>${children}</li>`;
    case 'blockquote':
      return `<blockquote>${children}</blockquote>`;
    default:
      return children;
  }
}

function editorJsToHtml(content: any): string {
  const blocks = Array.isArray(content?.blocks) ? content.blocks : [];
  if (blocks.length === 0) return '';

  return blocks.map((block: any) => {
    const type = block?.type;
    const data = block?.data || {};

    if (type === 'paragraph') {
      return `<p>${escapeHtml(String(data.text || ''))}</p>`;
    }

    if (type === 'header') {
      const level = Math.min(6, Math.max(1, Number(data.level || 2)));
      return `<h${level}>${escapeHtml(String(data.text || ''))}</h${level}>`;
    }

    if (type === 'list') {
      const items = Array.isArray(data.items) ? data.items : [];
      const listItems = items.map((item: any) => `<li>${escapeHtml(String(item || ''))}</li>`).join('');
      return data.style === 'ordered' ? `<ol>${listItems}</ol>` : `<ul>${listItems}</ul>`;
    }

    if (type === 'image') {
      const src = data?.file?.url || data?.url || '';
      if (!src) return '';
      const alt = data?.caption || 'News image';
      return `<img src="${escapeHtml(String(src))}" alt="${escapeHtml(String(alt))}" class="my-4 rounded-lg max-w-full h-auto" />`;
    }

    return '';
  }).join('');
}

function richContentToHtml(content: any): string {
  if (!content) return '';

  if (typeof content === 'string') {
    return `<p>${escapeHtml(content)}</p>`;
  }

  if (typeof content === 'object') {
    if (Array.isArray(content.blocks)) {
      const html = editorJsToHtml(content);
      if (html) return html;
    }

    if (content.type === 'doc' || Array.isArray(content.content)) {
      const html = tipTapNodeToHtml(content);
      if (html) return html;
    }
  }

  const fallbackText = extractTextFromRichContent(content);
  return fallbackText ? `<p>${escapeHtml(fallbackText)}</p>` : '';
}

function extractImageFromRichContent(content: any): string {
  if (!content) return '';

  if (Array.isArray(content)) {
    for (const item of content) {
      const image = extractImageFromRichContent(item);
      if (image) return image;
    }
    return '';
  }

  if (typeof content === 'object') {
    if (content.type === 'image') {
      return content?.attrs?.src || content?.data?.file?.url || '';
    }

    if (Array.isArray(content.blocks)) {
      for (const block of content.blocks) {
        const image = extractImageFromRichContent(block);
        if (image) return image;
      }
    }

    if (Array.isArray(content.content)) {
      for (const node of content.content) {
        const image = extractImageFromRichContent(node);
        if (image) return image;
      }
    }

    if (content.data) {
      const image = extractImageFromRichContent(content.data);
      if (image) return image;
    }
  }

  return '';
}

function pickNewsTranslation(item: any) {
  const translations = Array.isArray(item?.translations) ? item.translations : [];
  if (translations.length === 0) return null;
  return translations.find((t: any) => t?.language === 'EN') || translations[0];
}

function pickEventTranslation(item: any) {
  const translations = Array.isArray(item?.translations) ? item.translations : [];
  if (translations.length === 0) return null;
  return translations.find((t: any) => t?.language === 'EN') || translations[0];
}

function normalizeEventItem(item: any) {
  if (!item || typeof item !== 'object') return null;

  const translation = pickEventTranslation(item) || {};
  const rawDescription = translation.description || item.description;
  const descriptionHtml = richContentToHtml(rawDescription);
  const summaryText = extractTextFromRichContent(rawDescription);

  return {
    id: item.id,
    title: translation.title || item.title || 'Untitled Event',
    slug: translation.slug || item.slug || '',
    location: item.location || null,
    startAt: item.startAt || item.start_date || item.date || null,
    endAt: item.endAt || item.end_date || null,
    date: item.startAt || item.start_date || item.date || null,
    isOnline: !!item.isOnline,
    eventUrl: item.eventUrl || null,
    featuredImageUrl: item.featuredImage?.url || item.featuredImageUrl || item.image || '',
    image: item.featuredImage?.url || item.featuredImageUrl || item.image || '',
    description: descriptionHtml || '',
    summary: summaryText || '',
    excerpt: summaryText || '',
    tags: Array.isArray(item.tags) ? item.tags : [],
    state: item.state || '',
    department: item.department || null,
  };
}

function normalizeResearchProject(item: any) {
  if (!item || typeof item !== 'object') return null;

  const summary = item.summary;
  const summaryContent = typeof summary === 'string'
    ? summary
    : typeof summary?.content === 'string'
      ? summary.content
      : extractTextFromRichContent(summary);

  const startDate = item.startDate || item.startAt || item.createdAt || null;
  const endDate = item.endDate || item.endAt || null;
  const lead = (Array.isArray(item.members) && item.members[0]?.name)
    || item.createdBy?.displayName
    || item.author?.displayName
    || 'Research Team';

  const objectives = Array.isArray(item.objectives)
    ? item.objectives
    : Array.isArray(item.goals)
      ? item.goals
      : [];

  const partners = Array.isArray(item.members)
    ? item.members.map((m: any) => m?.name).filter(Boolean)
    : [];

  const contentHtml = richContentToHtml(item.content || summary || '');
  const state = String(item.state || '').toUpperCase();
  const status = state === 'COMPLETED' ? 'Completed' : 'Ongoing';

  const duration = startDate
    ? `${new Date(startDate).toLocaleDateString()}${endDate ? ` - ${new Date(endDate).toLocaleDateString()}` : ''}`
    : undefined;

  return {
    id: item.id,
    title: item.title || item.name || 'Untitled Project',
    lead,
    status,
    description: summaryContent || item.description || 'Research project summary will be available soon.',
    image: item.image || item.featuredImage?.url || item.featuredImageUrl || `https://picsum.photos/800/500?random=${String(item.id || '').slice(-4) || '201'}`,
    content: contentHtml || undefined,
    objectives,
    fundingSource: item.fundingSource || item.funder || undefined,
    duration,
    partners,
  };
}

function normalizeNewsItem(item: any) {
  if (!item || typeof item !== 'object') return null;

  const translation = pickNewsTranslation(item) || {};
  const rawContent = translation.content || item.content;
  const textContent = extractTextFromRichContent(rawContent);
  const htmlContent = richContentToHtml(rawContent);
  const excerpt = (translation.excerpt || item.excerpt || textContent || '').toString().trim();

  const imageFromContent = extractImageFromRichContent(rawContent);
  const image = item.featuredImage?.url || item.featuredImageUrl || item.image || imageFromContent || `https://picsum.photos/800/500?random=${String(item.id || '').slice(-4) || '101'}`;
  const category = item.department?.name || (Array.isArray(item.tags) && item.tags[0]) || 'General';
  const publishDate = item.publishAt || item.publishedAt || item.date || item.createdAt;

  return {
    id: item.id,
    title: translation.title || item.title || 'Untitled News',
    date: publishDate || '',
    category,
    excerpt: excerpt || 'No excerpt available.',
    content: htmlContent || undefined,
    image,
    author: item.author?.displayName || item.author?.name || item.authorName,
  };
}

// ========== NEWS ==========
export async function getNews() {
  try {
    const data = await fetchJSON('/news/public');
    return toList(data).map(normalizeNewsItem).filter(Boolean);
  } catch (err) {
    // Fallback for backends exposing non-public news endpoint.
    try {
      const data = await fetchJSON('/news');
      return toList(data).map(normalizeNewsItem).filter(Boolean);
    } catch (fallbackErr) {
      console.error('[API] News fetch failed:', err, fallbackErr);
      return [];
    }
  }
}

export async function getNewsById(id: number | string) {
  try {
    const data = await fetchJSON(`/news/${id}`);
    return normalizeNewsItem(data);
  } catch (err) {
    console.error('[API] News detail fetch failed:', err);
    return null;
  }
}

// ========== CONTACT ==========
export async function getContactMessages(page: number = 1, limit: number = 10, category?: string) {
  try {
    const qs = `?page=${page}&limit=${limit}${category ? `&category=${encodeURIComponent(category)}` : ''}`;
    const data = await fetchJSON(`/contact-messages${qs}`);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('[API] Contact messages fetch failed:', err);
    return [];
  }
}

export async function getContactMessageById(id: string | number) {
  try {
    return await fetchJSON(`/contact-messages/${id}`);
  } catch (err) {
    console.warn('[API] Contact message fetch failed:', err);
    return null;
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
export async function getResearchProjects(page?: number, limit?: number) {
  try {
    if (page && limit) {
      const pagedData = await fetchJSON(`/research-projects?page=${page}&limit=${limit}`);
      const pagedList = toList(pagedData).map(normalizeResearchProject).filter(Boolean);
      if (pagedList.length > 0) return pagedList;

      // Some backends only return data with all=true; fallback and paginate locally.
      const allData = await fetchJSON('/research-projects?all=true');
      const allList = toList(allData).map(normalizeResearchProject).filter(Boolean) as any[];
      const start = (page - 1) * limit;
      return allList.slice(start, start + limit);
    }

    const data = await fetchJSON('/research-projects?all=true');
    return toList(data).map(normalizeResearchProject).filter(Boolean);
  } catch (err) {
    // Fallback for backends that may not support all=true.
    try {
      const data = await fetchJSON('/research-projects');
      return toList(data).map(normalizeResearchProject).filter(Boolean);
    } catch (fallbackErr) {
      console.error('[API] Research projects fetch failed:', err, fallbackErr);
      return [];
    }
  }
}

export async function getResearchProjectById(id: number | string) {
  try {
    const data = await fetchJSON(`/research-projects/${id}`);
    return normalizeResearchProject(data);
  } catch (err) {
    // Fallback to list endpoint for APIs that expose projects only via list route.
    try {
      const data = await fetchJSON('/research-projects?all=true');
      const list = toList(data).map(normalizeResearchProject).filter(Boolean) as any[];
      return list.find((project) => String(project.id) === String(id)) || null;
    } catch (fallbackErr) {
      console.error('[API] Research project detail fetch failed:', err, fallbackErr);
      return null;
    }
  }
}

// ========== PUBLICATIONS ==========
export async function getPublications() {
  try {
    const data = await fetchJSON('/publications/publi');
    return toList(data);
  } catch (err) {
    // Fallback for backends exposing publications without the public suffix.
    try {
      const data = await fetchJSON('/publications');
      return toList(data);
    } catch (fallbackErr) {
      console.error('[API] Publications fetch failed:', err, fallbackErr);
      return [];
    }
  }
}

export async function getMyPublications() {
  try {
    return await fetchJSON('/publications/me');
  } catch (err) {
    console.error('[API] My publications fetch failed:', err);
    return [];
  }
}

export async function getPublicationById(id: string | number) {
  try {
    return await fetchJSON(`/publications/${id}`);
  } catch (err) {
    console.error('[API] Publication detail fetch failed:', err);
    return null;
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
export async function getEvents(page: number = 1, limit: number = 10) {
  try {
    const qs = `?page=${page}&limit=${limit}`;
    const data = await fetchJSON(`/events/public${qs}`);
    return toList(data).map(normalizeEventItem).filter(Boolean);
  } catch (err) {
    console.error('[API] Events fetch failed:', err);
    return [];
  }
}

export async function getEventById(id: number | string) {
  try {
    const data = await fetchJSON(`/events/${id}`);
    return normalizeEventItem(data);
  } catch (err) {
    // Fallback to public events list and pick matching event for backends without /events/:id public access.
    try {
      const data = await fetchJSON('/events/public?page=1&limit=100');
      const list = toList(data).map(normalizeEventItem).filter(Boolean) as any[];
      return list.find((ev) => String(ev.id) === String(id)) || null;
    } catch (fallbackErr) {
      console.error('[API] Event detail fetch failed:', err, fallbackErr);
      return null;
    }
  }
}

// ========== ACADEMIC CALENDAR ==========
export async function getCalendarEvents(all?: boolean) {
  try {
    const qp = typeof all === 'boolean' ? `?all=${all}` : '';
    const data = await fetchJSON(`/academic-calendar${qp}`);
    return toList(data);
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
    return toList(data).map(normalizeDepartment).filter(Boolean);
  } catch (err) {
    console.error('[API] Departments fetch failed:', err);
    return [];
  }
}

export async function getDepartmentById(id: number | string) {
  try {
    const data = await fetchJSON(`/departments/${id}`);
    return normalizeDepartment(data);
  } catch (err) {
    console.error('[API] Department detail fetch failed:', err);
    return null;
  }
}

// ========== STAFF ==========
export async function getStaff() {
  try {
    const data = await fetchJSON('/staff');
    return toList(data).map(normalizeStaffMember).filter(Boolean);
  } catch (err) {
    console.error('[API] Staff fetch failed:', err);
    return [];
  }
}

export async function getStaffById(id: number | string) {
  try {
    const data = await fetchJSON(`/staff/${id}`);
    return normalizeStaffMember(data);
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

export async function getProgramTypes() {
  try {
    const data = await fetchJSON('/option-lists/program-types');
    return toList(data);
  } catch (err) {
    console.error('[API] Program types fetch failed:', err);
    return [];
  }
}

// ========== DOWNLOADS ==========
export async function getDownloads(page: number = 1, limit: number = 10) {
  try {
    const qs = `?page=${page}&limit=${limit}`;
    const data = await fetchJSON(`/downloads${qs}`);
    return toList(data);
  } catch (err) {
    // Fallback for backends exposing only public downloads endpoint.
    try {
      const data = await fetchJSON(`/downloads/public?page=${page}&limit=${limit}`);
      return toList(data);
    } catch (fallbackErr) {
      console.error('[API] Downloads fetch failed:', err, fallbackErr);
      return [];
    }
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

// ========== ABOUT ==========
export async function getAbout() {
  try {
    return await fetchJSON('/about');
  } catch (err) {
    console.error('[API] About fetch failed:', err);
    return null;
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


