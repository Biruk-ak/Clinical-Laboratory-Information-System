import { describe, expect, it } from 'vitest';
import {
  compareInventoryRecord12ByPriority,
  formatInventoryRecord12Label,
  isInventoryRecord12Active,
  type InventoryRecord12,
} from '../types/inventory12';

function make(partial: Partial<InventoryRecord12> = {}): InventoryRecord12 {
  return {
    id: '1',
    externalCode: 'CODE-12',
    displayName: 'Record 12',
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

describe('InventoryRecord12 helpers', () => {
  it('formats label', () => {
    expect(formatInventoryRecord12Label(make())).toContain('CODE-12');
  });

  it('detects active records', () => {
    expect(isInventoryRecord12Active(make())).toBe(true);
    expect(isInventoryRecord12Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isInventoryRecord12Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareInventoryRecord12ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
