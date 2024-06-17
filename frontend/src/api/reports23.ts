import type {
  ReportRecord23,
  ReportRecord23CreateRequest,
  ReportRecord23ListResponse,
  ReportRecord23StatsResponse,
} from '../types/reports23';

const BASE = `/api/reports/v23`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`ReportRecord23 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listReportRecord23(facilityId: string, limit = 50, offset = 0): Promise<ReportRecord23ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getReportRecord23(id: string): Promise<ReportRecord23> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createReportRecord23(payload: ReportRecord23CreateRequest): Promise<ReportRecord23> {
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

export async function updateReportRecord23(id: string, payload: ReportRecord23CreateRequest): Promise<ReportRecord23> {
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

export async function archiveReportRecord23(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchReportRecord23(facilityId: string, q: string): Promise<ReportRecord23ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsReportRecord23(facilityId: string): Promise<ReportRecord23StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
