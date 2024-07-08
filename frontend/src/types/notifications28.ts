/** Domain types for notifications / NotificationRecord28 */
export type NotificationRecord28Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord28 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord28Status;
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

export interface NotificationRecord28CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord28Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord28ListResponse {
  items: NotificationRecord28[];
  total?: number;
}

export interface NotificationRecord28StatsResponse {
  activeCount: number;
}

export function isNotificationRecord28Active(rec: NotificationRecord28): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord28Label(rec: NotificationRecord28): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord28ByPriority(a: NotificationRecord28, b: NotificationRecord28): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
