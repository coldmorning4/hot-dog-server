CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE products (
  id int GENERATED ALWAYS as IDENTITY PRIMARY KEY,
  image text NOT NULL,
  name text NOT NULL,
  title varchar(15) NOT NULL,
  description text NOT NULL
);