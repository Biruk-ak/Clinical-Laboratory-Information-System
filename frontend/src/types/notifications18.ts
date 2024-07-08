/** Domain types for notifications / NotificationRecord18 */
export type NotificationRecord18Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord18 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord18Status;
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

export interface NotificationRecord18CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord18Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord18ListResponse {
  items: NotificationRecord18[];
  total?: number;
}

export interface NotificationRecord18StatsResponse {
  activeCount: number;
}

export function isNotificationRecord18Active(rec: NotificationRecord18): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord18Label(rec: NotificationRecord18): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord18ByPriority(a: NotificationRecord18, b: NotificationRecord18): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
