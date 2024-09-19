import { describe, expect, it } from 'vitest';
import {
  compareInventoryRecord14ByPriority,
  formatInventoryRecord14Label,
  isInventoryRecord14Active,
  type InventoryRecord14,
} from '../types/inventory14';

function make(partial: Partial<InventoryRecord14> = {}): InventoryRecord14 {
  return {
    id: '1',
    externalCode: 'CODE-14',
    displayName: 'Record 14',
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

describe('InventoryRecord14 helpers', () => {
  it('formats label', () => {
    expect(formatInventoryRecord14Label(make())).toContain('CODE-14');
  });

  it('detects active records', () => {
    expect(isInventoryRecord14Active(make())).toBe(true);
    expect(isInventoryRecord14Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isInventoryRecord14Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareInventoryRecord14ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
