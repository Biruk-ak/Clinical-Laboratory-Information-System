/** Domain types for qualitycontrol / QualityControlRecord25 */
export type QualityControlRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord25Status;
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

export interface QualityControlRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord25ListResponse {
  items: QualityControlRecord25[];
  total?: number;
}

export interface QualityControlRecord25StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord25Active(rec: QualityControlRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord25Label(rec: QualityControlRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord25ByPriority(a: QualityControlRecord25, b: QualityControlRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
