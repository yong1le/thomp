-- +goose Up

CREATE TABLE messages (
  id UUID PRIMARY KEY,
  sender_id VARCHAR(255) REFERENCES users(id),
  receiver_id VARCHAR(255) REFERENCES users(id),
  message TEXT,
  create_at TIMESTAMP
);

-- +goose Down

DROP TABLE messages;
