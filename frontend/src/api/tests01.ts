import type {
  LabTestRecord01,
  LabTestRecord01CreateRequest,
  LabTestRecord01ListResponse,
  LabTestRecord01StatsResponse,
} from '../types/tests01';

const BASE = `/api/tests/v01`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LabTestRecord01 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listLabTestRecord01(facilityId: string, limit = 50, offset = 0): Promise<LabTestRecord01ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getLabTestRecord01(id: string): Promise<LabTestRecord01> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createLabTestRecord01(payload: LabTestRecord01CreateRequest): Promise<LabTestRecord01> {
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

export async function updateLabTestRecord01(id: string, payload: LabTestRecord01CreateRequest): Promise<LabTestRecord01> {
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

export async function archiveLabTestRecord01(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchLabTestRecord01(facilityId: string, q: string): Promise<LabTestRecord01ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsLabTestRecord01(facilityId: string): Promise<LabTestRecord01StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
