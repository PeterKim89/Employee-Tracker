const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql2');

// makes a connection to the mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log("Connected to Employees_db")
);

const promptList = () => {
    return inquirer 
        .prompt ([
            {
                type: "list",
                name: "userAction",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role",
                ],
            }
        ])
}