package analyticslib

import "math"

// KPI19Input captures inputs for KPI calculation set 19.
type KPI19Input struct {
	Ordered   float64
	Completed float64
	Rejected  float64
	TATMinutes float64
	TargetTAT  float64
	QCFailures float64
	QCRuns     float64
}

// KPI19Result holds derived operational metrics.
type KPI19Result struct {
	CompletionRate float64
	RejectionRate  float64
	TATCompliance  float64
	QCPassRate     float64
	Score          float64
}

// ComputeKPI19 derives a weighted operational score.
func ComputeKPI19(in KPI19Input) KPI19Result {
	ordered := math.Max(in.Ordered, 1)
	qcRuns := math.Max(in.QCRuns, 1)
	target := math.Max(in.TargetTAT, 1)
	completion := in.Completed / ordered
	rejection := in.Rejected / ordered
	tat := 1.0 - math.Min(1, math.Abs(in.TATMinutes-target)/target)
	qc := 1.0 - (in.QCFailures / qcRuns)
	score := (completion * 0.4) + ((1 - rejection) * 0.2) + (tat * 0.25) + (qc * 0.15)
	return KPI19Result{
		CompletionRate: completion,
		RejectionRate:  rejection,
		TATCompliance:  tat,
		QCPassRate:     qc,
		Score:          score,
	}
}
