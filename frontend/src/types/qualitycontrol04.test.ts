import { describe, expect, it } from 'vitest';
import {
  compareQualityControlRecord04ByPriority,
  formatQualityControlRecord04Label,
  isQualityControlRecord04Active,
  type QualityControlRecord04,
} from '../types/qualitycontrol04';

function make(partial: Partial<QualityControlRecord04> = {}): QualityControlRecord04 {
  return {
    id: '1',
    externalCode: 'CODE-4',
    displayName: 'Record 4',
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

describe('QualityControlRecord04 helpers', () => {
  it('formats label', () => {
    expect(formatQualityControlRecord04Label(make())).toContain('CODE-4');
  });

  it('detects active records', () => {
    expect(isQualityControlRecord04Active(make())).toBe(true);
    expect(isQualityControlRecord04Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isQualityControlRecord04Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareQualityControlRecord04ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
