/** Domain types for notifications / NotificationRecord06 */
export type NotificationRecord06Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord06 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord06Status;
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

export interface NotificationRecord06CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord06Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord06ListResponse {
  items: NotificationRecord06[];
  total?: number;
}

export interface NotificationRecord06StatsResponse {
  activeCount: number;
}

export function isNotificationRecord06Active(rec: NotificationRecord06): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord06Label(rec: NotificationRecord06): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord06ByPriority(a: NotificationRecord06, b: NotificationRecord06): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
