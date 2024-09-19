import { describe, expect, it } from 'vitest';
import {
  compareEquipmentRecord15ByPriority,
  formatEquipmentRecord15Label,
  isEquipmentRecord15Active,
  type EquipmentRecord15,
} from '../types/equipment15';

function make(partial: Partial<EquipmentRecord15> = {}): EquipmentRecord15 {
  return {
    id: '1',
    externalCode: 'CODE-15',
    displayName: 'Record 15',
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

describe('EquipmentRecord15 helpers', () => {
  it('formats label', () => {
    expect(formatEquipmentRecord15Label(make())).toContain('CODE-15');
  });

  it('detects active records', () => {
    expect(isEquipmentRecord15Active(make())).toBe(true);
    expect(isEquipmentRecord15Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isEquipmentRecord15Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareEquipmentRecord15ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
