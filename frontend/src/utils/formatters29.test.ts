import { describe, expect, it } from 'vitest';
import {
  accessionLabel29,
  clampPriority29,
  formatPercent29,
  formatTAT29,
} from './formatters29';

describe('formatters29', () => {
  it('formats percent', () => {
    expect(formatPercent29(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT29(45)).toBe('45m');
    expect(formatTAT29(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority29(-5)).toBe(0);
    expect(clampPriority29(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel29(2024, 42)).toContain('2024');
  });
});
