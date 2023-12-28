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
WHERE head_activity_id IS NULL
ORDER BY created_at DESC
LIMIT $1;

-- name: GetFollowingActivities :many
SELECT (activities.id, author_id, message, expires_at, created_at)
FROM activities JOIN relationships
ON author_id=followed_id
WHERE follower_id=$1 AND head_activity_id IS NULL
ORDER BY created_At DESC
LIMIT $2;

-- name: GetExpiringActivities :many
SELECT * FROM activities
WHERE head_activity_id IS NULL
ORDER BY expires_at
LIMIT $1;

-- name: GetThread :many
SELECT * FROM activities
WHERE head_activity_id=$1
ORDER BY created_at
LIMIT $2;
