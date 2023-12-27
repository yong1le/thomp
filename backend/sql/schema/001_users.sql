-- +goose Up

CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  display_name VARCHAR(255) NOT NULL,
  avatar_url TEXT NOT NULL
);

-- +goose Down

DROP TABLE users;
