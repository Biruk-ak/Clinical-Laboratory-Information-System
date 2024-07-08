/** Domain types for notifications / NotificationRecord15 */
export type NotificationRecord15Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord15 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord15Status;
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

export interface NotificationRecord15CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord15Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord15ListResponse {
  items: NotificationRecord15[];
  total?: number;
}

export interface NotificationRecord15StatsResponse {
  activeCount: number;
}

export function isNotificationRecord15Active(rec: NotificationRecord15): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord15Label(rec: NotificationRecord15): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord15ByPriority(a: NotificationRecord15, b: NotificationRecord15): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
