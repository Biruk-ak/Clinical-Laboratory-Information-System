/** Domain types for qualitycontrol / QualityControlRecord05 */
export type QualityControlRecord05Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord05 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord05Status;
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

export interface QualityControlRecord05CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord05Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord05ListResponse {
  items: QualityControlRecord05[];
  total?: number;
}

export interface QualityControlRecord05StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord05Active(rec: QualityControlRecord05): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord05Label(rec: QualityControlRecord05): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord05ByPriority(a: QualityControlRecord05, b: QualityControlRecord05): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
