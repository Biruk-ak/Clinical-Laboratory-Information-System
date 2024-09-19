import { describe, expect, it } from 'vitest';
import {
  compareInventoryRecord24ByPriority,
  formatInventoryRecord24Label,
  isInventoryRecord24Active,
  type InventoryRecord24,
} from '../types/inventory24';

function make(partial: Partial<InventoryRecord24> = {}): InventoryRecord24 {
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

describe('InventoryRecord24 helpers', () => {
  it('formats label', () => {
    expect(formatInventoryRecord24Label(make())).toContain('CODE-24');
  });

  it('detects active records', () => {
    expect(isInventoryRecord24Active(make())).toBe(true);
    expect(isInventoryRecord24Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isInventoryRecord24Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareInventoryRecord24ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
