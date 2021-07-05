DROP DATABASE IF EXISTS company_DB;
CREATE DATABASE company_DB;
USE company_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)    
);
CREATE TABLE jobs (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2),
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    jobs_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (jobs_id) REFERENCES jobs(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);


SELECT * FROM department;
SELECT * FROM jobs;
SELECT * FROM employee;