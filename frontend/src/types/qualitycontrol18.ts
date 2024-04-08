/** Domain types for qualitycontrol / QualityControlRecord18 */
export type QualityControlRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord18Status;
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

export interface QualityControlRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord18ListResponse {
  items: QualityControlRecord18[];
  total?: number;
}

export interface QualityControlRecord18StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord18Active(rec: QualityControlRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord18Label(rec: QualityControlRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord18ByPriority(a: QualityControlRecord18, b: QualityControlRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
