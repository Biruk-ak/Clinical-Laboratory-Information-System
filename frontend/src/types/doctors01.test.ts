import { describe, expect, it } from 'vitest';
import {
  compareDoctorRecord01ByPriority,
  formatDoctorRecord01Label,
  isDoctorRecord01Active,
  type DoctorRecord01,
} from '../types/doctors01';

function make(partial: Partial<DoctorRecord01> = {}): DoctorRecord01 {
  return {
    id: '1',
    externalCode: 'CODE-1',
    displayName: 'Record 1',
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

describe('DoctorRecord01 helpers', () => {
  it('formats label', () => {
    expect(formatDoctorRecord01Label(make())).toContain('CODE-1');
  });

  it('detects active records', () => {
    expect(isDoctorRecord01Active(make())).toBe(true);
    expect(isDoctorRecord01Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isDoctorRecord01Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareDoctorRecord01ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
