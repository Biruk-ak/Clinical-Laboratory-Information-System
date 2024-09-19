import { describe, expect, it } from 'vitest';
import {
  compareOrderRecord02ByPriority,
  formatOrderRecord02Label,
  isOrderRecord02Active,
  type OrderRecord02,
} from '../types/orders02';

function make(partial: Partial<OrderRecord02> = {}): OrderRecord02 {
  return {
    id: '1',
    externalCode: 'CODE-2',
    displayName: 'Record 2',
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

describe('OrderRecord02 helpers', () => {
  it('formats label', () => {
    expect(formatOrderRecord02Label(make())).toContain('CODE-2');
  });

  it('detects active records', () => {
    expect(isOrderRecord02Active(make())).toBe(true);
    expect(isOrderRecord02Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isOrderRecord02Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareOrderRecord02ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
