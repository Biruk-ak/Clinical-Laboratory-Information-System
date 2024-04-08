/** Domain types for qualitycontrol / QualityControlRecord16 */
export type QualityControlRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord16Status;
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

export interface QualityControlRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord16ListResponse {
  items: QualityControlRecord16[];
  total?: number;
}

export interface QualityControlRecord16StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord16Active(rec: QualityControlRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord16Label(rec: QualityControlRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord16ByPriority(a: QualityControlRecord16, b: QualityControlRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
