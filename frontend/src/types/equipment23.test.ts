import { describe, expect, it } from 'vitest';
import {
  compareEquipmentRecord23ByPriority,
  formatEquipmentRecord23Label,
  isEquipmentRecord23Active,
  type EquipmentRecord23,
} from '../types/equipment23';

function make(partial: Partial<EquipmentRecord23> = {}): EquipmentRecord23 {
  return {
    id: '1',
    externalCode: 'CODE-23',
    displayName: 'Record 23',
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

describe('EquipmentRecord23 helpers', () => {
  it('formats label', () => {
    expect(formatEquipmentRecord23Label(make())).toContain('CODE-23');
  });

  it('detects active records', () => {
    expect(isEquipmentRecord23Active(make())).toBe(true);
    expect(isEquipmentRecord23Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isEquipmentRecord23Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareEquipmentRecord23ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
