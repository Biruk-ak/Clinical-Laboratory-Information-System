/** Domain types for qualitycontrol / QualityControlRecord23 */
export type QualityControlRecord23Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord23 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord23Status;
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

export interface QualityControlRecord23CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord23Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord23ListResponse {
  items: QualityControlRecord23[];
  total?: number;
}

export interface QualityControlRecord23StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord23Active(rec: QualityControlRecord23): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord23Label(rec: QualityControlRecord23): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord23ByPriority(a: QualityControlRecord23, b: QualityControlRecord23): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
