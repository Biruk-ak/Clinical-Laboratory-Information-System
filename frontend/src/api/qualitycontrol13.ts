import type {
  QualityControlRecord13,
  QualityControlRecord13CreateRequest,
  QualityControlRecord13ListResponse,
  QualityControlRecord13StatsResponse,
} from '../types/qualitycontrol13';

const BASE = `/api/qualitycontrol/v13`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`QualityControlRecord13 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listQualityControlRecord13(facilityId: string, limit = 50, offset = 0): Promise<QualityControlRecord13ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getQualityControlRecord13(id: string): Promise<QualityControlRecord13> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createQualityControlRecord13(payload: QualityControlRecord13CreateRequest): Promise<QualityControlRecord13> {
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

export async function updateQualityControlRecord13(id: string, payload: QualityControlRecord13CreateRequest): Promise<QualityControlRecord13> {
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

export async function archiveQualityControlRecord13(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchQualityControlRecord13(facilityId: string, q: string): Promise<QualityControlRecord13ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsQualityControlRecord13(facilityId: string): Promise<QualityControlRecord13StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
