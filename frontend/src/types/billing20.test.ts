import { describe, expect, it } from 'vitest';
import {
  compareBillingRecord20ByPriority,
  formatBillingRecord20Label,
  isBillingRecord20Active,
  type BillingRecord20,
} from '../types/billing20';

function make(partial: Partial<BillingRecord20> = {}): BillingRecord20 {
  return {
    id: '1',
    externalCode: 'CODE-20',
    displayName: 'Record 20',
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

describe('BillingRecord20 helpers', () => {
  it('formats label', () => {
    expect(formatBillingRecord20Label(make())).toContain('CODE-20');
  });

  it('detects active records', () => {
    expect(isBillingRecord20Active(make())).toBe(true);
    expect(isBillingRecord20Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isBillingRecord20Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareBillingRecord20ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
