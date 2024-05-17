import type {
  QualityControlRecord07,
  QualityControlRecord07CreateRequest,
  QualityControlRecord07ListResponse,
  QualityControlRecord07StatsResponse,
} from '../types/qualitycontrol07';

const BASE = `/api/qualitycontrol/v07`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`QualityControlRecord07 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listQualityControlRecord07(facilityId: string, limit = 50, offset = 0): Promise<QualityControlRecord07ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getQualityControlRecord07(id: string): Promise<QualityControlRecord07> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createQualityControlRecord07(payload: QualityControlRecord07CreateRequest): Promise<QualityControlRecord07> {
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

export async function updateQualityControlRecord07(id: string, payload: QualityControlRecord07CreateRequest): Promise<QualityControlRecord07> {
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

export async function archiveQualityControlRecord07(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchQualityControlRecord07(facilityId: string, q: string): Promise<QualityControlRecord07ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsQualityControlRecord07(facilityId: string): Promise<QualityControlRecord07StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
