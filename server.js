const inquirer = require('inquirer')
const mysql = require('mysql');
require('dotenv').config()
require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: process.env.PORT || 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: '',
    database: 'company_DB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!')
    runApp();
});

