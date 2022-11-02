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

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    promptList();
})

const promptList = () => {
	return inquirer.prompt([
			{
				type: "list",
				name: "userAction",
				message: "What would you like to do?",
				choices: [
					"View all departments",
					"View all roles",
					// "View all employees",
					// "Add a department",
					// "Add a role",
					// "Add an employee",
					// "Update an employee role",
				],
			},
		])
		.then((answers) => {
			if (answers.userAction === "View all departments") {
				viewDepartments();
                console.log(1)
			} 
            else if (answers.userAction === "View all roles") {
				viewRoles();
                console.log(2)
			}
            //  else if (answers.userAction === "View all employees") {
			// 	viewEmployees();
            //     console.log(3)
			// } else if (answers.userAction === "Add a department") {
			// 	addDepartment();
            //     console.log(4)
			// } else if (answers.userAction === "Add a role") {
			// 	addRole();
            //     console.log(5)
			// } else if (answers.userAction === "Add an employee") {
			// 	addEmployee();
            //     console.log(6)
			// } else if (answers.userAction === "Update an employee role") {
			// 	updateEmployeeRole();
            //     console.log(7)
			// }
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
				`INSERT INTO department(name) VALUES ${answers.departmentName}`,
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
		])
		.then((answers) => {
			db.query(
				`INSERT INTO role(title, salary) VALUES (${answers.roleName}), (${answers.roleSalary})`,
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
                name: "employeeManagerId",
                message: "What is the employee's manager's id?",
            },
		])
		.then((answers) => {
			db.query(
				`INSERT INTO employee(first_name, last_name, manager_id) VALUES (${answers.employeeFirstName}), (${answers.employeeLastName}), (${answers.employeeManagerId})`,
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

// const updateEmployeeRole = () => {

// }

// const init = async () => {
//     await promptList();
// }

// init();