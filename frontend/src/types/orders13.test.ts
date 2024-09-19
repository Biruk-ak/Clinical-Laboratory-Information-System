import { describe, expect, it } from 'vitest';
import {
  compareOrderRecord13ByPriority,
  formatOrderRecord13Label,
  isOrderRecord13Active,
  type OrderRecord13,
} from '../types/orders13';

function make(partial: Partial<OrderRecord13> = {}): OrderRecord13 {
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

describe('OrderRecord13 helpers', () => {
  it('formats label', () => {
    expect(formatOrderRecord13Label(make())).toContain('CODE-13');
  });

  it('detects active records', () => {
    expect(isOrderRecord13Active(make())).toBe(true);
    expect(isOrderRecord13Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isOrderRecord13Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareOrderRecord13ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
