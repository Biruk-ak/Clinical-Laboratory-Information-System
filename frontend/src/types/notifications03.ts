/** Domain types for notifications / NotificationRecord03 */
export type NotificationRecord03Status = 'draft' | 'active' | 'pending' | 'completed' | 'cancelled' | 'archived';

export interface NotificationRecord03 {
  id: string;
  externalCode: string;
  displayName: string;
  status: NotificationRecord03Status;
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

export interface NotificationRecord03CreateRequest {
  externalCode: string;
  displayName: string;
  status: NotificationRecord03Status;
  priority: number;
  facilityId: string;
  notes?: string;
}

export interface NotificationRecord03ListResponse {
  items: NotificationRecord03[];
  total?: number;
}

export interface NotificationRecord03StatsResponse {
  activeCount: number;
}

export function isNotificationRecord03Active(rec: NotificationRecord03): boolean {
  return rec.isActive && rec.status !== 'archived' && rec.status !== 'cancelled';
}

export function formatNotificationRecord03Label(rec: NotificationRecord03): string {
  return `${rec.externalCode} — ${rec.displayName}`;
}

export function compareNotificationRecord03ByPriority(a: NotificationRecord03, b: NotificationRecord03): number {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.displayName.localeCompare(b.displayName);
}
