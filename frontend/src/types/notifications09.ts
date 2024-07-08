/** Domain types for notifications / NotificationRecord09 */
export type NotificationRecord09Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord09 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord09Status;
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

export interface NotificationRecord09CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord09Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord09ListResponse {
  items: NotificationRecord09[];
  total?: number;
}

export interface NotificationRecord09StatsResponse {
  activeCount: number;
}

export function isNotificationRecord09Active(rec: NotificationRecord09): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord09Label(rec: NotificationRecord09): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord09ByPriority(a: NotificationRecord09, b: NotificationRecord09): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
