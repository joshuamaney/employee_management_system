const inquirer = require('inquirer')
const mysql = require('mysql');
require('dotenv').config()
const consoleTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "company_DB",
    password: process.env.PASSWORD
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!')
    runApp();
});

const runApp = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        "View Jobs",
        "View Departments",
        "View Employees",
        "Update Employee Job",
        "Add Job",
        "Add Department",
        "Add Employee",
        "Cancel and Exit",
      ],
    })
    .then((res) => {
      switch (res.choice) {
        case "View Jobs":
          viewJobs();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Update Employee job":
          updateEmployeeJob();
          break;
        case "Add Job":
          addJob();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Employee":
          addEmployee();
          break;
        default:
          connection.end();
          break;
      }
    });
};

const viewJobs = () => {
  connection.query(
    "SELECT jobs.id AS ID, jobs.title AS Title, jobs.salary as Salary, department.name AS Department FROM jobs LEFT JOIN department ON (jobs.department_id = department.id)",
    (err, res) => {
      if (err) throw err;
      console.table("\nJOBS", res);
      runApp();
    }
  );
};

const viewDepartments = () => {
  connection.query(
    "SELECT id AS ID, name AS Department FROM department",
    (err, res) => {
      if (err) throw err;
      console.table("\nDEPARTMENTS", res);
      runApp();
    }
  );
};

const viewEmployees = () => {
  connection.query(
    "SELECT T1.id AS ID, CONCAT(T1.first_name, ' ', T1.last_name) AS Name, CONCAT(T2.first_name, ' ', T2.last_name) AS 'Reports To', jobs.title AS 'Job Title', jobs.salary AS Salary, department.name AS Department FROM employee T1 LEFT JOIN jobs ON (T1.jobs_id = jobs.id) LEFT JOIN department ON (jobs.department_id = department.id) LEFT JOIN employee T2 ON (T1.manager_id = T2.id)",
    (err, res) => {
      if (err) throw err;
      console.table("\nEMPLOYEES", res);
      runApp();
    }
  );
};

const updateEmployeeJob = () => {
  connection.query(
    "SELECT first_name, last_name, id FROM employee",
    (err, res) => {
      if (err) throw err;

      let employeesArray = [];
      for (let i = 0; i < res.length; i++) {
        let empName = `${res[i].first_name} ${res[i].last_name}`;
        let empId = res[i].id;
        let empNameObject = {
          name: empName,
          value: empId,
        };
        employeesArray.push(empNameObject);
      }

      connection.query("SELECT title, id FROM job", (err, res) => {
        if (err) throw err;

        let jobsArray = [];
        for (let i = 0; i < res.length; i++) {
          let jobTitle = res[i].title;
          let jobId = res[i].id;
          let jobNameObject = {
            name: jobTitle,
            value: jobId,
          };
          jobsArray.push(jobNameObject);
        }

        inquirer
          .prompt([
            {
              type: "list",
              message: "Which employee would you like to update?",
              name: "name",
              choices: employeesArray,
            },
            {
              type: "list",
              message: "What is the employee's new job title?",
              name: "jobTitle",
              choices: jobsArray,
            },
          ])
          .then((response) => {
            connection.query(
              "UPDATE employee SET ? WHERE ?",
              [
                {
                  job_id: response.jobTitle,
                },
                {
                  id: response.name,
                },
              ],
              (err, res) => {
                if (err) throw err;
                console.log("Job update successful!");
                start();
              }
            );
          });
      });
    }
  );
};
