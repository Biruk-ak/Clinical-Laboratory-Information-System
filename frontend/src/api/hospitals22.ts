import type {
  HospitalRecord22,
  HospitalRecord22CreateRequest,
  HospitalRecord22ListResponse,
  HospitalRecord22StatsResponse,
} from '../types/hospitals22';

const BASE = `/api/hospitals/v22`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HospitalRecord22 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listHospitalRecord22(facilityId: string, limit = 50, offset = 0): Promise<HospitalRecord22ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getHospitalRecord22(id: string): Promise<HospitalRecord22> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createHospitalRecord22(payload: HospitalRecord22CreateRequest): Promise<HospitalRecord22> {
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

export async function updateHospitalRecord22(id: string, payload: HospitalRecord22CreateRequest): Promise<HospitalRecord22> {
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

export async function archiveHospitalRecord22(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchHospitalRecord22(facilityId: string, q: string): Promise<HospitalRecord22ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsHospitalRecord22(facilityId: string): Promise<HospitalRecord22StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
