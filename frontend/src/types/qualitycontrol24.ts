/** Domain types for qualitycontrol / QualityControlRecord24 */
export type QualityControlRecord24Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord24 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord24Status;
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

export interface QualityControlRecord24CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord24Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord24ListResponse {
  items: QualityControlRecord24[];
  total?: number;
}

export interface QualityControlRecord24StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord24Active(rec: QualityControlRecord24): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord24Label(rec: QualityControlRecord24): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord24ByPriority(a: QualityControlRecord24, b: QualityControlRecord24): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
