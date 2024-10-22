import { describe, expect, it } from 'vitest';
import {
  accessionLabel50,
  clampPriority50,
  formatPercent50,
  formatTAT50,
} from './formatters50';

describe('formatters50', () => {
  it('formats percent', () => {
    expect(formatPercent50(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT50(45)).toBe('45m');
    expect(formatTAT50(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority50(-5)).toBe(0);
    expect(clampPriority50(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel50(2024, 42)).toContain('2024');
  });
});
