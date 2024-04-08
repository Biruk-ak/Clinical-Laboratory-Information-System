/** Domain types for qualitycontrol / QualityControlRecord09 */
export type QualityControlRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord09Status;
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

export interface QualityControlRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord09ListResponse {
  items: QualityControlRecord09[];
  total?: number;
}

export interface QualityControlRecord09StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord09Active(rec: QualityControlRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord09Label(rec: QualityControlRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord09ByPriority(a: QualityControlRecord09, b: QualityControlRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
