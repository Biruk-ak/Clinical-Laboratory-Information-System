import { describe, expect, it } from 'vitest';
import {
  compareOrderRecord18ByPriority,
  formatOrderRecord18Label,
  isOrderRecord18Active,
  type OrderRecord18,
} from '../types/orders18';

function make(partial: Partial<OrderRecord18> = {}): OrderRecord18 {
  return {
    id: '1',
    externalCode: 'CODE-18',
    displayName: 'Record 18',
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

describe('OrderRecord18 helpers', () => {
  it('formats label', () => {
    expect(formatOrderRecord18Label(make())).toContain('CODE-18');
  });

  it('detects active records', () => {
    expect(isOrderRecord18Active(make())).toBe(true);
    expect(isOrderRecord18Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isOrderRecord18Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareOrderRecord18ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
