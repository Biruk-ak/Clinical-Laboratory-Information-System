/** Domain types for qualitycontrol / QualityControlRecord19 */
export type QualityControlRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord19Status;
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

export interface QualityControlRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord19ListResponse {
  items: QualityControlRecord19[];
  total?: number;
}

export interface QualityControlRecord19StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord19Active(rec: QualityControlRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord19Label(rec: QualityControlRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord19ByPriority(a: QualityControlRecord19, b: QualityControlRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
