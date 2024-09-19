import { describe, expect, it } from 'vitest';
import {
  compareDoctorRecord17ByPriority,
  formatDoctorRecord17Label,
  isDoctorRecord17Active,
  type DoctorRecord17,
} from '../types/doctors17';

function make(partial: Partial<DoctorRecord17> = {}): DoctorRecord17 {
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

describe('DoctorRecord17 helpers', () => {
  it('formats label', () => {
    expect(formatDoctorRecord17Label(make())).toContain('CODE-17');
  });

  it('detects active records', () => {
    expect(isDoctorRecord17Active(make())).toBe(true);
    expect(isDoctorRecord17Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isDoctorRecord17Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareDoctorRecord17ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
