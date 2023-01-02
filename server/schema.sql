DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS related;
DROP TABLE IF EXISTS style CASCADE;
DROP TABLE IF EXISTS feature;
DROP TABLE IF EXISTS sku;
DROP TABLE IF EXISTS photo;

CREATE TABLE product (
  product_id INTEGER,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INTEGER,
  createdAt TIMESTAMPTZ,
  PRIMARY KEY(product_id)
);

CREATE TABLE related (
  id INTEGER,
  current_product_id INTEGER,
  related_product_id INTEGER,
  CONSTRAINT current_prod
    FOREIGN KEY(current_product_id) REFERENCES product(product_id),
  CONSTRAINT related_product
    FOREIGN KEY(related_product_id) REFERENCES product(product_id)
);

CREATE TABLE feature (
  id INT,
  feature_product_id INT,
  feature VARCHAR,
  value VARCHAR,
  CONSTRAINT feature
    FOREIGN KEY(product_id)
      REFERENCES product(product_id)
);

CREATE TABLE style (
  style_id INT,
  style_product_id INT,
  name VARCHAR,
  sale_price INT,
  default_price INT,
  default_style BOOLEAN,
  PRIMARY KEY(style_id),
  CONSTRAINT style
    FOREIGN KEY(product_id)
      REFERENCES product(product_id)
);

CREATE TABLE photo (
  id INT,
  photo_style_id INT,
  url VARCHAR,
  thumbnail_url VARCHAR,
  CONSTRAINT photo
    FOREIGN KEY(style_id)
      REFERENCES style(style_id)
);

CREATE TABLE sku (
  id INT,
  sku_style_id INT,
  size VARCHAR,
  quantity VARCHAR,
  CONSTRAINT sku
    FOREIGN KEY(style_id)
      REFERENCES style(style_id)
);


-- run file in psql \i /Users/RyanGehris/hack-reactor-sdc/API-Products/server/schema.sql