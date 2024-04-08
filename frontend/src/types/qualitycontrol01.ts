/** Domain types for qualitycontrol / QualityControlRecord01 */
export type QualityControlRecord01Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord01 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord01Status;
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

export interface QualityControlRecord01CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord01Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord01ListResponse {
  items: QualityControlRecord01[];
  total?: number;
}

export interface QualityControlRecord01StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord01Active(rec: QualityControlRecord01): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord01Label(rec: QualityControlRecord01): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord01ByPriority(a: QualityControlRecord01, b: QualityControlRecord01): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
