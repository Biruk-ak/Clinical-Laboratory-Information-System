import { describe, expect, it } from 'vitest';
import {
  compareSampleRecord12ByPriority,
  formatSampleRecord12Label,
  isSampleRecord12Active,
  type SampleRecord12,
} from '../types/samples12';

function make(partial: Partial<SampleRecord12> = {}): SampleRecord12 {
  return {
    id: '1',
    externalCode: 'CODE-12',
    displayName: 'Record 12',
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

describe('SampleRecord12 helpers', () => {
  it('formats label', () => {
    expect(formatSampleRecord12Label(make())).toContain('CODE-12');
  });

  it('detects active records', () => {
    expect(isSampleRecord12Active(make())).toBe(true);
    expect(isSampleRecord12Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isSampleRecord12Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareSampleRecord12ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
