CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userName VARCHAR(100) UNIQUE,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password CHAR(60)
);