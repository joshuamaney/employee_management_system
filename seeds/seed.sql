USE company_DB;

INSERT INTO department (name)
VALUES ("Editor in Chief"), ("Journalist"), ("Reporter"), ("Intern");

INSERT INTO jobs (title, salary, department_id)
VALUES ("Manager", 100000, 1), ("Associate", 50000, 2), ("Internship", 25000, 3);

INSERT INTO employee (first_name, last_name, jobs_id, manager_id)
VALUES ("Perry", "White", 1, null);

INSERT INTO employee (first_name, last_name, jobs_id, manager_id)
VALUES ("Clark", "Kent", 2, 1);

INSERT INTO employee (first_name, last_name, jobs_id, manager_id)
VALUES ("Lois", "Lane", 2, 1);