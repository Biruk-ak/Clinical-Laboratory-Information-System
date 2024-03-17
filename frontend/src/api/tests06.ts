import type {
  LabTestRecord06,
  LabTestRecord06CreateRequest,
  LabTestRecord06ListResponse,
  LabTestRecord06StatsResponse,
} from '../types/tests06';

const BASE = `/api/tests/v06`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LabTestRecord06 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listLabTestRecord06(facilityId: string, limit = 50, offset = 0): Promise<LabTestRecord06ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getLabTestRecord06(id: string): Promise<LabTestRecord06> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createLabTestRecord06(payload: LabTestRecord06CreateRequest): Promise<LabTestRecord06> {
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

export async function updateLabTestRecord06(id: string, payload: LabTestRecord06CreateRequest): Promise<LabTestRecord06> {
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

export async function archiveLabTestRecord06(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchLabTestRecord06(facilityId: string, q: string): Promise<LabTestRecord06ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsLabTestRecord06(facilityId: string): Promise<LabTestRecord06StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
