import { describe, expect, it } from 'vitest';
import {
  compareQualityControlRecord05ByPriority,
  formatQualityControlRecord05Label,
  isQualityControlRecord05Active,
  type QualityControlRecord05,
} from '../types/qualitycontrol05';

function make(partial: Partial<QualityControlRecord05> = {}): QualityControlRecord05 {
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

describe('QualityControlRecord05 helpers', () => {
  it('formats label', () => {
    expect(formatQualityControlRecord05Label(make())).toContain('CODE-5');
  });

  it('detects active records', () => {
    expect(isQualityControlRecord05Active(make())).toBe(true);
    expect(isQualityControlRecord05Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isQualityControlRecord05Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareQualityControlRecord05ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
