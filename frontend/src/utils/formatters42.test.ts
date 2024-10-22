import { describe, expect, it } from 'vitest';
import {
  accessionLabel42,
  clampPriority42,
  formatPercent42,
  formatTAT42,
} from './formatters42';

describe('formatters42', () => {
  it('formats percent', () => {
    expect(formatPercent42(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT42(45)).toBe('45m');
    expect(formatTAT42(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority42(-5)).toBe(0);
    expect(clampPriority42(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel42(2024, 42)).toContain('2024');
  });
});
