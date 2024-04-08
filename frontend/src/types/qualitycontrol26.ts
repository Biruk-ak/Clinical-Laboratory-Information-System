/** Domain types for qualitycontrol / QualityControlRecord26 */
export type QualityControlRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface QualityControlRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: QualityControlRecord26Status;
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

export interface QualityControlRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: QualityControlRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface QualityControlRecord26ListResponse {
  items: QualityControlRecord26[];
  total?: number;
}

export interface QualityControlRecord26StatsResponse {
  activeCount: number;
}

export function isQualityControlRecord26Active(rec: QualityControlRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatQualityControlRecord26Label(rec: QualityControlRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareQualityControlRecord26ByPriority(a: QualityControlRecord26, b: QualityControlRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
