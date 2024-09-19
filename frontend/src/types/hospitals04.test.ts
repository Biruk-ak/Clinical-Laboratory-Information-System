import { describe, expect, it } from 'vitest';
import {
  compareHospitalRecord04ByPriority,
  formatHospitalRecord04Label,
  isHospitalRecord04Active,
  type HospitalRecord04,
} from '../types/hospitals04';

function make(partial: Partial<HospitalRecord04> = {}): HospitalRecord04 {
  return {
    id: '1',
    externalCode: 'CODE-4',
    displayName: 'Record 4',
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

describe('HospitalRecord04 helpers', () => {
  it('formats label', () => {
    expect(formatHospitalRecord04Label(make())).toContain('CODE-4');
  });

  it('detects active records', () => {
    expect(isHospitalRecord04Active(make())).toBe(true);
    expect(isHospitalRecord04Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isHospitalRecord04Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareHospitalRecord04ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
