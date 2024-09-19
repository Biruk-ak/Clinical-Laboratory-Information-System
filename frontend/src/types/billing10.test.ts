import { describe, expect, it } from 'vitest';
import {
  compareBillingRecord10ByPriority,
  formatBillingRecord10Label,
  isBillingRecord10Active,
  type BillingRecord10,
} from '../types/billing10';

function make(partial: Partial<BillingRecord10> = {}): BillingRecord10 {
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

describe('BillingRecord10 helpers', () => {
  it('formats label', () => {
    expect(formatBillingRecord10Label(make())).toContain('CODE-10');
  });

  it('detects active records', () => {
    expect(isBillingRecord10Active(make())).toBe(true);
    expect(isBillingRecord10Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isBillingRecord10Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareBillingRecord10ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
