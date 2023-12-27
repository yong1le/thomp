-- +goose Up

CREATE TABLE activities (
  id UUID PRIMARY KEY,
  author_id VARCHAR(255) REFERENCES users(id),
  message TEXT NOT NULL,
  head_activity_id UUID REFERENCES activities(id),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL
);

-- +goose Down

DROP TABLE activities;
