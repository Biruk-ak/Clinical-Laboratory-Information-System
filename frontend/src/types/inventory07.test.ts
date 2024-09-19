import { describe, expect, it } from 'vitest';
import {
  compareInventoryRecord07ByPriority,
  formatInventoryRecord07Label,
  isInventoryRecord07Active,
  type InventoryRecord07,
} from '../types/inventory07';

function make(partial: Partial<InventoryRecord07> = {}): InventoryRecord07 {
  return {
    id: '1',
    externalCode: 'CODE-7',
    displayName: 'Record 7',
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

describe('InventoryRecord07 helpers', () => {
  it('formats label', () => {
    expect(formatInventoryRecord07Label(make())).toContain('CODE-7');
  });

  it('detects active records', () => {
    expect(isInventoryRecord07Active(make())).toBe(true);
    expect(isInventoryRecord07Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isInventoryRecord07Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareInventoryRecord07ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
