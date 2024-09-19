import { describe, expect, it } from 'vitest';
import {
  compareInventoryRecord13ByPriority,
  formatInventoryRecord13Label,
  isInventoryRecord13Active,
  type InventoryRecord13,
} from '../types/inventory13';

function make(partial: Partial<InventoryRecord13> = {}): InventoryRecord13 {
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

describe('InventoryRecord13 helpers', () => {
  it('formats label', () => {
    expect(formatInventoryRecord13Label(make())).toContain('CODE-13');
  });

  it('detects active records', () => {
    expect(isInventoryRecord13Active(make())).toBe(true);
    expect(isInventoryRecord13Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isInventoryRecord13Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareInventoryRecord13ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
