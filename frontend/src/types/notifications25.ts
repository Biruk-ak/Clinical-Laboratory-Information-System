/** Domain types for notifications / NotificationRecord25 */
export type NotificationRecord25Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord25 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord25Status;
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

export interface NotificationRecord25CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord25Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord25ListResponse {
  items: NotificationRecord25[];
  total?: number;
}

export interface NotificationRecord25StatsResponse {
  activeCount: number;
}

export function isNotificationRecord25Active(rec: NotificationRecord25): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord25Label(rec: NotificationRecord25): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord25ByPriority(a: NotificationRecord25, b: NotificationRecord25): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
