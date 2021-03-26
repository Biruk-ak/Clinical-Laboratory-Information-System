package handler


import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/service"
	"github.com/go-chi/chi/v5"
)

// LabTestRecord06Handler exposes REST endpoints for LabTestRecord06.
type LabTestRecord06Handler struct {
	svc *service.LabTestRecord06Service
}

// NewLabTestRecord06Handler constructs the HTTP handler.
func NewLabTestRecord06Handler(svc *service.LabTestRecord06Service) *LabTestRecord06Handler {
	return &LabTestRecord06Handler{svc: svc}
}

// Routes mounts tests 06 routes under the given router.
func (h *LabTestRecord06Handler) Routes(r chi.Router) {
	r.Route("/tests/v06", func(r chi.Router) {
		r.Get("/", h.List)
		r.Post("/", h.Create)
		r.Get("/{id}", h.Get)
		r.Put("/{id}", h.Update)
		r.Delete("/{id}", h.Archive)
		r.Get("/search", h.Search)
		r.Get("/stats", h.Stats)
	})
}

type createLabTestRecord06Request struct {
	ExternalCode string `json:"external_code"`
	DisplayName  string `json:"display_name"`
	Status       string `json:"status"`
	Priority     int    `json:"priority"`
	FacilityID   string `json:"facility_id"`
	Notes        string `json:"notes"`
}

// Create handles POST /tests/v06.
func (h *LabTestRecord06Handler) Create(w http.ResponseWriter, r *http.Request) {
	var req createLabTestRecord06Request
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json")
		return
	}
	actor := actorFrom(r)
	rec, err := h.svc.Create(r.Context(), actor, req.FacilityID, req.ExternalCode, req.DisplayName, req.Status, req.Priority, req.Notes)
	if err != nil {
		writeError(w, http.StatusUnprocessableEntity, err.Error())
		return
	}
	writeJSON(w, http.StatusCreated, rec)
}

// Get handles GET /tests/v06/{id}.
func (h *LabTestRecord06Handler) Get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	rec, err := h.svc.Get(r.Context(), id)
	if err == models.ErrNotFound {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, rec)
}

// List handles GET /tests/v06.
func (h *LabTestRecord06Handler) List(w http.ResponseWriter, r *http.Request) {
	facilityID := r.URL.Query().Get("facility_id")
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))
	items, err := h.svc.List(r.Context(), facilityID, limit, offset)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"items": items})
}

// Update handles PUT /tests/v06/{id}.
func (h *LabTestRecord06Handler) Update(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	existing, err := h.svc.Get(r.Context(), id)
	if err == models.ErrNotFound {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	var req createLabTestRecord06Request
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json")
		return
	}
	existing.ExternalCode = req.ExternalCode
	existing.DisplayName = req.DisplayName
	existing.Status = req.Status
	existing.Priority = req.Priority
	existing.Notes = req.Notes
	if err := h.svc.Update(r.Context(), actorFrom(r), existing); err != nil {
		writeError(w, http.StatusConflict, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, existing)
}

// Archive handles DELETE /tests/v06/{id}.
func (h *LabTestRecord06Handler) Archive(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := h.svc.Archive(r.Context(), id, actorFrom(r)); err == models.ErrNotFound {
		writeError(w, http.StatusNotFound, "not found")
		return
	} else if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// Search handles GET /tests/v06/search.
func (h *LabTestRecord06Handler) Search(w http.ResponseWriter, r *http.Request) {
	facilityID := r.URL.Query().Get("facility_id")
	prefix := r.URL.Query().Get("q")
	items, err := h.svc.Search(r.Context(), facilityID, prefix)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"items": items})
}

// Stats handles GET /tests/v06/stats.
func (h *LabTestRecord06Handler) Stats(w http.ResponseWriter, r *http.Request) {
	facilityID := r.URL.Query().Get("facility_id")
	n, err := h.svc.Stats(r.Context(), facilityID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"active_count": n})
}
