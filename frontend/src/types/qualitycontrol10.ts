/** Domain types for qualitycontrol / QualityControlRecord10 */
export type QualityControlRecord10Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord10 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord10Status;
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

export interface QualityControlRecord10CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord10Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord10ListResponse {
  items: QualityControlRecord10[];
  total?: number;
}

export interface QualityControlRecord10StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord10Active(rec: QualityControlRecord10): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord10Label(rec: QualityControlRecord10): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord10ByPriority(a: QualityControlRecord10, b: QualityControlRecord10): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
