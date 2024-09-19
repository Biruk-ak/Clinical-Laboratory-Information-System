import { describe, expect, it } from 'vitest';
import {
  compareSampleRecord14ByPriority,
  formatSampleRecord14Label,
  isSampleRecord14Active,
  type SampleRecord14,
} from '../types/samples14';

function make(partial: Partial<SampleRecord14> = {}): SampleRecord14 {
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

describe('SampleRecord14 helpers', () => {
  it('formats label', () => {
    expect(formatSampleRecord14Label(make())).toContain('CODE-14');
  });

  it('detects active records', () => {
    expect(isSampleRecord14Active(make())).toBe(true);
    expect(isSampleRecord14Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isSampleRecord14Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareSampleRecord14ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
