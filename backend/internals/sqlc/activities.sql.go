// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: activities.sql

package sqlc

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
)

const createActivity = `-- name: CreateActivity :one
INSERT INTO activities (id, author_id, message, head_activity_id, expires_at, created_at)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id, author_id, message, head_activity_id, expires_at, created_at
`

type CreateActivityParams struct {
	ID             uuid.UUID
	AuthorID       sql.NullString
	Message        string
	HeadActivityID uuid.NullUUID
	ExpiresAt      time.Time
	CreatedAt      time.Time
}

func (q *Queries) CreateActivity(ctx context.Context, arg CreateActivityParams) (Activity, error) {
	row := q.db.QueryRowContext(ctx, createActivity,
		arg.ID,
		arg.AuthorID,
		arg.Message,
		arg.HeadActivityID,
		arg.ExpiresAt,
		arg.CreatedAt,
	)
	var i Activity
	err := row.Scan(
		&i.ID,
		&i.AuthorID,
		&i.Message,
		&i.HeadActivityID,
		&i.ExpiresAt,
		&i.CreatedAt,
	)
	return i, err
}

const deleteActivity = `-- name: DeleteActivity :exec
DELETE FROM activities
WHERE id=$1
`

func (q *Queries) DeleteActivity(ctx context.Context, id uuid.UUID) error {
	_, err := q.db.ExecContext(ctx, deleteActivity, id)
	return err
}

const getExpiringActivities = `-- name: GetExpiringActivities :many
SELECT id, author_id, message, head_activity_id, expires_at, created_at FROM activities
ORDER BY expires_at
LIMIT $1
`

func (q *Queries) GetExpiringActivities(ctx context.Context, limit int32) ([]Activity, error) {
	rows, err := q.db.QueryContext(ctx, getExpiringActivities, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Activity
	for rows.Next() {
		var i Activity
		if err := rows.Scan(
			&i.ID,
			&i.AuthorID,
			&i.Message,
			&i.HeadActivityID,
			&i.ExpiresAt,
			&i.CreatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getRecentActivities = `-- name: GetRecentActivities :many
SELECT id, author_id, message, head_activity_id, expires_at, created_at FROM activities
ORDER BY created_at
LIMIT $1
`

func (q *Queries) GetRecentActivities(ctx context.Context, limit int32) ([]Activity, error) {
	rows, err := q.db.QueryContext(ctx, getRecentActivities, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Activity
	for rows.Next() {
		var i Activity
		if err := rows.Scan(
			&i.ID,
			&i.AuthorID,
			&i.Message,
			&i.HeadActivityID,
			&i.ExpiresAt,
			&i.CreatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getSingleActivity = `-- name: GetSingleActivity :one
SELECT id, author_id, message, head_activity_id, expires_at, created_at FROM activities
WHERE id=$1
`

func (q *Queries) GetSingleActivity(ctx context.Context, id uuid.UUID) (Activity, error) {
	row := q.db.QueryRowContext(ctx, getSingleActivity, id)
	var i Activity
	err := row.Scan(
		&i.ID,
		&i.AuthorID,
		&i.Message,
		&i.HeadActivityID,
		&i.ExpiresAt,
		&i.CreatedAt,
	)
	return i, err
}

const getThread = `-- name: GetThread :many
SELECT id, author_id, message, head_activity_id, expires_at, created_at FROM activities
WHERE head_activity_id=$1
ORDER BY created_at
LIMIT $2
`

type GetThreadParams struct {
	HeadActivityID uuid.NullUUID
	Limit          int32
}

func (q *Queries) GetThread(ctx context.Context, arg GetThreadParams) ([]Activity, error) {
	rows, err := q.db.QueryContext(ctx, getThread, arg.HeadActivityID, arg.Limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Activity
	for rows.Next() {
		var i Activity
		if err := rows.Scan(
			&i.ID,
			&i.AuthorID,
			&i.Message,
			&i.HeadActivityID,
			&i.ExpiresAt,
			&i.CreatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}