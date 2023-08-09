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

INSERT INTO products (product_description, category, price, available_quantity, image_url)
VALUES ('21 Carat necklace weighing 12 grams', 'necklaces', 4800.9, 10, 'www.necklace-images.com');

INSERT INTO products (product_description, category, price, available_quantity, image_url)
VALUES ('18 Carat necklace weighing 7 grams', 'necklaces', 3800.9, 8, 'www.necklace-images.com');

INSERT INTO products (product_description, category, price, available_quantity, image_url)
VALUES ('10 Carat necklace weighing 9 grams', 'necklaces', 1800.9, 9, 'www.necklace-images.com');