import { describe, expect, it } from 'vitest';
import {
  compareEquipmentRecord26ByPriority,
  formatEquipmentRecord26Label,
  isEquipmentRecord26Active,
  type EquipmentRecord26,
} from '../types/equipment26';

function make(partial: Partial<EquipmentRecord26> = {}): EquipmentRecord26 {
  return {
    id: '1',
    externalCode: 'CODE-26',
    displayName: 'Record 26',
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

describe('EquipmentRecord26 helpers', () => {
  it('formats label', () => {
    expect(formatEquipmentRecord26Label(make())).toContain('CODE-26');
  });

  it('detects active records', () => {
    expect(isEquipmentRecord26Active(make())).toBe(true);
    expect(isEquipmentRecord26Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isEquipmentRecord26Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareEquipmentRecord26ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
