import type {
  HospitalRecord05,
  HospitalRecord05CreateRequest,
  HospitalRecord05ListResponse,
  HospitalRecord05StatsResponse,
} from '../types/hospitals05';

const BASE = `/api/hospitals/v05`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HospitalRecord05 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listHospitalRecord05(facilityId: string, limit = 50, offset = 0): Promise<HospitalRecord05ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getHospitalRecord05(id: string): Promise<HospitalRecord05> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createHospitalRecord05(payload: HospitalRecord05CreateRequest): Promise<HospitalRecord05> {
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

export async function updateHospitalRecord05(id: string, payload: HospitalRecord05CreateRequest): Promise<HospitalRecord05> {
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

export async function archiveHospitalRecord05(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchHospitalRecord05(facilityId: string, q: string): Promise<HospitalRecord05ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsHospitalRecord05(facilityId: string): Promise<HospitalRecord05StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
