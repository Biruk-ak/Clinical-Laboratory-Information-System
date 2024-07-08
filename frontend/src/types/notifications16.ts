/** Domain types for notifications / NotificationRecord16 */
export type NotificationRecord16Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord16 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord16Status;
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

export interface NotificationRecord16CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord16Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord16ListResponse {
  items: NotificationRecord16[];
  total?: number;
}

export interface NotificationRecord16StatsResponse {
  activeCount: number;
}

export function isNotificationRecord16Active(rec: NotificationRecord16): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord16Label(rec: NotificationRecord16): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord16ByPriority(a: NotificationRecord16, b: NotificationRecord16): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
