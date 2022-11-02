INSERT INTO department (name)
VALUES 
('Engineering'),
('Marketing'),
('Finances');

INSERT INTO role (title, salary, department_id)
VALUES
('Engineer', 85000, 1),
('Software Developer', 90000, 1),
('Accountant', 70000, 3), 
('Finanical Analyst', 75000, 3),
('Market Research Analyst', 60000, 2), 
('Sales Representative', 55000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Joe', 'Shmoe', 2, null),
('Bob', 'Geoff', 1, 1),
('Geoff', 'Bob', 1, null),
('Thomas', 'Engine', 3, 3),
('Dan', 'Daneielson', 2, null);