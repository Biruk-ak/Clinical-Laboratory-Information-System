import { describe, expect, it } from 'vitest';
import {
  accessionLabel30,
  clampPriority30,
  formatPercent30,
  formatTAT30,
} from './formatters30';

describe('formatters30', () => {
  it('formats percent', () => {
    expect(formatPercent30(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT30(45)).toBe('45m');
    expect(formatTAT30(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority30(-5)).toBe(0);
    expect(clampPriority30(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel30(2024, 42)).toContain('2024');
  });
});
