/** Domain types for qualitycontrol / QualityControlRecord02 */
export type QualityControlRecord02Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord02 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord02Status;
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

export interface QualityControlRecord02CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord02Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord02ListResponse {
  items: QualityControlRecord02[];
  total?: number;
}

export interface QualityControlRecord02StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord02Active(rec: QualityControlRecord02): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord02Label(rec: QualityControlRecord02): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord02ByPriority(a: QualityControlRecord02, b: QualityControlRecord02): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
