package handlers

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/yong1le/thomp/backend/internals/api/lib"
	"github.com/yong1le/thomp/backend/internals/sqlc"
)

func (handler *Handlers) FollowHandler(w http.ResponseWriter, r *http.Request) {
	followedString := chi.URLParamFromCtx(r.Context(), "followed")
	followedID, err := uuid.Parse(followedString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, fmt.Sprintf("FollowedID: %s", err))
		return
	}

	userIDString := r.Context().Value("id").(string)
	userID, err := uuid.Parse(userIDString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, fmt.Sprintf("UserID: %s", err))
		return
	}

	relationship, err := handler.DB.Follow(r.Context(), sqlc.FollowParams{
		FollowedID: followedID,
		FollowerID: userID,
	})
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	lib.SendJsonResponse(w, http.StatusCreated, relationship)
}

func (handler *Handlers) UnfollowHandler(w http.ResponseWriter, r *http.Request) {
	followedString := chi.URLParamFromCtx(r.Context(), "followed")
	followedID, err := uuid.Parse(followedString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, fmt.Sprintf("FollowedID: %s", err))
		return
	}

	userIDString := r.Context().Value("id").(string)
	userID, err := uuid.Parse(userIDString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, fmt.Sprintf("FollowedID: %s", err))
		return
	}

	relationship, err := handler.DB.Unfollow(r.Context(), sqlc.UnfollowParams{
		FollowedID: followedID,
		FollowerID: userID,
	})
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	lib.SendJsonResponse(w, http.StatusAccepted, relationship)
}

func (handler *Handlers) CheckRelationshipHandler(w http.ResponseWriter, r *http.Request) {
	followedString := chi.URLParamFromCtx(r.Context(), "followed")
	followerString := chi.URLParamFromCtx(r.Context(), "follower")

	followedID, err := uuid.Parse(followedString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, fmt.Sprintf("FollowedID: %s", err))
		return
	}
	followerID, err := uuid.Parse(followerString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, fmt.Sprintf("FollowerID: %s", err))
		return
	}

	relationship, err := handler.DB.CheckFollowing(r.Context(), sqlc.CheckFollowingParams{
		FollowedID: followedID,
		FollowerID: followerID,
	})
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	lib.SendJsonResponse(w, http.StatusOK, relationship)
}

func (handler *Handlers) GetAllFollowersHandler(w http.ResponseWriter, r *http.Request) {
	idString := chi.URLParamFromCtx(r.Context(), "id")

	id, err := uuid.Parse(idString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	followers, err := handler.DB.GetAllFollowers(r.Context(), id)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
	}

	lib.SendJsonResponse(w, http.StatusOK, followers)
}

func (handler *Handlers) GetAllFollowingHandler(w http.ResponseWriter, r *http.Request) {
	idString := chi.URLParamFromCtx(r.Context(), "id")

	id, err := uuid.Parse(idString)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}

	following, err := handler.DB.GetAllFollowing(r.Context(), id)
	if err != nil {
		lib.SendJsonError(w, http.StatusBadRequest, err.Error())
	}

	lib.SendJsonResponse(w, http.StatusOK, following)
}
