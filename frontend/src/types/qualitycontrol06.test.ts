import { describe, expect, it } from 'vitest';
import {
  compareQualityControlRecord06ByPriority,
  formatQualityControlRecord06Label,
  isQualityControlRecord06Active,
  type QualityControlRecord06,
} from '../types/qualitycontrol06';

function make(partial: Partial<QualityControlRecord06> = {}): QualityControlRecord06 {
  return {
    id: '1',
    externalCode: 'CODE-6',
    displayName: 'Record 6',
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

describe('QualityControlRecord06 helpers', () => {
  it('formats label', () => {
    expect(formatQualityControlRecord06Label(make())).toContain('CODE-6');
  });

  it('detects active records', () => {
    expect(isQualityControlRecord06Active(make())).toBe(true);
    expect(isQualityControlRecord06Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isQualityControlRecord06Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareQualityControlRecord06ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
