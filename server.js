// import required packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');

// import database connection settings
const connection = require('./config/connection');

// establish connection to database
connection.connect(function (err) {
    if (err) throw err;

    // display HR HUB banner
    figlet('HR HUB', function (err, data) {
        if (err) {
            console.log('Error occurred while creating the figlet banner');
            console.dir(err);
            return;
        }

        // display banner and welcome message
        console.log(chalk.magenta(data));
        console.log(chalk.bold.yellow('YOU ARE CONNECTED TO THE EMPLOYEE DATABASE'));

        // prompt user for input
        promptUser();
    });
});

// present user with options and execute corresponding function
const promptUser = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all employees by department',
                'View all roles',
                'View all departments',
                'View Department Budget',
                'Add employee',
                'Add role',
                'Add department',
                'Update employee role',
                'Update employee manager',
                'Delete employee',
                'Delete role',
                'Delete department',
                'Exit'
            ]
        }
    ])

        .then((answer) => {
            // execute function based on user input
            switch (answer.choices) {
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View all employees by department':
                    viewAllEmployeesByDepartment();
                    break;
                case 'View all employees by manager':
                    viewAllEmployeesByManager();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View Department Budget':
                    viewDepartmentBudget();
                    break;
                case 'Add employee':
                    addEmployee();
                    break;
                case 'Add role':
                    addRole();
                    break;
                case 'Add department':
                    addDepartment();
                    break;
                case 'Update employee role':
                    updateEmployeeRole();
                    break;
                case 'Update employee manager':
                    updateEmployeeManager();
                    break;
                case 'Delete employee':
                    deleteEmployee();
                    break;
                case 'Delete role':
                    deleteRole();
                    break;
                case 'Delete department':
                    deleteDepartment();
                    break;
                case 'Exit':
                    connection.end();
                    break;
            }
        });
};

//! -----------------------ADD FUNCTIONS----------------------------

// function to add an employee to the database
const addEmployee = async () => {
    try {
        // prompt the user for employee details
        const answer = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'Enter first name:',
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return 'Please enter a first name.';
                    }
                }
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'Enter last name:',
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return 'Please enter a last name.';
                    }
                }
            }
        ]);

        const employeeCriteria = [answer.firstName, answer.lastName];
        // get a list of all roles from the database
        const emRole = 'SELECT role.id, role.title FROM role';
        const [roles] = await connection.promise().query(emRole);

        // format the list of roles for display in the prompt
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));

        // prompt the user to select a role
        const roleAnswer = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                message: 'What is the employees role?',
                choices: roleChoices
            }
        ]);

        const roleCriteria = roleAnswer.role;

        // get a list of all managers from the database
        const emManager = 'SELECT employee.id, employee.first_name, employee.last_name FROM employee';
        const [managers] = await connection.promise().query(emManager);

        // format the list of managers for display in the prompt
        const managerChoices = managers.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        // prompt the user to select a manager
        const managerAnswer = await inquirer.prompt([
            {
                name: 'manager',
                type: 'list',
                message: 'Who is the employees manager?',
                choices: managerChoices
            }
        ]);

        const managerCriteria = managerAnswer.manager;

        // insert the new employee into the database
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        await connection.promise().query(query, [employeeCriteria[0], employeeCriteria[1], roleCriteria, managerCriteria]);

        // display success message and view all employees
        console.log('Employee added.');
        viewAllEmployees();
    } catch (err) {
        throw err;
    }
};


// function to add a role to the database
const addRole = async () => {
    try {

        // get a list of all departments from the database
        const query = 'SELECT * FROM department';
        const [departments] = await connection.promise().query(query);

        // format the list of departments for display in the prompt
        const depNameArray = departments.map((department) => department.department_name);
        depNameArray.push('Create New Department');

        // prompt the user to select a department or create a new one
        const departmentAnswer = await inquirer.prompt([
            {
                name: 'departmentName',
                type: 'list',
                message: 'Which department does the role belong to?',
                choices: depNameArray
            }
        ]);

        // if the user wants to create a new department, call the addDepartment function
        if (departmentAnswer.departmentName === 'Create New Department') {
            await addDepartment();
        } else {

            // get the id of the selected department
            const depId = departments.find((department) => department.department_name === departmentAnswer.departmentName).id;

            // prompt the user for the role details
            const roleAnswer = await inquirer.prompt([
                {
                    name: 'roleName',
                    type: 'input',
                    message: 'What is your role?',
                    validate: (value) => {
                        if (value) {
                            return true;
                        } else {
                            return 'Please enter a role name.';
                        }
                    }
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary for the role?',
                    validate: (value) => {
                        if (value) {
                            return true;
                        } else {
                            return 'Please enter a salary.';
                        }
                    }
                }
            ]);

            // insert the new role into the database
            const roleCreated = roleAnswer.roleName;
            const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
            const criteria = [roleCreated, roleAnswer.salary, depId];

            // display success message and view all roles
            await connection.promise().query(query, criteria);
            console.log('Role added.');
            viewAllRoles();
        }
    } catch (err) {
        throw err;
    }
};

