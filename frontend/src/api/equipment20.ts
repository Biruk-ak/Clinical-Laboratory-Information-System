import type {
  EquipmentRecord20,
  EquipmentRecord20CreateRequest,
  EquipmentRecord20ListResponse,
  EquipmentRecord20StatsResponse,
} from '../types/equipment20';

const BASE = `/api/equipment/v20`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`EquipmentRecord20 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listEquipmentRecord20(facilityId: string, limit = 50, offset = 0): Promise<EquipmentRecord20ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getEquipmentRecord20(id: string): Promise<EquipmentRecord20> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createEquipmentRecord20(payload: EquipmentRecord20CreateRequest): Promise<EquipmentRecord20> {
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

export async function updateEquipmentRecord20(id: string, payload: EquipmentRecord20CreateRequest): Promise<EquipmentRecord20> {
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

export async function archiveEquipmentRecord20(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchEquipmentRecord20(facilityId: string, q: string): Promise<EquipmentRecord20ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsEquipmentRecord20(facilityId: string): Promise<EquipmentRecord20StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
