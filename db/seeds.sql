INSERT INTO departments (name)
VALUES ("Payroll");

INSERT INTO roles (title, salary, department)
VALUES ("Manager", "12,103", "Payroll");

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Billy", "Bob", 1, 1);