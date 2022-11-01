const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require("mysql2");

// makes a connection to the mysql database
const db = mysql.createConnection(
	{
		host: "localhost",
		user: "root",
		password: "password",
		database: "employees_db",
	},
	console.log("Connected to Employees_db")
);

const promptList = () => {
	return inquirer
		.prompt([
			{
				type: "list",
				name: "userAction",
				message: "What would you like to do?",
				choices: [
					"View all departments",
					"View all roles",
					"View all employees",
					"Add a department",
					"Add a role",
					"Add an employee",
					"Update an employee role",
				],
			},
		])
		.then((answers) => {
			if (answers.userAction === "View all departments") {
				viewDepartments();
			} else if (answers.userAction === "View all roles") {
				viewRoles();
			} else if (answers.userAction === "View all employees") {
				viewEmployees();
			} else if (answers.userAction === "Add a department") {
				addDepartment();
			} else if (answers.userAction === "Add a role") {
				addRole();
			} else if (answers.userAction === "Add an employee") {
				addEmployee();
			} else if (answers.userAction === "Update an employee role") {
				updateEmployeeRole();
			}
		});
};

const viewDepartments = () => {
	db.query("SELECT * FROM department", (err, results) => {
		if (err) {
			console.log(err);
		} else {
			console.log(results);
			promptList();
		}
	});
};

const viewRoles = () => {
	db.query("SELECT * FROM role", (err, results) => {
		if (err) {
			console.log(err);
		} else {
			console.log(results);
			promptList();
		}
	});
};

const viewEmployees = () => {
	db.query("SELECT * FROM employee", (err, results) => {
		if (err) {
			console.log(err);
		} else {
			console.log(results);
			promptList();
		}
	});
};

const addDepartment = () => {
	return inquirer
		.prompt([
			{
				type: "input",
				name: "departmentName",
				message: "What department would you like to add?",
			},
		])
		.then((answers) => {
			db.query(
				`INSERT INTO department(name) VALUE ${answers.departmentName}`,
				(err, results) => {
					if (err) {
						console.log(err);
					} else {
						console.log(results);
						promptList();
					}
				}
			);
		});
};

const addRole = () => {};

const addEmployee = () => {};
