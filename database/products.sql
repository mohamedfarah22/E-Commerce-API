-- grant priveliges to admin
GRANT ALL PRIVILEGES ON DATABASE ecommercedatabase TO admin;
-- CREATE TABLE 
DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_description VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    price FLOAT NOT NULL,
    available_quantity INTEGER,
    image_url VARCHAR
);