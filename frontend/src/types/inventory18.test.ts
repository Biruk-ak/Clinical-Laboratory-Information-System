import { describe, expect, it } from 'vitest';
import {
  compareInventoryRecord18ByPriority,
  formatInventoryRecord18Label,
  isInventoryRecord18Active,
  type InventoryRecord18,
} from '../types/inventory18';

function make(partial: Partial<InventoryRecord18> = {}): InventoryRecord18 {
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

describe('InventoryRecord18 helpers', () => {
  it('formats label', () => {
    expect(formatInventoryRecord18Label(make())).toContain('CODE-18');
  });

  it('detects active records', () => {
    expect(isInventoryRecord18Active(make())).toBe(true);
    expect(isInventoryRecord18Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isInventoryRecord18Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareInventoryRecord18ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
