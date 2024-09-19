import { describe, expect, it } from 'vitest';
import {
  compareHospitalRecord09ByPriority,
  formatHospitalRecord09Label,
  isHospitalRecord09Active,
  type HospitalRecord09,
} from '../types/hospitals09';

function make(partial: Partial<HospitalRecord09> = {}): HospitalRecord09 {
  return {
    id: '1',
    externalCode: 'CODE-9',
    displayName: 'Record 9',
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

describe('HospitalRecord09 helpers', () => {
  it('formats label', () => {
    expect(formatHospitalRecord09Label(make())).toContain('CODE-9');
  });

  it('detects active records', () => {
    expect(isHospitalRecord09Active(make())).toBe(true);
    expect(isHospitalRecord09Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isHospitalRecord09Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareHospitalRecord09ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
