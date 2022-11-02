# Employee-Tracker

## Demo
https://drive.google.com/file/d/1e1YNH-nfEosMZegwdrx6hA3TLX-3DFe3/view

## Introduction
This project lets the user keep track of a company's employees, departments, and roles via mysql databases.

## Installation
Initially run the command: 
```
npm i
```
Inside sql shell, use the schema.sql to drop and/or create necessary databases and tables.
Afterwards run the following command in bash:
```
node index.js
```

## Build Process
Create initial files and install any necessary npm packages. 
Create a schema.sql including a drop/create database and tables for department, role, and employee.
Properly give table columns restraints and any foreign keys referrals.
Create a seed.sql with premade tables to assist in testing later.
Create a mysql connection within the index.js.
Make an initial inquirer prompt based upon user stories and acceptance criteria.
Per prompt requirement, create a function to execute the needed task.

## Code Snippet
Inside the addEmployee() function, fixing the query statement was my first major roadblock due to syntax and needing to handle null values for managerId.
```
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
```
## Languages and Technology
Javascript<br>
SQL
Node.js<br>
npm<br>
inquirer.js<br>
mysql2.js<br>
console.table.js

## Author
[GitHub](https://github.com/PeterKim89)<br>
[LinkedIn](www.linkedin.com/in/peter-kim89)<br>
[Email] Peter.Kim@uconn.edu

## License
[MIT](https://choosealicense.com/licenses/mit/)<br>
Copyright (c) [2022] [Peter Kim]