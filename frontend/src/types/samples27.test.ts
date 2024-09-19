import { describe, expect, it } from 'vitest';
import {
  compareSampleRecord27ByPriority,
  formatSampleRecord27Label,
  isSampleRecord27Active,
  type SampleRecord27,
} from '../types/samples27';

function make(partial: Partial<SampleRecord27> = {}): SampleRecord27 {
  return {
    id: '1',
    externalCode: 'CODE-27',
    displayName: 'Record 27',
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

describe('SampleRecord27 helpers', () => {
  it('formats label', () => {
    expect(formatSampleRecord27Label(make())).toContain('CODE-27');
  });

  it('detects active records', () => {
    expect(isSampleRecord27Active(make())).toBe(true);
    expect(isSampleRecord27Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isSampleRecord27Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareSampleRecord27ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
