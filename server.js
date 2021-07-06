const inquirer = require('inquirer')
const mysql = require('mysql');
require('dotenv').config()
const cTable = require("console.table");

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
    "SELECT T1.id AS ID, concat(T1.first_name, ' ', T1.last_name) AS Name, concat(T2.first_name, ' ', T2.last_name) AS 'Reports To', jobs.title AS 'Job Title', jobs.salary AS Salary, department.name AS Department FROM employee T1 LEFT JOIN jobs ON (T1.jobs_id = jobs.id) LEFT JOIN department ON (jobs.department_id = department.id) LEFT JOIN employee T2 ON (T1.manager_id = T2.id)",
    (err, res) => {
      if (err) throw err;
      console.table("\nEMPLOYEES", res);
      runApp();
    }
  );
};

const addJob = () => {
    connection.query(
        "SELECT name, id FROM department", (err, res) => {
            if (err) throw err;
            let departArray = [];
            for (let i = 0; i < res.length; i++) {
                let department = res[i]
                let departObj = {
                    name: department.name,
                    value: department.id
                }
                departArray.push(departObj);
            };

            inquirer
              .prompt([
                {
                  type: "input",
                  message: "What is the job to be added?",
                  name: "title",
                },
                {
                  type: "input",
                  message: "What is the annual salary?",
                  name: "salary",
                },
                {
                  type: "list",
                  message: "What department is this job under?",
                  name: "department",
                  choices: departArray,
                },
              ])
              .then((response) => {
                connection.query(
                  "INSERT INTO jobs SET ?",
                  {
                    title: response.title,
                    salary: response.salary,
                    department_id: response.department,
                  },
                  (err, res) => {
                    if (err) throw err;
                    console.log("\nJob added successfully!\n");
                    runApp();
                  }
                );
              });
        }
    );
};

const addDepartment = () => {
    inquirer
        .prompt(
            {
                type: "input",
                message: "What is new department?",
                name: "deptName"
            }
        )
        .then((response) => {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: response.deptName
                },
                (err) => {
                    if (err) throw err;
                    console.log(`\nDepartment ${response.deptName} successfully added\n`);
                    runApp();
                }
            );
        })
};

const addEmployee = () => {
    connection.query('SELECT * FROM jobs', function (err, res) {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "first_name",
              type: "input",
              message: "What is the employee's fist name? ",
            },
            {
              name: "last_name",
              type: "input",
              message: "What is the employee's last name? ",
            },
            {
              name: "manager_id",
              type: "input",
              message: "What is the manager's ID? ",
            },
            {
              name: "jobs",
              type: "list",
              choices: function () {
                var jobsArray = [];
                for (let i = 0; i < res.length; i++) {
                  jobsArray.push(res[i].title);
                }
                return jobsArray;
              },
              message: "What is this employee's job? ",
            },
          ])
          .then(function (answer) {
            let jobs_id;
            for (let a = 0; a < res.length; a++) {
              if (res[a].title == answer.jobs) {
                jobs_id = res[a].id;
                console.log(jobs_id);
              }
            }
            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answer.first_name,
                last_name: answer.last_name,
                manager_id: answer.manager_id,
                jobs_id: jobs_id,
              },
              function (err) {
                if (err) throw err;
                console.log("New employee added!");
                runApp();
              }
            );
          });
    })
};

