CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price FLOAT,
    frequency INTEGER DEFAULT 0
);