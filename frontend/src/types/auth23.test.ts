import { describe, expect, it } from 'vitest';
import {
  compareAuthRecord23ByPriority,
  formatAuthRecord23Label,
  isAuthRecord23Active,
  type AuthRecord23,
} from '../types/auth23';

function make(partial: Partial<AuthRecord23> = {}): AuthRecord23 {
  return {
    id: '1',
    externalCode: 'CODE-23',
    displayName: 'Record 23',
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

describe('AuthRecord23 helpers', () => {
  it('formats label', () => {
    expect(formatAuthRecord23Label(make())).toContain('CODE-23');
  });

  it('detects active records', () => {
    expect(isAuthRecord23Active(make())).toBe(true);
    expect(isAuthRecord23Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isAuthRecord23Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareAuthRecord23ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
