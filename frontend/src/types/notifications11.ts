/** Domain types for notifications / NotificationRecord11 */
export type NotificationRecord11Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord11 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord11Status;
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

export interface NotificationRecord11CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord11Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord11ListResponse {
  items: NotificationRecord11[];
  total?: number;
}

export interface NotificationRecord11StatsResponse {
  activeCount: number;
}

export function isNotificationRecord11Active(rec: NotificationRecord11): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord11Label(rec: NotificationRecord11): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord11ByPriority(a: NotificationRecord11, b: NotificationRecord11): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
