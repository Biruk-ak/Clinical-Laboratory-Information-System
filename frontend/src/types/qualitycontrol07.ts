/** Domain types for qualitycontrol / QualityControlRecord07 */
export type QualityControlRecord07Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord07 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord07Status;
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

export interface QualityControlRecord07CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord07Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord07ListResponse {
  items: QualityControlRecord07[];
  total?: number;
}

export interface QualityControlRecord07StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord07Active(rec: QualityControlRecord07): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord07Label(rec: QualityControlRecord07): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord07ByPriority(a: QualityControlRecord07, b: QualityControlRecord07): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
