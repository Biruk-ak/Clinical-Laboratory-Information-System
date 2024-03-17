import type {
  EquipmentRecord05,
  EquipmentRecord05CreateRequest,
  EquipmentRecord05ListResponse,
  EquipmentRecord05StatsResponse,
} from '../types/equipment05';

const BASE = `/api/equipment/v05`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`EquipmentRecord05 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listEquipmentRecord05(facilityId: string, limit = 50, offset = 0): Promise<EquipmentRecord05ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getEquipmentRecord05(id: string): Promise<EquipmentRecord05> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createEquipmentRecord05(payload: EquipmentRecord05CreateRequest): Promise<EquipmentRecord05> {
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

export async function updateEquipmentRecord05(id: string, payload: EquipmentRecord05CreateRequest): Promise<EquipmentRecord05> {
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

export async function archiveEquipmentRecord05(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchEquipmentRecord05(facilityId: string, q: string): Promise<EquipmentRecord05ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsEquipmentRecord05(facilityId: string): Promise<EquipmentRecord05StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
