import { describe, expect, it } from 'vitest';
import {
  compareDoctorRecord05ByPriority,
  formatDoctorRecord05Label,
  isDoctorRecord05Active,
  type DoctorRecord05,
} from '../types/doctors05';

function make(partial: Partial<DoctorRecord05> = {}): DoctorRecord05 {
  return {
    id: '1',
    externalCode: 'CODE-5',
    displayName: 'Record 5',
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

describe('DoctorRecord05 helpers', () => {
  it('formats label', () => {
    expect(formatDoctorRecord05Label(make())).toContain('CODE-5');
  });

  it('detects active records', () => {
    expect(isDoctorRecord05Active(make())).toBe(true);
    expect(isDoctorRecord05Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isDoctorRecord05Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareDoctorRecord05ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
