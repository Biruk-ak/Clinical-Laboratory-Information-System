import type {
  QualityControlRecord23,
  QualityControlRecord23CreateRequest,
  QualityControlRecord23ListResponse,
  QualityControlRecord23StatsResponse,
} from '../types/qualitycontrol23';

const BASE = `/api/qualitycontrol/v23`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`QualityControlRecord23 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listQualityControlRecord23(facilityId: string, limit = 50, offset = 0): Promise<QualityControlRecord23ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getQualityControlRecord23(id: string): Promise<QualityControlRecord23> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createQualityControlRecord23(payload: QualityControlRecord23CreateRequest): Promise<QualityControlRecord23> {
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

export async function updateQualityControlRecord23(id: string, payload: QualityControlRecord23CreateRequest): Promise<QualityControlRecord23> {
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

export async function archiveQualityControlRecord23(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchQualityControlRecord23(facilityId: string, q: string): Promise<QualityControlRecord23ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsQualityControlRecord23(facilityId: string): Promise<QualityControlRecord23StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
