/** Domain types for notifications / NotificationRecord21 */
export type NotificationRecord21Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord21 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord21Status;
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

export interface NotificationRecord21CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord21Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord21ListResponse {
  items: NotificationRecord21[];
  total?: number;
}

export interface NotificationRecord21StatsResponse {
  activeCount: number;
}

export function isNotificationRecord21Active(rec: NotificationRecord21): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord21Label(rec: NotificationRecord21): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord21ByPriority(a: NotificationRecord21, b: NotificationRecord21): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
