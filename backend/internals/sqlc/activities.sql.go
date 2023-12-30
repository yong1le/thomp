// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: activities.sql

package sqlc

import (
	"context"
	"time"

	"github.com/google/uuid"
)

const createActivity = `-- name: CreateActivity :one
INSERT INTO activities (id, author_id, message, head_activity_id, expires_at, created_at)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id, author_id, message, head_activity_id, expires_at, created_at
`

type CreateActivityParams struct {
	ID             uuid.UUID     `json:"id"`
	AuthorID       uuid.UUID     `json:"author_id"`
	Message        string        `json:"message"`
	HeadActivityID uuid.NullUUID `json:"head_activity_id"`
	ExpiresAt      time.Time     `json:"expires_at"`
	CreatedAt      time.Time     `json:"created_at"`
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

const deleteActivity = `-- name: DeleteActivity :one
DELETE FROM activities
WHERE id=$1
RETURNING id, author_id, message, head_activity_id, expires_at, created_at
`

func (q *Queries) DeleteActivity(ctx context.Context, id uuid.UUID) (Activity, error) {
	row := q.db.QueryRowContext(ctx, deleteActivity, id)
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

const getFollowingActivities = `-- name: GetFollowingActivities :many
SELECT activities.id, author_id, avatar_url, display_name, message, expires_at, created_at
FROM users JOIN activities
ON users.id = activities.author_id
JOIN relationships ON author_id = followed_id
WHERE follower_id=$1 AND head_activity_id IS NULL
ORDER BY created_At DESC
`

type GetFollowingActivitiesRow struct {
	ID          uuid.UUID `json:"id"`
	AuthorID    uuid.UUID `json:"author_id"`
	AvatarUrl   string    `json:"avatar_url"`
	DisplayName string    `json:"display_name"`
	Message     string    `json:"message"`
	ExpiresAt   time.Time `json:"expires_at"`
	CreatedAt   time.Time `json:"created_at"`
}

func (q *Queries) GetFollowingActivities(ctx context.Context, followerID uuid.UUID) ([]GetFollowingActivitiesRow, error) {
	rows, err := q.db.QueryContext(ctx, getFollowingActivities, followerID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetFollowingActivitiesRow
	for rows.Next() {
		var i GetFollowingActivitiesRow
		if err := rows.Scan(
			&i.ID,
			&i.AuthorID,
			&i.AvatarUrl,
			&i.DisplayName,
			&i.Message,
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

const getPostsByUser = `-- name: GetPostsByUser :many
SELECT activities.id, author_id, avatar_url, display_name, message, expires_at, created_at
FROM users JOIN activities
ON users.id=activities.author_id
WHERE author_id=$1 AND head_activity_id IS NULL
ORDER BY created_at DESC
`

type GetPostsByUserRow struct {
	ID          uuid.UUID `json:"id"`
	AuthorID    uuid.UUID `json:"author_id"`
	AvatarUrl   string    `json:"avatar_url"`
	DisplayName string    `json:"display_name"`
	Message     string    `json:"message"`
	ExpiresAt   time.Time `json:"expires_at"`
	CreatedAt   time.Time `json:"created_at"`
}

func (q *Queries) GetPostsByUser(ctx context.Context, authorID uuid.UUID) ([]GetPostsByUserRow, error) {
	rows, err := q.db.QueryContext(ctx, getPostsByUser, authorID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetPostsByUserRow
	for rows.Next() {
		var i GetPostsByUserRow
		if err := rows.Scan(
			&i.ID,
			&i.AuthorID,
			&i.AvatarUrl,
			&i.DisplayName,
			&i.Message,
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
SELECT activities.id, author_id, avatar_url, display_name, message, expires_at, created_at
FROM users JOIN activities
ON users.id = activities.author_id
WHERE head_activity_id IS NULL
ORDER BY created_at DESC
`

type GetRecentActivitiesRow struct {
	ID          uuid.UUID `json:"id"`
	AuthorID    uuid.UUID `json:"author_id"`
	AvatarUrl   string    `json:"avatar_url"`
	DisplayName string    `json:"display_name"`
	Message     string    `json:"message"`
	ExpiresAt   time.Time `json:"expires_at"`
	CreatedAt   time.Time `json:"created_at"`
}

func (q *Queries) GetRecentActivities(ctx context.Context) ([]GetRecentActivitiesRow, error) {
	rows, err := q.db.QueryContext(ctx, getRecentActivities)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetRecentActivitiesRow
	for rows.Next() {
		var i GetRecentActivitiesRow
		if err := rows.Scan(
			&i.ID,
			&i.AuthorID,
			&i.AvatarUrl,
			&i.DisplayName,
			&i.Message,
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

const getReplies = `-- name: GetReplies :many
SELECT activities.id, author_id, avatar_url, display_name, message, expires_at, created_at
FROM users JOIN activities
ON users.id = activities.author_id
WHERE head_activity_id=$1
ORDER BY created_at DESC
`

type GetRepliesRow struct {
	ID          uuid.UUID `json:"id"`
	AuthorID    uuid.UUID `json:"author_id"`
	AvatarUrl   string    `json:"avatar_url"`
	DisplayName string    `json:"display_name"`
	Message     string    `json:"message"`
	ExpiresAt   time.Time `json:"expires_at"`
	CreatedAt   time.Time `json:"created_at"`
}

func (q *Queries) GetReplies(ctx context.Context, headActivityID uuid.NullUUID) ([]GetRepliesRow, error) {
	rows, err := q.db.QueryContext(ctx, getReplies, headActivityID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetRepliesRow
	for rows.Next() {
		var i GetRepliesRow
		if err := rows.Scan(
			&i.ID,
			&i.AuthorID,
			&i.AvatarUrl,
			&i.DisplayName,
			&i.Message,
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
SELECT activities.id, author_id, avatar_url, display_name, head_activity_id, message, expires_at, created_at
FROM users JOIN activities
ON users.id = activities.author_id
WHERE activities.id=$1
`

type GetSingleActivityRow struct {
	ID             uuid.UUID     `json:"id"`
	AuthorID       uuid.UUID     `json:"author_id"`
	AvatarUrl      string        `json:"avatar_url"`
	DisplayName    string        `json:"display_name"`
	HeadActivityID uuid.NullUUID `json:"head_activity_id"`
	Message        string        `json:"message"`
	ExpiresAt      time.Time     `json:"expires_at"`
	CreatedAt      time.Time     `json:"created_at"`
}

func (q *Queries) GetSingleActivity(ctx context.Context, id uuid.UUID) (GetSingleActivityRow, error) {
	row := q.db.QueryRowContext(ctx, getSingleActivity, id)
	var i GetSingleActivityRow
	err := row.Scan(
		&i.ID,
		&i.AuthorID,
		&i.AvatarUrl,
		&i.DisplayName,
		&i.HeadActivityID,
		&i.Message,
		&i.ExpiresAt,
		&i.CreatedAt,
	)
	return i, err
}
