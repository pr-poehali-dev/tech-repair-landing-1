const URLS = {
  auth: 'https://functions.poehali.dev/4ea99cba-b633-4d97-beae-e4daca650a8e',
  content: 'https://functions.poehali.dev/008ab0ed-f564-4c02-aa87-3acad1834e5a',
  requests: 'https://functions.poehali.dev/00c9dcff-0ea8-42e6-b6df-f66ba876a865',
};

const TOKEN_KEY = 'remontpro_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY) || '';
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

function authHeaders(): Record<string, string> {
  const t = getToken();
  return t ? { 'X-Auth-Token': t } : {};
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export const api = {
  async login(email: string, password: string) {
    const res = await fetch(URLS.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ошибка входа');
    setToken(data.token);
    return data.user as User;
  },

  async me() {
    const res = await fetch(URLS.auth, { headers: { ...authHeaders() } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user as User;
  },

  async logout() {
    await fetch(URLS.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout', token: getToken() }),
    });
    clearToken();
  },

  async getAllContent() {
    const res = await fetch(URLS.content);
    return res.json();
  },

  async getTable(table: string) {
    const res = await fetch(`${URLS.content}?table=${table}`);
    const data = await res.json();
    return data.items || [];
  },

  async createItem(table: string, payload: Record<string, unknown>) {
    const res = await fetch(`${URLS.content}?table=${table}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ошибка');
    return data.item;
  },

  async updateItem(table: string, payload: Record<string, unknown>) {
    const res = await fetch(`${URLS.content}?table=${table}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ошибка');
    return data.item;
  },

  async deleteItem(table: string, id: number) {
    const res = await fetch(`${URLS.content}?table=${table}&id=${id}`, {
      method: 'DELETE',
      headers: { ...authHeaders() },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ошибка');
    return data;
  },

  async createRequest(payload: Record<string, unknown>) {
    const res = await fetch(URLS.requests, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async getRequests() {
    const res = await fetch(URLS.requests, { headers: { ...authHeaders() } });
    const data = await res.json();
    return data.items || [];
  },

  async updateRequest(id: number, status: string) {
    const res = await fetch(URLS.requests, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ id, status }),
    });
    return res.json();
  },

  async deleteRequest(id: number) {
    const res = await fetch(`${URLS.requests}?id=${id}`, {
      method: 'DELETE',
      headers: { ...authHeaders() },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ошибка');
    return data;
  },
};