// add department
const addDepartment = async () => {
    try {

        // prompt the user for the department name
        const departmentAnswer = await inquirer.prompt([
            {
                name: 'departmentName',
                type: 'input',
                message: 'What is the name of the department?',
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return 'Please enter a department name.';
                    }
                }
            }
        ]);

        // insert the new department into the database
        const query = 'INSERT INTO department (department_name) VALUES (?)';

        // display success message and view all departments
        await connection.promise().query(query, departmentAnswer.departmentName);
        console.log('Department added.');

        // view all departments
        viewAllDepartments();
    } catch (err) {
        throw err;
    }
};

//! -----------------------VIEW FUNCTIONS----------------------------

// view all employees
const viewAllEmployees = async () => {

    // query to get all employees
    const query =
        `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department_name AS department, 
    role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    ORDER BY employee.id ASC;`;

    // display the results in a table
    try {
        const [res] = await connection.promise().query(query);

        // display the results in a table
        console.table(res); // add styling

        // prompt the user to continue
        promptUser();
    } catch (err) {
        throw err;
    }
};

// view all employees by department
const viewAllEmployeesByDepartment = async () => {

    // query to get all departments
    const query =
        `SELECT employee.first_name,
        employee.last_name,
        department_name AS department
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id`;

    // display the results in a table
    try {
        const [res] = await connection.promise().query(query);

        // display the results in a table
        console.table(res); // add styling

        // prompt the user to continue
        promptUser();
    } catch (err) {
        throw err;
    }
};

// view all roles
const viewAllRoles = async () => {

    // query to get all roles
    const query =
        `SELECT role.id, role.title, department.department_name AS department, role.salary
        FROM role
        LEFT JOIN department ON role.department_id = department.id`;

    // display the results in a table
    try {
        const [res] = await connection.promise().query(query);

        // display the results in a table
        console.table(res);

        // prompt the user to continue
        promptUser();
    } catch (err) {
        throw err;
    }
};

// view all departments
const viewAllDepartments = async () => {

    // query to get all departments
    try {
        const [res] = await connection.promise().query('SELECT * FROM department');

        // display the results in a table
        console.table(res);

        // prompt the user to continue
        promptUser();
    } catch (err) {
        throw err;
    }
};

// view department budget
const viewDepartmentBudget = async () => {

    // query to get all departments
    const query =
        `SELECT department.id AS id, 
        department_name AS department,
        SUM(role.salary) AS budget
        FROM role
        LEFT JOIN department ON role.department_id = department.id
        GROUP BY department.id`;

    // display the results in a table
    try {
        const [res] = await connection.promise().query(query);
        console.table(res); // add styling

        // prompt the user to continue
        promptUser();
    } catch (err) {
        throw err;
    }
};

