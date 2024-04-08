/** Domain types for qualitycontrol / QualityControlRecord03 */
export type QualityControlRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord03Status;
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

export interface QualityControlRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord03ListResponse {
  items: QualityControlRecord03[];
  total?: number;
}

export interface QualityControlRecord03StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord03Active(rec: QualityControlRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord03Label(rec: QualityControlRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord03ByPriority(a: QualityControlRecord03, b: QualityControlRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
