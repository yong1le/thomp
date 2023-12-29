-- +goose Up

CREATE TABLE activities (
  id UUID PRIMARY KEY,
  author_id UUID REFERENCES users(id) NOT NULL,
  message TEXT NOT NULL,
  head_activity_id UUID REFERENCES activities(id),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL
);

-- +goose Down

DROP TABLE activities;
