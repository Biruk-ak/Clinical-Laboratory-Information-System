/** Domain types for qualitycontrol / QualityControlRecord17 */
export type QualityControlRecord17Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord17 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord17Status;
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

export interface QualityControlRecord17CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord17Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord17ListResponse {
  items: QualityControlRecord17[];
  total?: number;
}

export interface QualityControlRecord17StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord17Active(rec: QualityControlRecord17): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord17Label(rec: QualityControlRecord17): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord17ByPriority(a: QualityControlRecord17, b: QualityControlRecord17): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
