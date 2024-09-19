import { describe, expect, it } from 'vitest';
import {
  compareBillingRecord15ByPriority,
  formatBillingRecord15Label,
  isBillingRecord15Active,
  type BillingRecord15,
} from '../types/billing15';

function make(partial: Partial<BillingRecord15> = {}): BillingRecord15 {
  return {
    id: '1',
    externalCode: 'CODE-15',
    displayName: 'Record 15',
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

describe('BillingRecord15 helpers', () => {
  it('formats label', () => {
    expect(formatBillingRecord15Label(make())).toContain('CODE-15');
  });

  it('detects active records', () => {
    expect(isBillingRecord15Active(make())).toBe(true);
    expect(isBillingRecord15Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isBillingRecord15Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareBillingRecord15ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
