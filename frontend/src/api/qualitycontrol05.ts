import type {
  QualityControlRecord05,
  QualityControlRecord05CreateRequest,
  QualityControlRecord05ListResponse,
  QualityControlRecord05StatsResponse,
} from '../types/qualitycontrol05';

const BASE = `/api/qualitycontrol/v05`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`QualityControlRecord05 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listQualityControlRecord05(facilityId: string, limit = 50, offset = 0): Promise<QualityControlRecord05ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getQualityControlRecord05(id: string): Promise<QualityControlRecord05> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createQualityControlRecord05(payload: QualityControlRecord05CreateRequest): Promise<QualityControlRecord05> {
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

export async function updateQualityControlRecord05(id: string, payload: QualityControlRecord05CreateRequest): Promise<QualityControlRecord05> {
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

export async function archiveQualityControlRecord05(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchQualityControlRecord05(facilityId: string, q: string): Promise<QualityControlRecord05ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsQualityControlRecord05(facilityId: string): Promise<QualityControlRecord05StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
