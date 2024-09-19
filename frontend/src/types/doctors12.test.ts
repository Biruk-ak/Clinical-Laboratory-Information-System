import { describe, expect, it } from 'vitest';
import {
  compareDoctorRecord12ByPriority,
  formatDoctorRecord12Label,
  isDoctorRecord12Active,
  type DoctorRecord12,
} from '../types/doctors12';

function make(partial: Partial<DoctorRecord12> = {}): DoctorRecord12 {
  return {
    id: '1',
    externalCode: 'CODE-12',
    displayName: 'Record 12',
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

describe('DoctorRecord12 helpers', () => {
  it('formats label', () => {
    expect(formatDoctorRecord12Label(make())).toContain('CODE-12');
  });

  it('detects active records', () => {
    expect(isDoctorRecord12Active(make())).toBe(true);
    expect(isDoctorRecord12Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isDoctorRecord12Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareDoctorRecord12ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
