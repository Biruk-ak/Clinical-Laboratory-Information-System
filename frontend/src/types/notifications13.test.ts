import { describe, expect, it } from 'vitest';
import {
  compareNotificationRecord13ByPriority,
  formatNotificationRecord13Label,
  isNotificationRecord13Active,
  type NotificationRecord13,
} from '../types/notifications13';

function make(partial: Partial<NotificationRecord13> = {}): NotificationRecord13 {
  return {
    id: '1',
    externalCode: 'CODE-13',
    displayName: 'Record 13',
    status: 'active',
    priority: 10,
    facilityId: 'fac-1',
    createdBy: 'u1',
    updatedBy: 'u1',
    notes: '',
    metadataJson: '{}',
    version: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    ...partial,
  };
}

describe('NotificationRecord13 helpers', () => {
  it('formats label', () => {
    expect(formatNotificationRecord13Label(make())).toContain('CODE-13');
  });

  it('detects active records', () => {
    expect(isNotificationRecord13Active(make())).toBe(true);
    expect(isNotificationRecord13Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isNotificationRecord13Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareNotificationRecord13ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
