DROP DATABASE IF EXISTS books_db;
CREATE DATABASE books_db;

USE books_db;

CREATE TABLE book_prices (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  price INT NOT NULL
);

-- DEPARTMENT
-- ID
-- NAME

-- ROLE
-- ID
-- TITLE
-- SALARY
-- DEPARTMENT ID (FROM DEPARTMENT)

-- employee
-- IDfirst_name
-- role_id (from role)
-- manager_id (linked to employee id?)