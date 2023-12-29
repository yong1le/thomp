package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/yong1le/thomp/backend/internals/api/lib"
	"github.com/yong1le/thomp/backend/internals/sqlc"
)

func (handler *Handlers) OneActivityHandler(w http.ResponseWriter, r *http.Request) {
	activityID := chi.URLParamFromCtx(r.Context(), "id")

	// Convert string to UUID
	activityUUID, err := uuid.Parse(activityID)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	activity, err := handler.DB.GetSingleActivity(r.Context(), activityUUID)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	lib.SendJsonResponse(w, http.StatusOK, activity)
}

func (handler *Handlers) GetRecentsHandler(w http.ResponseWriter, r *http.Request) {
	limitString := chi.URLParamFromCtx(r.Context(), "limit")
	limit, err := strconv.Atoi(limitString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	activities, err := handler.DB.GetRecentActivities(r.Context(), int32(limit))
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	lib.SendJsonResponse(w, http.StatusOK, activities)
}

func (handler *Handlers) GetFollowingRecentsHandler(w http.ResponseWriter, r *http.Request) {
	limitString := chi.URLParamFromCtx(r.Context(), "limit")
	limit, err := strconv.Atoi(limitString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	idString := r.Context().Value("id").(string)
	id, err := uuid.Parse(idString)
	if err != nil {
		lib.SendJsonError(w, http.StatusInternalServerError, err.Error())
		return
	}

	activities, err := handler.DB.GetFollowingActivities(r.Context(), sqlc.GetFollowingActivitiesParams{
		FollowerID: id,
		Limit:      int32(limit),
	})
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	lib.SendJsonResponse(w, http.StatusOK, activities)
}

func (handler *Handlers) CreateActivityHandler(w http.ResponseWriter, r *http.Request) {
	// both should not be empty
	type parameters struct {
		Message   string `json:"message"`
		ExpiresAt int    `json:"expires_at"` // number of hours
	}

	body := parameters{}
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, fmt.Sprintf("Error parsing JSON body: %s", err))
		return
	}
	// Check that the values existed
	if body.Message == "" || body.ExpiresAt == 0 {
		lib.SendJsonError(w, http.StatusBadRequest, "Please send a message and an expiry time.")
		return
	}

	idString := r.Context().Value("id").(string)
	id, err := uuid.Parse(idString)
	if err != nil {
		lib.SendJsonError(w, http.StatusInternalServerError, err.Error())
		return
	}

	activity, err := handler.DB.CreateActivity(r.Context(), sqlc.CreateActivityParams{
		ID:             uuid.New(),
		AuthorID:       id,
		HeadActivityID: uuid.NullUUID{Valid: false},
		Message:        body.Message,
		CreatedAt:      time.Now().UTC(),
		ExpiresAt:      time.Now().UTC().Add(time.Hour * time.Duration(body.ExpiresAt)),
	})
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, fmt.Sprintf("Error Creating Activity: %s", err))
		return
	}

	lib.SendJsonResponse(w, http.StatusCreated, activity)
}

func (handler *Handlers) DeleteActivityHandler(w http.ResponseWriter, r *http.Request) {}

func (handler *Handlers) CreateReplyHandler(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Message              string `json:"message"`
		HeadActivityIDString string `json:"head_activity_id"`
	}

	body := parameters{}
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, fmt.Sprintf("Error parsing JSON body: %s", err))
		return
	}

	// Validate the head activity ID
	if body.Message == "" || body.HeadActivityIDString == "" {
		lib.SendJsonError(w, http.StatusBadRequest, "Please send a message and a head activity")
		return
	}
	headActivityID, err := uuid.Parse(body.HeadActivityIDString)
	if err != nil {
		lib.SendJsonError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Try and retrieve the activity with headActivityID. We want to make sure it
	// exists and is a head activity
	headActivity, err := handler.DB.GetSingleActivity(r.Context(), headActivityID)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}
	if headActivity.HeadActivityID.Valid {
		lib.SendJsonError(w, http.StatusBadRequest, "Cannot reply to this activity")
		return
	}

	idString := r.Context().Value("id").(string)
	id, err := uuid.Parse(idString)
	if err != nil {
		lib.SendJsonError(w, http.StatusInternalServerError, err.Error())
		return
	}

	reply, err := handler.DB.CreateActivity(r.Context(), sqlc.CreateActivityParams{
		ID:             uuid.New(),
		AuthorID:       id,
		HeadActivityID: uuid.NullUUID{UUID: headActivityID, Valid: true},
		Message:        body.Message,
		CreatedAt:      time.Now().UTC(),
		ExpiresAt:      headActivity.ExpiresAt,
	})
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, fmt.Sprintf("Error Creating reply: %s", err))
		return
	}

	lib.SendJsonResponse(w, http.StatusCreated, reply)

}

func (handler *Handlers) GetRepliesHandler(w http.ResponseWriter, r *http.Request) {
	headActivityIDString := chi.URLParamFromCtx(r.Context(), "id")
	limitString := chi.URLParamFromCtx(r.Context(), "limit")

	// Convert string to UUID
	headActivityID, err := uuid.Parse(headActivityIDString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}
	limit, err := strconv.Atoi(limitString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	replies, err := handler.DB.GetReplies(r.Context(), sqlc.GetRepliesParams{
		HeadActivityID: uuid.NullUUID{UUID: headActivityID, Valid: true},
		Limit:          int32(limit),
	})
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	lib.SendJsonResponse(w, http.StatusOK, replies);
}
