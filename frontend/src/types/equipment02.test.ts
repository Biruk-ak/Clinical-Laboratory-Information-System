import { describe, expect, it } from 'vitest';
import {
  compareEquipmentRecord02ByPriority,
  formatEquipmentRecord02Label,
  isEquipmentRecord02Active,
  type EquipmentRecord02,
} from '../types/equipment02';

function make(partial: Partial<EquipmentRecord02> = {}): EquipmentRecord02 {
  return {
    id: '1',
    externalCode: 'CODE-2',
    displayName: 'Record 2',
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

describe('EquipmentRecord02 helpers', () => {
  it('formats label', () => {
    expect(formatEquipmentRecord02Label(make())).toContain('CODE-2');
  });

  it('detects active records', () => {
    expect(isEquipmentRecord02Active(make())).toBe(true);
    expect(isEquipmentRecord02Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isEquipmentRecord02Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareEquipmentRecord02ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
