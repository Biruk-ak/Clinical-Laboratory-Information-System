import { describe, expect, it } from 'vitest';
import {
  compareInventoryRecord01ByPriority,
  formatInventoryRecord01Label,
  isInventoryRecord01Active,
  type InventoryRecord01,
} from '../types/inventory01';

function make(partial: Partial<InventoryRecord01> = {}): InventoryRecord01 {
  return {
    id: '1',
    externalCode: 'CODE-1',
    displayName: 'Record 1',
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

describe('InventoryRecord01 helpers', () => {
  it('formats label', () => {
    expect(formatInventoryRecord01Label(make())).toContain('CODE-1');
  });

  it('detects active records', () => {
    expect(isInventoryRecord01Active(make())).toBe(true);
    expect(isInventoryRecord01Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isInventoryRecord01Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareInventoryRecord01ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
