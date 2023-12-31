-- name: CreateActivity :one
INSERT INTO activities (id, author_id, message, head_activity_id, expires_at, created_at)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: DeleteActivity :one
DELETE FROM activities
WHERE id=$1
RETURNING *;

-- name: DeleteReplies :exec
DELETE FROM activities
WHERE head_activity_id=$1 AND head_activity_id IS NOT NULL;

-- name: GetSingleActivity :one
SELECT activities.id, author_id, avatar_url, display_name, head_activity_id, message, expires_at, created_at
FROM users JOIN activities
ON users.id = activities.author_id
WHERE activities.id=$1;

-- name: GetRecentActivities :many
SELECT activities.id, author_id, avatar_url, display_name, message, expires_at, created_at
FROM users JOIN activities
ON users.id = activities.author_id
WHERE head_activity_id IS NULL
ORDER BY created_at DESC;

-- name: GetFollowingActivities :many
SELECT activities.id, author_id, avatar_url, display_name, message, expires_at, created_at
FROM users JOIN activities
ON users.id = activities.author_id
JOIN relationships ON author_id = followed_id
WHERE follower_id=$1 AND head_activity_id IS NULL
ORDER BY created_At DESC;

-- name: GetReplies :many
SELECT activities.id, author_id, avatar_url, display_name, message, expires_at, created_at
FROM users JOIN activities
ON users.id = activities.author_id
WHERE head_activity_id=$1
ORDER BY created_at DESC;

-- name: GetPostsByUser :many
SELECT activities.id, author_id, avatar_url, display_name, message, expires_at, created_at
FROM users JOIN activities
ON users.id=activities.author_id
WHERE author_id=$1 AND head_activity_id IS NULL
ORDER BY created_at DESC;
