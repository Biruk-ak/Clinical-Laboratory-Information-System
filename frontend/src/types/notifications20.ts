/** Domain types for notifications / NotificationRecord20 */
export type NotificationRecord20Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord20 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord20Status;
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

export interface NotificationRecord20CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord20Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord20ListResponse {
  items: NotificationRecord20[];
  total?: number;
}

export interface NotificationRecord20StatsResponse {
  activeCount: number;
}

export function isNotificationRecord20Active(rec: NotificationRecord20): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord20Label(rec: NotificationRecord20): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord20ByPriority(a: NotificationRecord20, b: NotificationRecord20): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
