-- +goose Up

CREATE TABLE relationships (
  id UUID PRIMARY KEY,
  followed_id VARCHAR(255) REFERENCES users(id),
  follower_id VARCHAR(255) REFERENCES users(id)
);

-- +goose Down

DROP TABLE relationships;
