import { describe, expect, it } from 'vitest';
import {
  compareBillingRecord06ByPriority,
  formatBillingRecord06Label,
  isBillingRecord06Active,
  type BillingRecord06,
} from '../types/billing06';

function make(partial: Partial<BillingRecord06> = {}): BillingRecord06 {
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

describe('BillingRecord06 helpers', () => {
  it('formats label', () => {
    expect(formatBillingRecord06Label(make())).toContain('CODE-6');
  });

  it('detects active records', () => {
    expect(isBillingRecord06Active(make())).toBe(true);
    expect(isBillingRecord06Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isBillingRecord06Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareBillingRecord06ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
