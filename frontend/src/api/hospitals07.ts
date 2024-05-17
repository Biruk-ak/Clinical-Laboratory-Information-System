import type {
  HospitalRecord07,
  HospitalRecord07CreateRequest,
  HospitalRecord07ListResponse,
  HospitalRecord07StatsResponse,
} from '../types/hospitals07';

const BASE = `/api/hospitals/v07`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HospitalRecord07 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listHospitalRecord07(facilityId: string, limit = 50, offset = 0): Promise<HospitalRecord07ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getHospitalRecord07(id: string): Promise<HospitalRecord07> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createHospitalRecord07(payload: HospitalRecord07CreateRequest): Promise<HospitalRecord07> {
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

export async function updateHospitalRecord07(id: string, payload: HospitalRecord07CreateRequest): Promise<HospitalRecord07> {
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

export async function archiveHospitalRecord07(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchHospitalRecord07(facilityId: string, q: string): Promise<HospitalRecord07ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsHospitalRecord07(facilityId: string): Promise<HospitalRecord07StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
