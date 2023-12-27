-- name: CreateActivity :one
INSERT INTO activities (id, author_id, message, head_activity_id, expires_at, created_at)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: DeleteActivity :exec
DELETE FROM activities
WHERE id=$1;

-- name: GetSingleActivity :one
SELECT * FROM activities
WHERE id=$1;

-- name: GetRecentActivities :many
SELECT * FROM activities
ORDER BY created_at
LIMIT $1;

-- name: GetExpiringActivities :many
SELECT * FROM activities
ORDER BY expires_at
LIMIT $1;

-- name: GetThread :many
SELECT * FROM activities
WHERE head_activity_id=$1
ORDER BY created_at
LIMIT $2;
