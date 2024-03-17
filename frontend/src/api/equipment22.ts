import type {
  EquipmentRecord22,
  EquipmentRecord22CreateRequest,
  EquipmentRecord22ListResponse,
  EquipmentRecord22StatsResponse,
} from '../types/equipment22';

const BASE = `/api/equipment/v22`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`EquipmentRecord22 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listEquipmentRecord22(facilityId: string, limit = 50, offset = 0): Promise<EquipmentRecord22ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getEquipmentRecord22(id: string): Promise<EquipmentRecord22> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createEquipmentRecord22(payload: EquipmentRecord22CreateRequest): Promise<EquipmentRecord22> {
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

export async function updateEquipmentRecord22(id: string, payload: EquipmentRecord22CreateRequest): Promise<EquipmentRecord22> {
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

export async function archiveEquipmentRecord22(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchEquipmentRecord22(facilityId: string, q: string): Promise<EquipmentRecord22ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsEquipmentRecord22(facilityId: string): Promise<EquipmentRecord22StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
