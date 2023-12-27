package handlers

import (
	"github.com/yong1le/thomp/backend/internals/sqlc"
)

type Handlers struct {
	DB           *sqlc.Queries
}

func NewHandlers(queries *sqlc.Queries) *Handlers {
	return &Handlers{
		DB:           queries,
	}
}
