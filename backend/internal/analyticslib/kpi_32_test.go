package analyticslib

import "testing"

func TestComputeKPI32(t *testing.T) {
	t.Parallel()
	res := ComputeKPI32(KPI32Input{
		Ordered: 100, Completed: 90, Rejected: 5, TATMinutes: 55, TargetTAT: 60, QCFailures: 2, QCRuns: 40,
	})
	if res.CompletionRate != 0.9 {
		t.Fatalf("completion=%v", res.CompletionRate)
	}
	if res.Score <= 0 || res.Score > 1.5 {
		t.Fatalf("unexpected score %v", res.Score)
	}
}
