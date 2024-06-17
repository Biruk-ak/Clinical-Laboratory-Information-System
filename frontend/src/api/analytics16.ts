import type {
  AnalyticsRecord16,
  AnalyticsRecord16CreateRequest,
  AnalyticsRecord16ListResponse,
  AnalyticsRecord16StatsResponse,
} from '../types/analytics16';

const BASE = `/api/analytics/v16`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AnalyticsRecord16 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listAnalyticsRecord16(facilityId: string, limit = 50, offset = 0): Promise<AnalyticsRecord16ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getAnalyticsRecord16(id: string): Promise<AnalyticsRecord16> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createAnalyticsRecord16(payload: AnalyticsRecord16CreateRequest): Promise<AnalyticsRecord16> {
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

export async function updateAnalyticsRecord16(id: string, payload: AnalyticsRecord16CreateRequest): Promise<AnalyticsRecord16> {
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

export async function archiveAnalyticsRecord16(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchAnalyticsRecord16(facilityId: string, q: string): Promise<AnalyticsRecord16ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsAnalyticsRecord16(facilityId: string): Promise<AnalyticsRecord16StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
