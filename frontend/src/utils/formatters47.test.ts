import { describe, expect, it } from 'vitest';
import {
  accessionLabel47,
  clampPriority47,
  formatPercent47,
  formatTAT47,
} from './formatters47';

describe('formatters47', () => {
  it('formats percent', () => {
    expect(formatPercent47(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT47(45)).toBe('45m');
    expect(formatTAT47(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority47(-5)).toBe(0);
    expect(clampPriority47(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel47(2024, 42)).toContain('2024');
  });
});
