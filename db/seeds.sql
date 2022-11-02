INSERT INTO departments (name)
VALUES ("Payroll"),
    ("Janitorial");

INSERT INTO roles (title, salary, department)
VALUES ("Manager", 120103, 1),
    ("Staff", 15, 2),
    ("Intern", 12, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Billy", "Bob", 1, 1),
        ("Sandy", "Bishop", 3, 1),
        ("Sam", "Joseph", 2, 1);
