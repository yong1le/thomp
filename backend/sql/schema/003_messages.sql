-- +goose Up

CREATE TABLE messages (
  id UUID PRIMARY KEY,
  sender_id UUID REFERENCES users(id) NOT NULL,
  receiver_id UUID REFERENCES users(id) NOT NULL,
  message TEXT NOT NULL,
  create_at TIMESTAMP NOT NULL
);

-- +goose Down

DROP TABLE messages;
