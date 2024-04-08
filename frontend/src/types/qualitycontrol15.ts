/** Domain types for qualitycontrol / QualityControlRecord15 */
export type QualityControlRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord15Status;
  priority: number;
  facilityId: string;
  createdBy: string;
  updatedBy: string;
  notes: string;
  metadataJson: string;
  version: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string | null;
}

export interface QualityControlRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord15ListResponse {
  items: QualityControlRecord15[];
  total?: number;
}

export interface QualityControlRecord15StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord15Active(rec: QualityControlRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord15Label(rec: QualityControlRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord15ByPriority(a: QualityControlRecord15, b: QualityControlRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
