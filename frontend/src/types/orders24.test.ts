import { describe, expect, it } from 'vitest';
import {
  compareOrderRecord24ByPriority,
  formatOrderRecord24Label,
  isOrderRecord24Active,
  type OrderRecord24,
} from '../types/orders24';

function make(partial: Partial<OrderRecord24> = {}): OrderRecord24 {
  return {
    id: '1',
    externalCode: 'CODE-24',
    displayName: 'Record 24',
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

describe('OrderRecord24 helpers', () => {
  it('formats label', () => {
    expect(formatOrderRecord24Label(make())).toContain('CODE-24');
  });

  it('detects active records', () => {
    expect(isOrderRecord24Active(make())).toBe(true);
    expect(isOrderRecord24Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isOrderRecord24Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareOrderRecord24ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
