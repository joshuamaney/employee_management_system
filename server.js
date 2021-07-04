const inquirer = require('inquirer')
const mysql = require('mysql');
require('dotenv').config()
require('console.table')

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: process.env.PORT || 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "Anomalous0820",
  database: "company_DB",
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!')
    runApp();
});

const start = () => {
  inquirer.prompt({
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
      "View Roles",
      "View Departments",
      "View Employees",
      "View Employees by Manager",
      "Update Employee Manager",
      "Update Employee Role",
      "Add Role",
      "Add Department",
      "Add Employee",
      "Cancel and Exit",
    ],
  });
};

