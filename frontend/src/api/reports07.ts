import type {
  ReportRecord07,
  ReportRecord07CreateRequest,
  ReportRecord07ListResponse,
  ReportRecord07StatsResponse,
} from '../types/reports07';

const BASE = `/api/reports/v07`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`ReportRecord07 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listReportRecord07(facilityId: string, limit = 50, offset = 0): Promise<ReportRecord07ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getReportRecord07(id: string): Promise<ReportRecord07> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createReportRecord07(payload: ReportRecord07CreateRequest): Promise<ReportRecord07> {
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

export async function updateReportRecord07(id: string, payload: ReportRecord07CreateRequest): Promise<ReportRecord07> {
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

export async function archiveReportRecord07(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchReportRecord07(facilityId: string, q: string): Promise<ReportRecord07ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsReportRecord07(facilityId: string): Promise<ReportRecord07StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
