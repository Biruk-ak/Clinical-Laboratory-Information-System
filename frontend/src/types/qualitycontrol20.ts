/** Domain types for qualitycontrol / QualityControlRecord20 */
export type QualityControlRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord20Status;
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

export interface QualityControlRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord20ListResponse {
  items: QualityControlRecord20[];
  total?: number;
}

export interface QualityControlRecord20StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord20Active(rec: QualityControlRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord20Label(rec: QualityControlRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord20ByPriority(a: QualityControlRecord20, b: QualityControlRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
