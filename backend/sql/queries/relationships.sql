-- name: Follow :one
INSERT INTO relationships (followed_id, follower_id)
VALUES ($1, $2)
RETURNING *;

-- name: Unfollow :one
DELETE FROM relationships
WHERE followed_id=$1 AND follower_id=$2
RETURNING *;

-- name: CheckFollowing :one
SELECT * FROM relationships
WHERE follower_id=$1 AND followed_id=$2;

-- name: GetAllFollowers :many
SELECT users.id, username, display_name, avatar_url
FROM users JOIN relationships
ON users.id=relationships.follower_id
WHERE relationships.followed_id =$1;

-- name: GetAllFollowing :many
SELECT users.id, username, display_name, avatar_url
FROM users JOIN relationships
ON users.id=relationships.followed_id
WHERE relationships.follower_id= $1;

