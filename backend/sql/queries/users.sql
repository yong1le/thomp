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
