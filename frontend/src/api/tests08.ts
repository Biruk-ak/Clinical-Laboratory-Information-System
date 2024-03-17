import type {
  LabTestRecord08,
  LabTestRecord08CreateRequest,
  LabTestRecord08ListResponse,
  LabTestRecord08StatsResponse,
} from '../types/tests08';

const BASE = `/api/tests/v08`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LabTestRecord08 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listLabTestRecord08(facilityId: string, limit = 50, offset = 0): Promise<LabTestRecord08ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getLabTestRecord08(id: string): Promise<LabTestRecord08> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createLabTestRecord08(payload: LabTestRecord08CreateRequest): Promise<LabTestRecord08> {
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

export async function updateLabTestRecord08(id: string, payload: LabTestRecord08CreateRequest): Promise<LabTestRecord08> {
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

export async function archiveLabTestRecord08(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchLabTestRecord08(facilityId: string, q: string): Promise<LabTestRecord08ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsLabTestRecord08(facilityId: string): Promise<LabTestRecord08StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
