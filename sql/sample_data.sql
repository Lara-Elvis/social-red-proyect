-- Crear usuarios de ejemplo (las contraseñas deben ser hashed al insertar en producción)
INSERT INTO users(username, email, password_hash)
VALUES
('alice','alice@example.com','<hash>'),
('bob','bob@example.com','<hash>'),
('carol','carol@example.com','<hash>');


-- Relaciones de seguimiento
INSERT INTO follows(follower_id, followed_id) VALUES (1,2), (1,3), (2,3);


-- Mensajes de ejemplo
INSERT INTO messages(user_id, content) VALUES
(2, 'Hola desde Bob!'),
(3, 'Carol compartiendo algo cool'),
(2, 'Otro mensaje de Bob');