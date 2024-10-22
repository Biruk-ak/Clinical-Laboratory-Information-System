import { describe, expect, it } from 'vitest';
import {
  accessionLabel37,
  clampPriority37,
  formatPercent37,
  formatTAT37,
} from './formatters37';

describe('formatters37', () => {
  it('formats percent', () => {
    expect(formatPercent37(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT37(45)).toBe('45m');
    expect(formatTAT37(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority37(-5)).toBe(0);
    expect(clampPriority37(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel37(2024, 42)).toContain('2024');
  });
});
