DROP TABLE IF EXISTS activities;
DROP TABLE If EXISTS messages;
DROP TABLE IF EXISTS relationships;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(255) NOT NULL,
  avatar_url TEXT NOT NULL
);

CREATE TABLE activities (
  id UUID PRIMARY KEY,
  author_id UUID REFERENCES users(id) NOT NULL,
  message TEXT NOT NULL,
  head_activity_id UUID REFERENCES activities(id),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE messages (
  id UUID PRIMARY KEY,
  sender_id UUID REFERENCES users(id) NOT NULL,
  receiver_id UUID REFERENCES users(id) NOT NULL,
  message TEXT NOT NULL,
  create_at TIMESTAMP NOT NULL
);

CREATE TABLE relationships (
  followed_id UUID REFERENCES users(id) NOT NULL,
  follower_id UUID REFERENCES users(id) NOT NULL,
  PRIMARY KEY (followed_id, follower_id)
);
