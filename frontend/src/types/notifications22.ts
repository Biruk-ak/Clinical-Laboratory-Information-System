/** Domain types for notifications / NotificationRecord22 */
export type NotificationRecord22Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord22 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord22Status;
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

export interface NotificationRecord22CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord22Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord22ListResponse {
  items: NotificationRecord22[];
  total?: number;
}

export interface NotificationRecord22StatsResponse {
  activeCount: number;
}

export function isNotificationRecord22Active(rec: NotificationRecord22): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord22Label(rec: NotificationRecord22): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord22ByPriority(a: NotificationRecord22, b: NotificationRecord22): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
