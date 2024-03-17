import type {
  EquipmentRecord01,
  EquipmentRecord01CreateRequest,
  EquipmentRecord01ListResponse,
  EquipmentRecord01StatsResponse,
} from '../types/equipment01';

const BASE = `/api/equipment/v01`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`EquipmentRecord01 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listEquipmentRecord01(facilityId: string, limit = 50, offset = 0): Promise<EquipmentRecord01ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getEquipmentRecord01(id: string): Promise<EquipmentRecord01> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createEquipmentRecord01(payload: EquipmentRecord01CreateRequest): Promise<EquipmentRecord01> {
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

export async function updateEquipmentRecord01(id: string, payload: EquipmentRecord01CreateRequest): Promise<EquipmentRecord01> {
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

export async function archiveEquipmentRecord01(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchEquipmentRecord01(facilityId: string, q: string): Promise<EquipmentRecord01ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsEquipmentRecord01(facilityId: string): Promise<EquipmentRecord01StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
