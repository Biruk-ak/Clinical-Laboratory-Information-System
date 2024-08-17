import type {
  AuthRecord12,
  AuthRecord12CreateRequest,
  AuthRecord12ListResponse,
  AuthRecord12StatsResponse,
} from '../types/auth12';

const BASE = `/api/auth/v12`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AuthRecord12 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listAuthRecord12(facilityId: string, limit = 50, offset = 0): Promise<AuthRecord12ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getAuthRecord12(id: string): Promise<AuthRecord12> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createAuthRecord12(payload: AuthRecord12CreateRequest): Promise<AuthRecord12> {
  return parse(await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      external_code: payload.externalCode,
      display_name: payload.displayName,
      status: payload.status,
      priority: payload.priority,
      facility_id: payload.facilityId,
      notes: payload.notes ?? '',
    }),
  }));
}

export async function updateAuthRecord12(id: string, payload: AuthRecord12CreateRequest): Promise<AuthRecord12> {
  return parse(await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      external_code: payload.externalCode,
      display_name: payload.displayName,
      status: payload.status,
      priority: payload.priority,
      facility_id: payload.facilityId,
      notes: payload.notes ?? '',
    }),
  }));
}

export async function archiveAuthRecord12(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchAuthRecord12(facilityId: string, q: string): Promise<AuthRecord12ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsAuthRecord12(facilityId: string): Promise<AuthRecord12StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
