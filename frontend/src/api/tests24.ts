import type {
  LabTestRecord24,
  LabTestRecord24CreateRequest,
  LabTestRecord24ListResponse,
  LabTestRecord24StatsResponse,
} from '../types/tests24';

const BASE = `/api/tests/v24`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LabTestRecord24 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listLabTestRecord24(facilityId: string, limit = 50, offset = 0): Promise<LabTestRecord24ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getLabTestRecord24(id: string): Promise<LabTestRecord24> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createLabTestRecord24(payload: LabTestRecord24CreateRequest): Promise<LabTestRecord24> {
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

export async function updateLabTestRecord24(id: string, payload: LabTestRecord24CreateRequest): Promise<LabTestRecord24> {
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

export async function archiveLabTestRecord24(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchLabTestRecord24(facilityId: string, q: string): Promise<LabTestRecord24ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsLabTestRecord24(facilityId: string): Promise<LabTestRecord24StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
