import { describe, expect, it } from 'vitest';
import {
  compareEquipmentRecord10ByPriority,
  formatEquipmentRecord10Label,
  isEquipmentRecord10Active,
  type EquipmentRecord10,
} from '../types/equipment10';

function make(partial: Partial<EquipmentRecord10> = {}): EquipmentRecord10 {
  return {
    id: '1',
    externalCode: 'CODE-10',
    displayName: 'Record 10',
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

describe('EquipmentRecord10 helpers', () => {
  it('formats label', () => {
    expect(formatEquipmentRecord10Label(make())).toContain('CODE-10');
  });

  it('detects active records', () => {
    expect(isEquipmentRecord10Active(make())).toBe(true);
    expect(isEquipmentRecord10Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isEquipmentRecord10Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareEquipmentRecord10ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
