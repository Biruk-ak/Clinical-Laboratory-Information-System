import { describe, expect, it } from 'vitest';
import {
  compareNotificationRecord04ByPriority,
  formatNotificationRecord04Label,
  isNotificationRecord04Active,
  type NotificationRecord04,
} from '../types/notifications04';

function make(partial: Partial<NotificationRecord04> = {}): NotificationRecord04 {
  return {
    id: '1',
    externalCode: 'CODE-4',
    displayName: 'Record 4',
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

describe('NotificationRecord04 helpers', () => {
  it('formats label', () => {
    expect(formatNotificationRecord04Label(make())).toContain('CODE-4');
  });

  it('detects active records', () => {
    expect(isNotificationRecord04Active(make())).toBe(true);
    expect(isNotificationRecord04Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isNotificationRecord04Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareNotificationRecord04ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
