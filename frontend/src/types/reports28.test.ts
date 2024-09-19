import { describe, expect, it } from 'vitest';
import {
  compareReportRecord28ByPriority,
  formatReportRecord28Label,
  isReportRecord28Active,
  type ReportRecord28,
} from '../types/reports28';

function make(partial: Partial<ReportRecord28> = {}): ReportRecord28 {
  return {
    id: '1',
    externalCode: 'CODE-28',
    displayName: 'Record 28',
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

describe('ReportRecord28 helpers', () => {
  it('formats label', () => {
    expect(formatReportRecord28Label(make())).toContain('CODE-28');
  });

  it('detects active records', () => {
    expect(isReportRecord28Active(make())).toBe(true);
    expect(isReportRecord28Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isReportRecord28Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareReportRecord28ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
