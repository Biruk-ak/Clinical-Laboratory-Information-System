import { describe, expect, it } from 'vitest';
import {
  compareHospitalRecord27ByPriority,
  formatHospitalRecord27Label,
  isHospitalRecord27Active,
  type HospitalRecord27,
} from '../types/hospitals27';

function make(partial: Partial<HospitalRecord27> = {}): HospitalRecord27 {
  return {
    id: '1',
    externalCode: 'CODE-27',
    displayName: 'Record 27',
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

describe('HospitalRecord27 helpers', () => {
  it('formats label', () => {
    expect(formatHospitalRecord27Label(make())).toContain('CODE-27');
  });

  it('detects active records', () => {
    expect(isHospitalRecord27Active(make())).toBe(true);
    expect(isHospitalRecord27Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isHospitalRecord27Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareHospitalRecord27ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
