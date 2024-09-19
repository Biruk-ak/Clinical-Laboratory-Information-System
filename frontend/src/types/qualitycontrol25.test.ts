import { describe, expect, it } from 'vitest';
import {
  compareQualityControlRecord25ByPriority,
  formatQualityControlRecord25Label,
  isQualityControlRecord25Active,
  type QualityControlRecord25,
} from '../types/qualitycontrol25';

function make(partial: Partial<QualityControlRecord25> = {}): QualityControlRecord25 {
  return {
    id: '1',
    externalCode: 'CODE-25',
    displayName: 'Record 25',
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

describe('QualityControlRecord25 helpers', () => {
  it('formats label', () => {
    expect(formatQualityControlRecord25Label(make())).toContain('CODE-25');
  });

  it('detects active records', () => {
    expect(isQualityControlRecord25Active(make())).toBe(true);
    expect(isQualityControlRecord25Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isQualityControlRecord25Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareQualityControlRecord25ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
