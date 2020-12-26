package handler


import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/biruk-ak/clinical-lis/backend/internal/models"
	"github.com/biruk-ak/clinical-lis/backend/internal/service"
	"github.com/go-chi/chi/v5"
)

// SampleRecord08Handler exposes REST endpoints for SampleRecord08.
type SampleRecord08Handler struct {
	svc *service.SampleRecord08Service
}

// NewSampleRecord08Handler constructs the HTTP handler.
func NewSampleRecord08Handler(svc *service.SampleRecord08Service) *SampleRecord08Handler {
	return &SampleRecord08Handler{svc: svc}
}

// Routes mounts samples 08 routes under the given router.
func (h *SampleRecord08Handler) Routes(r chi.Router) {
	r.Route("/samples/v08", func(r chi.Router) {
		r.Get("/", h.List)
		r.Post("/", h.Create)
		r.Get("/{id}", h.Get)
		r.Put("/{id}", h.Update)
		r.Delete("/{id}", h.Archive)
		r.Get("/search", h.Search)
		r.Get("/stats", h.Stats)
	})
}

type createSampleRecord08Request struct {
	ExternalCode string `json:"external_code"`
	DisplayName  string `json:"display_name"`
	Status       string `json:"status"`
	Priority     int    `json:"priority"`
	FacilityID   string `json:"facility_id"`
	Notes        string `json:"notes"`
}

// Create handles POST /samples/v08.
func (h *SampleRecord08Handler) Create(w http.ResponseWriter, r *http.Request) {
	var req createSampleRecord08Request
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

// Get handles GET /samples/v08/{id}.
func (h *SampleRecord08Handler) Get(w http.ResponseWriter, r *http.Request) {
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

// List handles GET /samples/v08.
func (h *SampleRecord08Handler) List(w http.ResponseWriter, r *http.Request) {
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

// Update handles PUT /samples/v08/{id}.
func (h *SampleRecord08Handler) Update(w http.ResponseWriter, r *http.Request) {
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
	var req createSampleRecord08Request
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

// Archive handles DELETE /samples/v08/{id}.
func (h *SampleRecord08Handler) Archive(w http.ResponseWriter, r *http.Request) {
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

// Search handles GET /samples/v08/search.
func (h *SampleRecord08Handler) Search(w http.ResponseWriter, r *http.Request) {
	facilityID := r.URL.Query().Get("facility_id")
	prefix := r.URL.Query().Get("q")
	items, err := h.svc.Search(r.Context(), facilityID, prefix)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"items": items})
}

// Stats handles GET /samples/v08/stats.
func (h *SampleRecord08Handler) Stats(w http.ResponseWriter, r *http.Request) {
	facilityID := r.URL.Query().Get("facility_id")
	n, err := h.svc.Stats(r.Context(), facilityID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"active_count": n})
}
