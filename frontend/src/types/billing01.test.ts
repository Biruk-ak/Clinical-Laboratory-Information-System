import { describe, expect, it } from 'vitest';
import {
  compareBillingRecord01ByPriority,
  formatBillingRecord01Label,
  isBillingRecord01Active,
  type BillingRecord01,
} from '../types/billing01';

function make(partial: Partial<BillingRecord01> = {}): BillingRecord01 {
  return {
    id: '1',
    externalCode: 'CODE-1',
    displayName: 'Record 1',
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

describe('BillingRecord01 helpers', () => {
  it('formats label', () => {
    expect(formatBillingRecord01Label(make())).toContain('CODE-1');
  });

  it('detects active records', () => {
    expect(isBillingRecord01Active(make())).toBe(true);
    expect(isBillingRecord01Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isBillingRecord01Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareBillingRecord01ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
