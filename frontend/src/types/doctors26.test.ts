import { describe, expect, it } from 'vitest';
import {
  compareDoctorRecord26ByPriority,
  formatDoctorRecord26Label,
  isDoctorRecord26Active,
  type DoctorRecord26,
} from '../types/doctors26';

function make(partial: Partial<DoctorRecord26> = {}): DoctorRecord26 {
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

describe('DoctorRecord26 helpers', () => {
  it('formats label', () => {
    expect(formatDoctorRecord26Label(make())).toContain('CODE-26');
  });

  it('detects active records', () => {
    expect(isDoctorRecord26Active(make())).toBe(true);
    expect(isDoctorRecord26Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isDoctorRecord26Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareDoctorRecord26ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
