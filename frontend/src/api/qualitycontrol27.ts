import type {
  QualityControlRecord27,
  QualityControlRecord27CreateRequest,
  QualityControlRecord27ListResponse,
  QualityControlRecord27StatsResponse,
} from '../types/qualitycontrol27';

const BASE = `/api/qualitycontrol/v27`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`QualityControlRecord27 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listQualityControlRecord27(facilityId: string, limit = 50, offset = 0): Promise<QualityControlRecord27ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getQualityControlRecord27(id: string): Promise<QualityControlRecord27> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createQualityControlRecord27(payload: QualityControlRecord27CreateRequest): Promise<QualityControlRecord27> {
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

export async function updateQualityControlRecord27(id: string, payload: QualityControlRecord27CreateRequest): Promise<QualityControlRecord27> {
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

export async function archiveQualityControlRecord27(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchQualityControlRecord27(facilityId: string, q: string): Promise<QualityControlRecord27ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsQualityControlRecord27(facilityId: string): Promise<QualityControlRecord27StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
