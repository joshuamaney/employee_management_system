USE company_DB;

INSERT INTO departments
VALUES ("Deli"), ("Produce"), ("Bakery"), ("Cashier");

INSERT INTO roles
VALUES ("Manager", 100000, 1), ("Associate", 50000, 2), ("Cashier", 25000, 3);

INSERT INTO employees
VALUES ("John", "Doe", 1, null);

INSERT INTO employees
VALUES ("Clark", "Kent", 2, 1),("Lex", "Luther", 3, 1);