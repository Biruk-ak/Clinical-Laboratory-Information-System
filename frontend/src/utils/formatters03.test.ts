import { describe, expect, it } from 'vitest';
import {
  accessionLabel03,
  clampPriority03,
  formatPercent03,
  formatTAT03,
} from './formatters03';

describe('formatters03', () => {
  it('formats percent', () => {
    expect(formatPercent03(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT03(45)).toBe('45m');
    expect(formatTAT03(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority03(-5)).toBe(0);
    expect(clampPriority03(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel03(2024, 42)).toContain('2024');
  });
});
