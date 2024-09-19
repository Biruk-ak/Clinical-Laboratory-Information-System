import { describe, expect, it } from 'vitest';
import {
  compareHospitalRecord16ByPriority,
  formatHospitalRecord16Label,
  isHospitalRecord16Active,
  type HospitalRecord16,
} from '../types/hospitals16';

function make(partial: Partial<HospitalRecord16> = {}): HospitalRecord16 {
  return {
    id: '1',
    externalCode: 'CODE-16',
    displayName: 'Record 16',
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

describe('HospitalRecord16 helpers', () => {
  it('formats label', () => {
    expect(formatHospitalRecord16Label(make())).toContain('CODE-16');
  });

  it('detects active records', () => {
    expect(isHospitalRecord16Active(make())).toBe(true);
    expect(isHospitalRecord16Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isHospitalRecord16Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareHospitalRecord16ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
