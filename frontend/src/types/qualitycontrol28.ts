/** Domain types for qualitycontrol / QualityControlRecord28 */
export type QualityControlRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord28Status;
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

export interface QualityControlRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord28ListResponse {
  items: QualityControlRecord28[];
  total?: number;
}

export interface QualityControlRecord28StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord28Active(rec: QualityControlRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord28Label(rec: QualityControlRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord28ByPriority(a: QualityControlRecord28, b: QualityControlRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
