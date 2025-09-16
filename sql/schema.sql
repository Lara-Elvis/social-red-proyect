-- Crear extensiones útiles
CREATE EXTENSION IF NOT EXISTS pg_trgm;


-- Usuarios
CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
password_hash TEXT NOT NULL,
bio TEXT,
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- Mensajes (posts)
CREATE TABLE IF NOT EXISTS messages (
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
content TEXT NOT NULL CHECK (char_length(content) > 0 AND char_length(content) <= 1000),
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- Seguimientos (follows): follower -> followed
CREATE TABLE IF NOT EXISTS follows (
follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
followed_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
PRIMARY KEY (follower_id, followed_id),
CHECK (follower_id <> followed_id)
);


-- Índices para optimizar búsquedas y timeline
CREATE INDEX IF NOT EXISTS idx_messages_user_created ON messages(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_content_trgm ON messages USING gin (content gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_follows_followed ON follows(followed_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);


-- View para el timeline (opcional)
CREATE OR REPLACE VIEW user_following_messages AS
SELECT m.*
FROM messages m
JOIN follows f ON m.user_id = f.followed_id;