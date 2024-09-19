import { describe, expect, it } from 'vitest';
import {
  compareDoctorRecord20ByPriority,
  formatDoctorRecord20Label,
  isDoctorRecord20Active,
  type DoctorRecord20,
} from '../types/doctors20';

function make(partial: Partial<DoctorRecord20> = {}): DoctorRecord20 {
  return {
    id: '1',
    externalCode: 'CODE-20',
    displayName: 'Record 20',
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

describe('DoctorRecord20 helpers', () => {
  it('formats label', () => {
    expect(formatDoctorRecord20Label(make())).toContain('CODE-20');
  });

  it('detects active records', () => {
    expect(isDoctorRecord20Active(make())).toBe(true);
    expect(isDoctorRecord20Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isDoctorRecord20Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareDoctorRecord20ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
