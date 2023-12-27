package database

import (
	"context"
	"database/sql"
	"os"
	"time"

	_ "github.com/lib/pq"
	"github.com/yong1le/thomp/backend/internals/sqlc"
)

func Connect() (*sqlc.Queries, error) {
	dbURL := os.Getenv("DB_URL")

	// Connect to DB
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		return nil, err
	}

	// Validate Connection (max 5 seconds)
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if db.PingContext(ctx) != nil {
		return nil, err
	}

	// The object we use to make queries to our db
	queries := sqlc.New(db)

	return queries, nil
}
