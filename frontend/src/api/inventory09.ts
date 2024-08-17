import type {
  InventoryRecord09,
  InventoryRecord09CreateRequest,
  InventoryRecord09ListResponse,
  InventoryRecord09StatsResponse,
} from '../types/inventory09';

const BASE = `/api/inventory/v09`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`InventoryRecord09 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listInventoryRecord09(facilityId: string, limit = 50, offset = 0): Promise<InventoryRecord09ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getInventoryRecord09(id: string): Promise<InventoryRecord09> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createInventoryRecord09(payload: InventoryRecord09CreateRequest): Promise<InventoryRecord09> {
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

export async function updateInventoryRecord09(id: string, payload: InventoryRecord09CreateRequest): Promise<InventoryRecord09> {
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

export async function archiveInventoryRecord09(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchInventoryRecord09(facilityId: string, q: string): Promise<InventoryRecord09ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsInventoryRecord09(facilityId: string): Promise<InventoryRecord09StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