//! -----------------------UPDATE FUNCTIONS----------------------------
// update employee role
const updateEmployeeRole = async () => {

    // query to get all employees
    try {
        const employeeQuery = 'SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id" FROM employee LEFT JOIN role ON employee.role_id = role.id';
        const [employees] = await connection.promise().query(employeeQuery);
        const employeeNameArray = employees.map(employee => `${employee.first_name} ${employee.last_name}`);

        const roleQuery = 'SELECT role.id, role.title FROM role';
        const [roles] = await connection.promise().query(roleQuery);
        const rolesArray = roles.map(role => role.title);

        // prompt the user for the employee and role to update
        const answer = await inquirer.prompt([
            {
                name: 'selectedEmployee',
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employeeNameArray
            },
            {
                name: 'selectedRole',
                type: 'list',
                message: 'What is the employees new role?',
                choices: rolesArray
            }
        ]);

        // update the employee role in the database
        const newTitleId = roles.find(role => answer.selectedRole === role.title).id;
        const employeeId = employees.find(employee => answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`).id;

        const updateQuery = 'UPDATE employee SET employee.role_id = ? WHERE employee.id = ?';
        await connection.promise().query(updateQuery, [newTitleId, employeeId]);

        // display success message and prompt the user to continue
        console.log('Employee role updated.');

        // prompt the user to continue
        promptUser();
    } catch (err) {
        throw err;
    }
};

// update employee manager
const updateEmployeeManager = async () => {

    // query to get all employees
    try {
        const query = 'SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee';
        const [employees] = await connection.promise().query(query);

        let employeeNameArray = employees.map(employee => `${employee.first_name} ${employee.last_name}`);
        employeeNameArray.push('None');

        // prompt the user for the employee and manager to update
        const answer = await inquirer.prompt([
            {
                name: 'selectedEmployee',
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employeeNameArray
            },
            {
                name: 'newManager',
                type: 'list',
                message: 'Who is the employee\'s new manager?',
                choices: employeeNameArray
            }
        ]);

        // update the employee manager in the database
        const employeeId = employees.find(employee => answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`).id;
        const managerId = answer.newManager === 'None' ? null : employees.find(employee => answer.newManager === `${employee.first_name} ${employee.last_name}`).id;

        // check if the employee is their own manager
        if (employeeId === managerId) {
            console.log('Employee cannot be their own manager.');
            promptUser();
        } else {
            const updateQuery = 'UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?';
            await connection.promise().query(updateQuery, [managerId, employeeId]);

            // display success message and prompt the user to continue
            console.log('Employee manager updated.');

            // prompt the user to continue
            promptUser();
        }
    } catch (err) {
        throw err;
    }
};

//! -----------------------DELETE FUNCTIONS----------------------------

// delete employee
const deleteEmployee = async () => {

    // query to get all employees
    try {
        const query = 'SELECT employee.id, employee.first_name, employee.last_name FROM employee';
        const [res] = await connection.promise().query(query);

        // prompt the user for the employee to delete
        const employeeNameArray = res.map(employee => `${employee.first_name} ${employee.last_name}`);
        const answer = await inquirer.prompt([
            {
                name: 'selectedEmployee',
                type: 'list',
                message: 'Which employee would you like to delete?',
                choices: employeeNameArray
            }
        ]);

        // delete the employee from the database
        const employeeId = res.find(employee => answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`).id;

        // check if the employee has any dependents
        const deleteQuery = 'DELETE FROM employee WHERE employee.id = ?';
        await connection.promise().query(deleteQuery, [employeeId]);

        // display success message and prompt the user to continue
        console.log('Employee deleted.');

        // prompt the user to continue
        promptUser();
    } catch (err) {
        throw err;
    }
};

// delete role
const deleteRole = async () => {

    // query to get all roles
    try {
        const query = 'SELECT role.id, role.title FROM role';
        const [res] = await connection.promise().query(query);

        const rolesArray = res.map(role => role.title);


        // prompt the user for the role to delete
        const answer = await inquirer.prompt([
            {
                name: 'selectedRole',
                type: 'list',
                message: 'Which role would you like to delete?',
                choices: rolesArray
            }
        ]);

        const roleId = res.find(role => answer.selectedRole === role.title).id;


        // check if the role has any dependents
        const deleteQuery = 'DELETE FROM role WHERE role.id = ?';
        await connection.promise().query(deleteQuery, [roleId]);

        // display success message and prompt the user to continue
        console.log('Role deleted.');

        // prompt the user to continue
        viewAllRoles();
    } catch (err) {
        throw err;
    }
};

// delete department
const deleteDepartment = async () => {

    // query to get all departments
    try {
        const query = 'SELECT department.id, department.department_name FROM department';
        const [res] = await connection.promise().query(query);

        const departmentNameArray = res.map(department => department.department_name);


        // prompt the user for the department to delete
        const answer = await inquirer.prompt([
            {
                name: 'selectedDepartment',
                type: 'list',
                message: 'Which department would you like to delete?',
                choices: departmentNameArray
            }
        ]);


        // check if the department has any dependents
        const departmentId = res.find(department => answer.selectedDepartment === department.department_name).id;

        const deleteQuery = 'DELETE FROM department WHERE department.id = ?';
        await connection.promise().query(deleteQuery, [departmentId]);

        // display success message and prompt the user to continue
        console.log('Department deleted.');

        // prompt the user to continue
        promptUser();
    } catch (err) {
        throw err;
    }
};

module.exports = connection;