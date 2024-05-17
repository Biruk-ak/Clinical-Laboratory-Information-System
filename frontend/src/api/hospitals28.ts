import type {
  HospitalRecord28,
  HospitalRecord28CreateRequest,
  HospitalRecord28ListResponse,
  HospitalRecord28StatsResponse,
} from '../types/hospitals28';

const BASE = `/api/hospitals/v28`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HospitalRecord28 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listHospitalRecord28(facilityId: string, limit = 50, offset = 0): Promise<HospitalRecord28ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getHospitalRecord28(id: string): Promise<HospitalRecord28> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createHospitalRecord28(payload: HospitalRecord28CreateRequest): Promise<HospitalRecord28> {
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

export async function updateHospitalRecord28(id: string, payload: HospitalRecord28CreateRequest): Promise<HospitalRecord28> {
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

export async function archiveHospitalRecord28(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchHospitalRecord28(facilityId: string, q: string): Promise<HospitalRecord28ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsHospitalRecord28(facilityId: string): Promise<HospitalRecord28StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
