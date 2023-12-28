-- +goose Up

CREATE TABLE relationships (
  id UUID PRIMARY KEY,
  followed_id VARCHAR(255) REFERENCES users(id) NOT NULL,
  follower_id VARCHAR(255) REFERENCES users(id) NOT NULL
);

-- +goose Down

DROP TABLE relationships;
