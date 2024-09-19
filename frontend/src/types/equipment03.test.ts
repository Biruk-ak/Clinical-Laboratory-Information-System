import { describe, expect, it } from 'vitest';
import {
  compareEquipmentRecord03ByPriority,
  formatEquipmentRecord03Label,
  isEquipmentRecord03Active,
  type EquipmentRecord03,
} from '../types/equipment03';

function make(partial: Partial<EquipmentRecord03> = {}): EquipmentRecord03 {
  return {
    id: '1',
    externalCode: 'CODE-3',
    displayName: 'Record 3',
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

describe('EquipmentRecord03 helpers', () => {
  it('formats label', () => {
    expect(formatEquipmentRecord03Label(make())).toContain('CODE-3');
  });

  it('detects active records', () => {
    expect(isEquipmentRecord03Active(make())).toBe(true);
    expect(isEquipmentRecord03Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isEquipmentRecord03Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareEquipmentRecord03ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
