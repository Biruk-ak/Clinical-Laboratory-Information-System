import { describe, expect, it } from 'vitest';
import {
  compareHospitalRecord10ByPriority,
  formatHospitalRecord10Label,
  isHospitalRecord10Active,
  type HospitalRecord10,
} from '../types/hospitals10';

function make(partial: Partial<HospitalRecord10> = {}): HospitalRecord10 {
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

describe('HospitalRecord10 helpers', () => {
  it('formats label', () => {
    expect(formatHospitalRecord10Label(make())).toContain('CODE-10');
  });

  it('detects active records', () => {
    expect(isHospitalRecord10Active(make())).toBe(true);
    expect(isHospitalRecord10Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isHospitalRecord10Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareHospitalRecord10ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
