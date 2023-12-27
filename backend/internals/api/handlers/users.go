package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/yong1le/thomp/backend/internals/api/models"
	"github.com/yong1le/thomp/backend/internals/sqlc"
)

func (handler *Handlers) CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	// Sent with request body
	type parameters struct {
		Username string `json:"username"`
		Name     string `json:"name"`
	}

	body := parameters{}
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.JsonError{
			Error: fmt.Sprintf("Error parsing JSON body: %s", err),
		})
		return
	}

	// Try inserting into DB
	newUser, err := handler.DB.CreateUser(r.Context(), sqlc.CreateUserParams{
		ID:          body.Username,
		DisplayName: body.Name,
		AvatarUrl:   "Placeholder",
	})
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.JsonError{
			Error: fmt.Sprintf("Error creating user: %s", err),
		})
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newUser)
}

func (handler *Handlers) ChangeAvatarHandler(w http.ResponseWriter, r *http.Request) {}
func (handler *Handlers) ChangeNameHandler(w http.ResponseWriter, r *http.Request)   {}
