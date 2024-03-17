import type {
  EquipmentRecord08,
  EquipmentRecord08CreateRequest,
  EquipmentRecord08ListResponse,
  EquipmentRecord08StatsResponse,
} from '../types/equipment08';

const BASE = `/api/equipment/v08`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`EquipmentRecord08 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listEquipmentRecord08(facilityId: string, limit = 50, offset = 0): Promise<EquipmentRecord08ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getEquipmentRecord08(id: string): Promise<EquipmentRecord08> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createEquipmentRecord08(payload: EquipmentRecord08CreateRequest): Promise<EquipmentRecord08> {
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

export async function updateEquipmentRecord08(id: string, payload: EquipmentRecord08CreateRequest): Promise<EquipmentRecord08> {
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

export async function archiveEquipmentRecord08(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchEquipmentRecord08(facilityId: string, q: string): Promise<EquipmentRecord08ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsEquipmentRecord08(facilityId: string): Promise<EquipmentRecord08StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
