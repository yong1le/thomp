-- +goose Up

CREATE TABLE relationships (
  id UUID PRIMARY KEY,
  followed_id UUID REFERENCES users(id) NOT NULL,
  follower_id UUID REFERENCES users(id) NOT NULL
);

-- +goose Down

DROP TABLE relationships;
