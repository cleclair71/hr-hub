INSERT INTO department(department_name) 
VALUES('Sales'), ('Engineering'), ('Finance'), ('Legal'), ('Human Resources'), ('Marketing');

INSERT INTO role(title, salary, department_id)
VALUES('Sales Lead', 100000, 1), ('Salesperson', 80000, 1), ('Lead Engineer', 120000, 2), ('Software Engineer', 100000, 2), ('Accountant', 125000, 3), ('Legal Team Lead', 130000, 4), ('Lawyer', 120000, 4), ('HR Lead', 130000, 5), ('HR Representative', 100000, 5), ('Marketing Lead', 130000, 6), ('Marketing Representative', 100000, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Steve', 'Henley', 1, NULL), ('Gordon', 'Marx', 2, 1), ('John', 'Smith', 3, NULL), ('Andrew', 'Smith', 4, 3), ('Jeremy', 'Winters', 5, NULL), ('Emma', 'Wong', 6, NULL), ('Cory', 'Walker', 7, NULL), ('Marg', 'Specter', 8, NULL), ('Keith', 'Williams', 9, NULL), ('Matthew', 'Phinney', 10, NULL), ('Clarissa', 'Baron', 11, NULL);