/** Domain types for qualitycontrol / QualityControlRecord12 */
export type QualityControlRecord12Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord12 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord12Status;
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

export interface QualityControlRecord12CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord12Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord12ListResponse {
  items: QualityControlRecord12[];
  total?: number;
}

export interface QualityControlRecord12StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord12Active(rec: QualityControlRecord12): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord12Label(rec: QualityControlRecord12): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord12ByPriority(a: QualityControlRecord12, b: QualityControlRecord12): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
