-- name: CreateActivity :one
INSERT INTO activities (id, author_id, message, head_activity_id, expires_at, created_at)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: DeleteActivity :exec
DELETE FROM activities
WHERE id=$1;

-- name: GetSingleActivity :one
SELECT activities.id, avatar_url, display_name, message, head_activity_id, expires_at, created_at
FROM users JOIN activities
ON users.id = activities.author_id
WHERE activities.id=$1;

-- name: GetRecentActivities :many
SELECT activities.id, avatar_url, display_name, message, head_activity_id, expires_at, created_at
FROM users JOIN activities
ON users.id = activities.author_id
WHERE head_activity_id IS NULL
ORDER BY created_at DESC
LIMIT $1;

-- name: GetFollowingActivities :many
SELECT activities.id, avatar_url, display_name, message, head_activity_id, expires_at, created_at
FROM users JOIN activities
ON users.id = activities.author_id
JOIN relationships ON author_id = followed_id
WHERE follower_id=$1 AND head_activity_id IS NULL
ORDER BY created_At DESC
LIMIT $2;

-- name: GetThread :many
SELECT * FROM activities
WHERE head_activity_id=$1
ORDER BY created_at
LIMIT $2;
