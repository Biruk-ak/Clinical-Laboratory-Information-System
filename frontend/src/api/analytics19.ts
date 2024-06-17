import type {
  AnalyticsRecord19,
  AnalyticsRecord19CreateRequest,
  AnalyticsRecord19ListResponse,
  AnalyticsRecord19StatsResponse,
} from '../types/analytics19';

const BASE = `/api/analytics/v19`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AnalyticsRecord19 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listAnalyticsRecord19(facilityId: string, limit = 50, offset = 0): Promise<AnalyticsRecord19ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getAnalyticsRecord19(id: string): Promise<AnalyticsRecord19> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createAnalyticsRecord19(payload: AnalyticsRecord19CreateRequest): Promise<AnalyticsRecord19> {
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

export async function updateAnalyticsRecord19(id: string, payload: AnalyticsRecord19CreateRequest): Promise<AnalyticsRecord19> {
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

export async function archiveAnalyticsRecord19(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchAnalyticsRecord19(facilityId: string, q: string): Promise<AnalyticsRecord19ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsAnalyticsRecord19(facilityId: string): Promise<AnalyticsRecord19StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
