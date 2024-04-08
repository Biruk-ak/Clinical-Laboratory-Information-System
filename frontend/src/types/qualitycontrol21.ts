/** Domain types for qualitycontrol / QualityControlRecord21 */
export type QualityControlRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord21Status;
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

export interface QualityControlRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord21ListResponse {
  items: QualityControlRecord21[];
  total?: number;
}

export interface QualityControlRecord21StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord21Active(rec: QualityControlRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord21Label(rec: QualityControlRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord21ByPriority(a: QualityControlRecord21, b: QualityControlRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
