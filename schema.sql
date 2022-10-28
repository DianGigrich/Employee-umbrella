DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50),
  salary INT NOT NULL,
  department INT,
  FOREIGN KEY (department)
  REFERENCES department(id)
  ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  role_id,
  manager_id,
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE CASCADE
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
-- ID
-- first_name
-- role_id (from role)
-- manager_id (linked to employee id?)