package handler

import "net/http"

// Health reports API liveness for load balancers and Compose health checks.
func Health(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"status":  "ok",
		"service": "clinical-lis-api",
	})
}
