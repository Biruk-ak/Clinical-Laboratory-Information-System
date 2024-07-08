/** Domain types for notifications / NotificationRecord19 */
export type NotificationRecord19Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord19 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord19Status;
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

export interface NotificationRecord19CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord19Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord19ListResponse {
  items: NotificationRecord19[];
  total?: number;
}

export interface NotificationRecord19StatsResponse {
  activeCount: number;
}

export function isNotificationRecord19Active(rec: NotificationRecord19): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord19Label(rec: NotificationRecord19): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord19ByPriority(a: NotificationRecord19, b: NotificationRecord19): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
