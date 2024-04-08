/** Domain types for qualitycontrol / QualityControlRecord27 */
export type QualityControlRecord27Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord27 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord27Status;
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

export interface QualityControlRecord27CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord27Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord27ListResponse {
  items: QualityControlRecord27[];
  total?: number;
}

export interface QualityControlRecord27StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord27Active(rec: QualityControlRecord27): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord27Label(rec: QualityControlRecord27): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord27ByPriority(a: QualityControlRecord27, b: QualityControlRecord27): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
