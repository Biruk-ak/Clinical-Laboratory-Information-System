import { describe, expect, it } from 'vitest';
import {
  compareHospitalRecord14ByPriority,
  formatHospitalRecord14Label,
  isHospitalRecord14Active,
  type HospitalRecord14,
} from '../types/hospitals14';

function make(partial: Partial<HospitalRecord14> = {}): HospitalRecord14 {
  return {
    id: '1',
    externalCode: 'CODE-14',
    displayName: 'Record 14',
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

describe('HospitalRecord14 helpers', () => {
  it('formats label', () => {
    expect(formatHospitalRecord14Label(make())).toContain('CODE-14');
  });

  it('detects active records', () => {
    expect(isHospitalRecord14Active(make())).toBe(true);
    expect(isHospitalRecord14Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isHospitalRecord14Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareHospitalRecord14ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
