import type {
  AnalyticsRecord02,
  AnalyticsRecord02CreateRequest,
  AnalyticsRecord02ListResponse,
  AnalyticsRecord02StatsResponse,
} from '../types/analytics02';

const BASE = `/api/analytics/v02`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AnalyticsRecord02 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listAnalyticsRecord02(facilityId: string, limit = 50, offset = 0): Promise<AnalyticsRecord02ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getAnalyticsRecord02(id: string): Promise<AnalyticsRecord02> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createAnalyticsRecord02(payload: AnalyticsRecord02CreateRequest): Promise<AnalyticsRecord02> {
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

export async function updateAnalyticsRecord02(id: string, payload: AnalyticsRecord02CreateRequest): Promise<AnalyticsRecord02> {
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

export async function archiveAnalyticsRecord02(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchAnalyticsRecord02(facilityId: string, q: string): Promise<AnalyticsRecord02ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsAnalyticsRecord02(facilityId: string): Promise<AnalyticsRecord02StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
