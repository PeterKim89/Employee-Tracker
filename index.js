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

db.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
	promptList();
});

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
				console.log(1);
			} else if (answers.userAction === "View all roles") {
				viewRoles();
				console.log(2);
			} else if (answers.userAction === "View all employees") {
				viewEmployees();
				console.log(3);
			} else if (answers.userAction === "Add a department") {
				addDepartment();
				console.log(4);
			} else if (answers.userAction === "Add a role") {
				addRole();
				console.log(5);
			} else if (answers.userAction === "Add an employee") {
				addEmployee();
				console.log(6);
			} else if (answers.userAction === "Update an employee role") {
				updateEmployeeRole();
				console.log(7);
			}
		});
};

const viewDepartments = () => {
	db.query("SELECT * FROM department", (err, results) => {
		if (err) {
			console.log(err);
		} else {
			console.table(results);
			promptList();
		}
	});
};

const viewRoles = () => {
	db.query("SELECT * FROM role", (err, results) => {
		if (err) {
			console.log(err);
		} else {
			console.table(results);
			promptList();
		}
	});
};

const viewEmployees = () => {
	db.query("SELECT * FROM employee", (err, results) => {
		if (err) {
			console.log(err);
		} else {
			console.table(results);
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
				`INSERT INTO department (name) VALUES ('${answers.departmentName}')`,
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

const addRole = () => {
	return inquirer
		.prompt([
			{
				type: "input",
				name: "roleName",
				message: "What role would you like to add?",
			},
			{
				type: "input",
				name: "roleSalary",
				message: "What is the role's salary?",
			},
			{
				type: "input",
				name: "departmentId",
				message: "What is the role's department id number?",
			},
		])
		.then((answers) => {
			db.query(
				`INSERT INTO role (title, salary, department_id) VALUES ('${answers.roleName}', ${answers.roleSalary}, ${answers.departmentId})`,
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

const addEmployee = () => {
	return inquirer
		.prompt([
			{
				type: "input",
				name: "employeeFirstName",
				message: "What is the employee's first name?",
			},
			{
				type: "input",
				name: "employeeLastName",
				message: "What is the employee's last name?",
			},
			{
				type: "input",
				name: "employeeRoleId",
				message: "What is the employee's role id number?",
			},
			{
				type: "input",
				name: "employeeManagerId",
				message: "What is the employee's manager's id? (if applicable)",
                default: "null",
			},
		])
		.then((answers) => {
			db.query(
				`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${answers.employeeFirstName}', '${answers.employeeLastName}', ${answers.employeeRoleId}, ${answers.employeeManagerId})`,
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

const updateEmployeeRole = () => {
	let queryEmployeeList;
	db.query("SELECT * FROM employee", (err, results) => {
		if (err) {
			console.log(err);
		} else {
			queryEmployeeList = results.map(({ id, first_name, last_name }) => ({
				id: id,
				employeeName: first_name + " " + last_name,
			}));
		}
	});

	inquirer
		.prompt([
			{
				type: "list",
				name: "targetEmployee",
				message: "Which employee would you like to update?",
				choices: queryEmployeeList,
			},
		])
		.then((targetEmployee) => {
			let queryRolesList;
			db.query("SELECT * FROM role", (err, result) => {
				if (err) {
					console.log(err);
				} else {
					queryRolesList = results.map(({ id, title }) => ({
						roleId: id,
						roleTitle: title,
					}));
				}
			});
			inquirer
				.prompt([
					{
						type: "list",
						name: "newRole",
						message: "What new role would you like to give the employee?",
						choices: queryRolesList,
					},
				])
				.then((newRole) => {
					db.query(
						"UPDATE employee SET role_id = ? WHERE id = ?",
						[newRole.roleId, targetEmployee.id],
						(err, results) => {
							if (err) {
								console.log(err);
							} else {
								console.log("Employee has been updated!");
							}
						}
					);
				});
		});
};
