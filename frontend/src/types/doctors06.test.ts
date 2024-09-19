import { describe, expect, it } from 'vitest';
import {
  compareDoctorRecord06ByPriority,
  formatDoctorRecord06Label,
  isDoctorRecord06Active,
  type DoctorRecord06,
} from '../types/doctors06';

function make(partial: Partial<DoctorRecord06> = {}): DoctorRecord06 {
  return {
    id: '1',
    externalCode: 'CODE-6',
    displayName: 'Record 6',
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

describe('DoctorRecord06 helpers', () => {
  it('formats label', () => {
    expect(formatDoctorRecord06Label(make())).toContain('CODE-6');
  });

  it('detects active records', () => {
    expect(isDoctorRecord06Active(make())).toBe(true);
    expect(isDoctorRecord06Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isDoctorRecord06Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareDoctorRecord06ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
