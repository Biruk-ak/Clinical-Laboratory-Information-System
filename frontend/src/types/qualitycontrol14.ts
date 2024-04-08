/** Domain types for qualitycontrol / QualityControlRecord14 */
export type QualityControlRecord14Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord14 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord14Status;
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

export interface QualityControlRecord14CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord14Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord14ListResponse {
  items: QualityControlRecord14[];
  total?: number;
}

export interface QualityControlRecord14StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord14Active(rec: QualityControlRecord14): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord14Label(rec: QualityControlRecord14): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord14ByPriority(a: QualityControlRecord14, b: QualityControlRecord14): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
