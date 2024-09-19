import { describe, expect, it } from 'vitest';
import {
  compareHospitalRecord17ByPriority,
  formatHospitalRecord17Label,
  isHospitalRecord17Active,
  type HospitalRecord17,
} from '../types/hospitals17';

function make(partial: Partial<HospitalRecord17> = {}): HospitalRecord17 {
  return {
    id: '1',
    externalCode: 'CODE-17',
    displayName: 'Record 17',
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

describe('HospitalRecord17 helpers', () => {
  it('formats label', () => {
    expect(formatHospitalRecord17Label(make())).toContain('CODE-17');
  });

  it('detects active records', () => {
    expect(isHospitalRecord17Active(make())).toBe(true);
    expect(isHospitalRecord17Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isHospitalRecord17Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareHospitalRecord17ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
