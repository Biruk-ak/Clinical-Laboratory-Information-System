import { describe, expect, it } from 'vitest';
import {
  accessionLabel48,
  clampPriority48,
  formatPercent48,
  formatTAT48,
} from './formatters48';

describe('formatters48', () => {
  it('formats percent', () => {
    expect(formatPercent48(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT48(45)).toBe('45m');
    expect(formatTAT48(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority48(-5)).toBe(0);
    expect(clampPriority48(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel48(2024, 42)).toContain('2024');
  });
});
