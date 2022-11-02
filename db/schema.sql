-- removes any pre-existing employees_db database and creates a new one
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
-- selects the employees_db to use
USE employees_db;

-- creates a department table inside employees_db with a value of name
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- creates a role table inside employees_db with values of title, salary, and department_id. department_id refers to department(id)
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

-- creates an employee table inside employees_db with values of first_name, last_name, role_id, and manager_id
-- role_id refers to role(id) and manager_id refers to another employee's employee(id)
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT DEFAULT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);
