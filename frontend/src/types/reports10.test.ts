import { describe, expect, it } from 'vitest';
import {
  compareReportRecord10ByPriority,
  formatReportRecord10Label,
  isReportRecord10Active,
  type ReportRecord10,
} from '../types/reports10';

function make(partial: Partial<ReportRecord10> = {}): ReportRecord10 {
  return {
    id: '1',
    externalCode: 'CODE-10',
    displayName: 'Record 10',
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

describe('ReportRecord10 helpers', () => {
  it('formats label', () => {
    expect(formatReportRecord10Label(make())).toContain('CODE-10');
  });

  it('detects active records', () => {
    expect(isReportRecord10Active(make())).toBe(true);
    expect(isReportRecord10Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isReportRecord10Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareReportRecord10ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
