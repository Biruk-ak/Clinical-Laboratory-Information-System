import { describe, expect, it } from 'vitest';
import {
  accessionLabel23,
  clampPriority23,
  formatPercent23,
  formatTAT23,
} from './formatters23';

describe('formatters23', () => {
  it('formats percent', () => {
    expect(formatPercent23(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT23(45)).toBe('45m');
    expect(formatTAT23(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority23(-5)).toBe(0);
    expect(clampPriority23(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel23(2024, 42)).toContain('2024');
  });
});
