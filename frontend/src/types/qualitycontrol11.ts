/** Domain types for qualitycontrol / QualityControlRecord11 */
export type QualityControlRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord11Status;
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

export interface QualityControlRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord11ListResponse {
  items: QualityControlRecord11[];
  total?: number;
}

export interface QualityControlRecord11StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord11Active(rec: QualityControlRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord11Label(rec: QualityControlRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord11ByPriority(a: QualityControlRecord11, b: QualityControlRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
