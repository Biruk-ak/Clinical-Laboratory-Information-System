import type {
  ReportRecord08,
  ReportRecord08CreateRequest,
  ReportRecord08ListResponse,
  ReportRecord08StatsResponse,
} from '../types/reports08';

const BASE = `/api/reports/v08`;

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`ReportRecord08 API ${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listReportRecord08(facilityId: string, limit = 50, offset = 0): Promise<ReportRecord08ListResponse> {
  const q = new URLSearchParams({ facility_id: facilityId, limit: String(limit), offset: String(offset) });
  return parse(await fetch(`${BASE}?${q}`));
}

export async function getReportRecord08(id: string): Promise<ReportRecord08> {
  return parse(await fetch(`${BASE}/${id}`));
}

export async function createReportRecord08(payload: ReportRecord08CreateRequest): Promise<ReportRecord08> {
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

export async function updateReportRecord08(id: string, payload: ReportRecord08CreateRequest): Promise<ReportRecord08> {
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

export async function archiveReportRecord08(id: string): Promise<void> {
  await parse(await fetch(`${BASE}/${id}`, { method: 'DELETE' }));
}

export async function searchReportRecord08(facilityId: string, q: string): Promise<ReportRecord08ListResponse> {
  const params = new URLSearchParams({ facility_id: facilityId, q });
  return parse(await fetch(`${BASE}/search?${params}`));
}

export async function statsReportRecord08(facilityId: string): Promise<ReportRecord08StatsResponse> {
  const params = new URLSearchParams({ facility_id: facilityId });
  const raw = await parse<{ active_count: number }>(await fetch(`${BASE}/stats?${params}`));
  return { activeCount: raw.active_count };
}
