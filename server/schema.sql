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
  default_price VARCHAR,
  -- createdAt TIMESTAMPTZ,
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
    FOREIGN KEY(feature_product_id)
      REFERENCES product(product_id)
);

CREATE TABLE style (
  style_id INT,
  style_product_id INT,
  name VARCHAR,
  sale_price VARCHAR,
  original_price VARCHAR,
  default_style BOOLEAN,
  PRIMARY KEY(style_id),
  CONSTRAINT style
    FOREIGN KEY(style_product_id)
      REFERENCES product(product_id)
);

CREATE TABLE photo (
  id INT,
  photo_style_id INT,
  url VARCHAR,
  thumbnail_url VARCHAR,
  CONSTRAINT photo
    FOREIGN KEY(photo_style_id)
      REFERENCES style(style_id)
);

CREATE TABLE sku (
  id INT,
  sku_style_id INT,
  size VARCHAR,
  quantity INT,
  CONSTRAINT sku
    FOREIGN KEY(sku_style_id)
      REFERENCES style(style_id)
);

COPY product FROM '/Users/RyanGehris/hack-reactor-sdc/API-Products/rawData/transformed_product.csv' WITH (FORMAT CSV, HEADER true);

COPY related FROM '/Users/RyanGehris/hack-reactor-sdc/API-Products/rawData/transformed_related.csv' WITH (FORMAT CSV, HEADER true);

COPY feature FROM '/Users/RyanGehris/hack-reactor-sdc/API-Products/rawData/transformed_features.csv' WITH (FORMAT CSV, HEADER true);

COPY style FROM '/Users/RyanGehris/hack-reactor-sdc/API-Products/rawData/transformed_styles.csv' WITH (FORMAT CSV, HEADER true);

COPY photo FROM '/Users/RyanGehris/hack-reactor-sdc/API-Products/rawData/transformed_photos.csv' WITH (FORMAT CSV, HEADER true);

COPY sku FROM '/Users/RyanGehris/hack-reactor-sdc/API-Products/rawData/transformed_skus.csv' WITH (FORMAT CSV, HEADER true);

-- \l to list databases
-- \c to select database
-- \dt to list tables in DB
-- run file in psql \i /Users/RyanGehris/hack-reactor-sdc/API-Products/server/schema.sql