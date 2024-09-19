import { describe, expect, it } from 'vitest';
import {
  compareLabTestRecord14ByPriority,
  formatLabTestRecord14Label,
  isLabTestRecord14Active,
  type LabTestRecord14,
} from '../types/tests14';

function make(partial: Partial<LabTestRecord14> = {}): LabTestRecord14 {
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

describe('LabTestRecord14 helpers', () => {
  it('formats label', () => {
    expect(formatLabTestRecord14Label(make())).toContain('CODE-14');
  });

  it('detects active records', () => {
    expect(isLabTestRecord14Active(make())).toBe(true);
    expect(isLabTestRecord14Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isLabTestRecord14Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareLabTestRecord14ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
