import { describe, expect, it } from 'vitest';
import {
  compareDoctorRecord14ByPriority,
  formatDoctorRecord14Label,
  isDoctorRecord14Active,
  type DoctorRecord14,
} from '../types/doctors14';

function make(partial: Partial<DoctorRecord14> = {}): DoctorRecord14 {
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

describe('DoctorRecord14 helpers', () => {
  it('formats label', () => {
    expect(formatDoctorRecord14Label(make())).toContain('CODE-14');
  });

  it('detects active records', () => {
    expect(isDoctorRecord14Active(make())).toBe(true);
    expect(isDoctorRecord14Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isDoctorRecord14Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareDoctorRecord14ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
