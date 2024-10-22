import { describe, expect, it } from 'vitest';
import {
  accessionLabel31,
  clampPriority31,
  formatPercent31,
  formatTAT31,
} from './formatters31';

describe('formatters31', () => {
  it('formats percent', () => {
    expect(formatPercent31(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT31(45)).toBe('45m');
    expect(formatTAT31(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority31(-5)).toBe(0);
    expect(clampPriority31(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel31(2024, 42)).toContain('2024');
  });
});
