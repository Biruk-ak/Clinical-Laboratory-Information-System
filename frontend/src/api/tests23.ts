import type {
  LabTestRecord23,
  LabTestRecord23CreateRequest,
  LabTestRecord23ListResponse,
  LabTestRecord23StatsResponse,
} from '../types/tests23';

const BASE = `/api/tests/v23`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LabTestRecord23 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listLabTestRecord23(facilityId: string, limit = 50, offset = 0): Promise<LabTestRecord23ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getLabTestRecord23(id: string): Promise<LabTestRecord23> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createLabTestRecord23(payload: LabTestRecord23CreateRequest): Promise<LabTestRecord23> {
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

export async function updateLabTestRecord23(id: string, payload: LabTestRecord23CreateRequest): Promise<LabTestRecord23> {
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

export async function archiveLabTestRecord23(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchLabTestRecord23(facilityId: string, q: string): Promise<LabTestRecord23ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsLabTestRecord23(facilityId: string): Promise<LabTestRecord23StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
