import type {
  AnalyticsRecord06,
  AnalyticsRecord06CreateRequest,
  AnalyticsRecord06ListResponse,
  AnalyticsRecord06StatsResponse,
} from '../types/analytics06';

const BASE = `/api/analytics/v06`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AnalyticsRecord06 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listAnalyticsRecord06(facilityId: string, limit = 50, offset = 0): Promise<AnalyticsRecord06ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getAnalyticsRecord06(id: string): Promise<AnalyticsRecord06> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createAnalyticsRecord06(payload: AnalyticsRecord06CreateRequest): Promise<AnalyticsRecord06> {
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

export async function updateAnalyticsRecord06(id: string, payload: AnalyticsRecord06CreateRequest): Promise<AnalyticsRecord06> {
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

export async function archiveAnalyticsRecord06(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchAnalyticsRecord06(facilityId: string, q: string): Promise<AnalyticsRecord06ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsAnalyticsRecord06(facilityId: string): Promise<AnalyticsRecord06StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
