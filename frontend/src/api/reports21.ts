import type {
  ReportRecord21,
  ReportRecord21CreateRequest,
  ReportRecord21ListResponse,
  ReportRecord21StatsResponse,
} from '../types/reports21';

const BASE = `/api/reports/v21`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`ReportRecord21 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listReportRecord21(facilityId: string, limit = 50, offset = 0): Promise<ReportRecord21ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getReportRecord21(id: string): Promise<ReportRecord21> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createReportRecord21(payload: ReportRecord21CreateRequest): Promise<ReportRecord21> {
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

export async function updateReportRecord21(id: string, payload: ReportRecord21CreateRequest): Promise<ReportRecord21> {
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

export async function archiveReportRecord21(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchReportRecord21(facilityId: string, q: string): Promise<ReportRecord21ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsReportRecord21(facilityId: string): Promise<ReportRecord21StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
