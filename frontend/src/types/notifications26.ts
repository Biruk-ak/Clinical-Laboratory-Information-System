/** Domain types for notifications / NotificationRecord26 */
export type NotificationRecord26Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord26 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord26Status;
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

export interface NotificationRecord26CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord26Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord26ListResponse {
  items: NotificationRecord26[];
  total?: number;
}

export interface NotificationRecord26StatsResponse {
  activeCount: number;
}

export function isNotificationRecord26Active(rec: NotificationRecord26): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord26Label(rec: NotificationRecord26): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord26ByPriority(a: NotificationRecord26, b: NotificationRecord26): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
