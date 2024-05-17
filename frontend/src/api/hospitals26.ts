import type {
  HospitalRecord26,
  HospitalRecord26CreateRequest,
  HospitalRecord26ListResponse,
  HospitalRecord26StatsResponse,
} from '../types/hospitals26';

const BASE = `/api/hospitals/v26`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HospitalRecord26 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listHospitalRecord26(facilityId: string, limit = 50, offset = 0): Promise<HospitalRecord26ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getHospitalRecord26(id: string): Promise<HospitalRecord26> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createHospitalRecord26(payload: HospitalRecord26CreateRequest): Promise<HospitalRecord26> {
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

export async function updateHospitalRecord26(id: string, payload: HospitalRecord26CreateRequest): Promise<HospitalRecord26> {
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

export async function archiveHospitalRecord26(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchHospitalRecord26(facilityId: string, q: string): Promise<HospitalRecord26ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsHospitalRecord26(facilityId: string): Promise<HospitalRecord26StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
