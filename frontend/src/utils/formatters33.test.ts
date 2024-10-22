import { describe, expect, it } from 'vitest';
import {
  accessionLabel33,
  clampPriority33,
  formatPercent33,
  formatTAT33,
} from './formatters33';

describe('formatters33', () => {
  it('formats percent', () => {
    expect(formatPercent33(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT33(45)).toBe('45m');
    expect(formatTAT33(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority33(-5)).toBe(0);
    expect(clampPriority33(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel33(2024, 42)).toContain('2024');
  });
});
