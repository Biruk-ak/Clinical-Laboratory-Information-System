import type {
  AnalyticsRecord13,
  AnalyticsRecord13CreateRequest,
  AnalyticsRecord13ListResponse,
  AnalyticsRecord13StatsResponse,
} from '../types/analytics13';

const BASE = `/api/analytics/v13`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AnalyticsRecord13 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listAnalyticsRecord13(facilityId: string, limit = 50, offset = 0): Promise<AnalyticsRecord13ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getAnalyticsRecord13(id: string): Promise<AnalyticsRecord13> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createAnalyticsRecord13(payload: AnalyticsRecord13CreateRequest): Promise<AnalyticsRecord13> {
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

export async function updateAnalyticsRecord13(id: string, payload: AnalyticsRecord13CreateRequest): Promise<AnalyticsRecord13> {
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

export async function archiveAnalyticsRecord13(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchAnalyticsRecord13(facilityId: string, q: string): Promise<AnalyticsRecord13ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsAnalyticsRecord13(facilityId: string): Promise<AnalyticsRecord13StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
