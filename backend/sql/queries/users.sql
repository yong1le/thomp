-- name: CreateUser :one
INSERT INTO users (id, display_name, avatar_url)
VALUES ($1, $2, $3)
RETURNING *;

-- name: UpdateAvatar :one
UPDATE users
SET avatar_url = $2
WHERE id = $1
RETURNING *;

-- name: UpdateDisplayName :one
UPDATE users
SET display_name=$2
WHERE id=$1
RETURNING *;
