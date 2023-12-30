package handlers

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/yong1le/thomp/backend/internals/api/lib"
)

func (handler *Handlers) GetUserHandler(w http.ResponseWriter, r *http.Request) {
	idString := chi.URLParamFromCtx(r.Context(), "id")

	id, err := uuid.Parse(idString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	user, err := handler.DB.GetUserDetails(r.Context(), id)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	lib.SendJsonResponse(w, http.StatusOK, user)
}
