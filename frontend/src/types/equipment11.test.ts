import { describe, expect, it } from 'vitest';
import {
  compareEquipmentRecord11ByPriority,
  formatEquipmentRecord11Label,
  isEquipmentRecord11Active,
  type EquipmentRecord11,
} from '../types/equipment11';

function make(partial: Partial<EquipmentRecord11> = {}): EquipmentRecord11 {
  return {
    id: '1',
    externalCode: 'CODE-11',
    displayName: 'Record 11',
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

describe('EquipmentRecord11 helpers', () => {
  it('formats label', () => {
    expect(formatEquipmentRecord11Label(make())).toContain('CODE-11');
  });

  it('detects active records', () => {
    expect(isEquipmentRecord11Active(make())).toBe(true);
    expect(isEquipmentRecord11Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isEquipmentRecord11Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareEquipmentRecord11ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
