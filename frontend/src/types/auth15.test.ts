import { describe, expect, it } from 'vitest';
import {
  compareAuthRecord15ByPriority,
  formatAuthRecord15Label,
  isAuthRecord15Active,
  type AuthRecord15,
} from '../types/auth15';

function make(partial: Partial<AuthRecord15> = {}): AuthRecord15 {
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

describe('AuthRecord15 helpers', () => {
  it('formats label', () => {
    expect(formatAuthRecord15Label(make())).toContain('CODE-15');
  });

  it('detects active records', () => {
    expect(isAuthRecord15Active(make())).toBe(true);
    expect(isAuthRecord15Active(make({ status: 'cancelled' }))).toBe(false);
    expect(isAuthRecord15Active(make({ isActive: false }))).toBe(false);
  });

  it('sorts by priority then name', () => {
    const a = make({ priority: 1, displayName: 'B' });
    const b = make({ id: '2', priority: 5, displayName: 'A' });
    const c = make({ id: '3', priority: 5, displayName: 'C' });
    const sorted = [a, c, b].sort(compareAuthRecord15ByPriority);
    expect(sorted.map((x) => x.id)).toEqual(['2', '3', '1']);
  });
});
