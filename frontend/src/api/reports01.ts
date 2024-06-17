import type {
  ReportRecord01,
  ReportRecord01CreateRequest,
  ReportRecord01ListResponse,
  ReportRecord01StatsResponse,
} from '../types/reports01';

const BASE = `/api/reports/v01`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`ReportRecord01 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listReportRecord01(facilityId: string, limit = 50, offset = 0): Promise<ReportRecord01ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getReportRecord01(id: string): Promise<ReportRecord01> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createReportRecord01(payload: ReportRecord01CreateRequest): Promise<ReportRecord01> {
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

export async function updateReportRecord01(id: string, payload: ReportRecord01CreateRequest): Promise<ReportRecord01> {
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

export async function archiveReportRecord01(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchReportRecord01(facilityId: string, q: string): Promise<ReportRecord01ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsReportRecord01(facilityId: string): Promise<ReportRecord01StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
