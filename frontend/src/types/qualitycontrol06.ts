/** Domain types for qualitycontrol / QualityControlRecord06 */
export type QualityControlRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord06Status;
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

export interface QualityControlRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord06ListResponse {
  items: QualityControlRecord06[];
  total?: number;
}

export interface QualityControlRecord06StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord06Active(rec: QualityControlRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord06Label(rec: QualityControlRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord06ByPriority(a: QualityControlRecord06, b: QualityControlRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
