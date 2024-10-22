import { describe, expect, it } from 'vitest';
import {
  accessionLabel55,
  clampPriority55,
  formatPercent55,
  formatTAT55,
} from './formatters55';

describe('formatters55', () => {
  it('formats percent', () => {
    expect(formatPercent55(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT55(45)).toBe('45m');
    expect(formatTAT55(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority55(-5)).toBe(0);
    expect(clampPriority55(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel55(2024, 42)).toContain('2024');
  });
});
