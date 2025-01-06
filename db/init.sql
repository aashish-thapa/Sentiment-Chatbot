CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    sentiment VARCHAR(50),
    score FLOAT
);
