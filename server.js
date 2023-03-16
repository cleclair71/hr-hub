const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');
const connection = require('./config/connection');

// const { addEmployee, addRole, addDepartment } = require('./lib/addFunctions');
// const {updateEmployeeRole, updateEmployeeManager} = require('./lib/updateFunctions');
// const {deleteEmployee, deleteRole, deleteDepartment} = require('./lib/deleteFunctions');
// const {viewAllEmployees, viewAllEmployeesByDepartment, viewAllEmployeesByManager, viewAllRoles, viewAllDepartments, viewDepartmentBudget} = require('./lib/displayFunctions');

// connect to connection
connection.connect(function (err) {
    if (err) throw err;
    figlet('HR HUB', function(err, data) {
      if (err) {
        console.log('Error occurred while creating the figlet banner');
        console.dir(err);
        return;
      }
      console.log(chalk.magenta(data));
      console.log(chalk.bold.yellow('YOU ARE CONNECTED TO THE EMPLOYEE DATABASE'));
      promptUser();
    });
  });

// prompt user choices
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

// add new employee

const addEmployee = async () => {
    try {
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
        const emRole = 'SELECT role.id, role.title FROM role';
        const [roles] = await connection.promise().query(emRole);

        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));

        const roleAnswer = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                message: 'What is the employees role?',
                choices: roleChoices
            }
        ]);

        const roleCriteria = roleAnswer.role;
        const emManager = 'SELECT employee.id, employee.first_name, employee.last_name FROM employee';
        const [managers] = await connection.promise().query(emManager);

        const managerChoices = managers.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        const managerAnswer = await inquirer.prompt([
            {
                name: 'manager',
                type: 'list',
                message: 'Who is the employees manager?',
                choices: managerChoices
            }
        ]);

        const managerCriteria = managerAnswer.manager;
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        await connection.promise().query(query, [employeeCriteria[0], employeeCriteria[1], roleCriteria, managerCriteria]);

        console.log('Employee added.');
        viewAllEmployees();
    } catch (err) {
        throw err;
    }
};

const addRole = async () => {
    try {
        const query = 'SELECT * FROM department';
        const [departments] = await connection.promise().query(query);

        const depNameArray = departments.map((department) => department.department_name);
        depNameArray.push('Create New Department');

        const departmentAnswer = await inquirer.prompt([
            {
                name: 'departmentName',
                type: 'list',
                message: 'Which department does the role belong to?',
                choices: depNameArray
            }
        ]);

        if (departmentAnswer.departmentName === 'Create New Department') {
            await addDepartment();
        } else {
            const depId = departments.find((department) => department.department_name === departmentAnswer.departmentName).id;

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

            const roleCreated = roleAnswer.roleName;
            const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
            const criteria = [roleCreated, roleAnswer.salary, depId];

            await connection.promise().query(query, criteria);
            console.log('Role added.');
            viewAllRoles();
        }
    } catch (err) {
        throw err;
    }
};

const addDepartment = async () => {
    try {
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

        const query = 'INSERT INTO department (department_name) VALUES (?)';
        await connection.promise().query(query, departmentAnswer.departmentName);
        console.log('Department added.');
        viewAllDepartments();
    } catch (err) {
        throw err;
    }
};
// view all employees

const viewAllEmployees = async () => {
    
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

    try {
        const [res] = await connection.promise().query(query);
        console.table(res); // add styling
        promptUser();
    } catch (err) {
        throw err;
    }
};

const viewAllEmployeesByDepartment = async () => {
    const query =
        `SELECT employee.first_name,
        employee.last_name,
        department_name AS department
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id`;

    try {
        const [res] = await connection.promise().query(query);
        console.table(res); // add styling
        promptUser();
    } catch (err) {
        throw err;
    }
};

const viewAllRoles = async () => {
    const query =
        `SELECT role.id, role.title, department.department_name AS department, role.salary
        FROM role
        LEFT JOIN department ON role.department_id = department.id`;

    try {
        const [res] = await connection.promise().query(query);
        console.table(res);
        promptUser();
    } catch (err) {
        throw err;
    }
};

const viewAllDepartments = async () => {
    try {
        const [res] = await connection.promise().query('SELECT * FROM department');
        console.table(res);
        promptUser();
    } catch (err) {
        throw err;
    }
};

// view department budget
const viewDepartmentBudget = async () => {
    const query =
        `SELECT department.id AS id, 
        department_name AS department,
        SUM(role.salary) AS budget
        FROM role
        LEFT JOIN department ON role.department_id = department.id
        GROUP BY department.id`;

    try {
        const [res] = await connection.promise().query(query);
        console.table(res); // add styling
        promptUser();
    } catch (err) {
        throw err;
    }
};

const updateEmployeeRole = async () => {
    try {
        const employeeQuery = 'SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id" FROM employee LEFT JOIN role ON employee.role_id = role.id';
        const [employees] = await connection.promise().query(employeeQuery);
        const employeeNameArray = employees.map(employee => `${employee.first_name} ${employee.last_name}`);

        const roleQuery = 'SELECT role.id, role.title FROM role';
        const [roles] = await connection.promise().query(roleQuery);
        const rolesArray = roles.map(role => role.title);

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

        const newTitleId = roles.find(role => answer.selectedRole === role.title).id;
        const employeeId = employees.find(employee => answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`).id;

        const updateQuery = 'UPDATE employee SET employee.role_id = ? WHERE employee.id = ?';
        await connection.promise().query(updateQuery, [newTitleId, employeeId]);
        console.log('Employee role updated.');
        promptUser();
    } catch (err) {
        throw err;
    }
};
const updateEmployeeManager = async () => {
    try {
        const query = 'SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee';
        const [employees] = await connection.promise().query(query);

        let employeeNameArray = employees.map(employee => `${employee.first_name} ${employee.last_name}`);
        employeeNameArray.push('None');

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

        const employeeId = employees.find(employee => answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`).id;
        const managerId = answer.newManager === 'None' ? null : employees.find(employee => answer.newManager === `${employee.first_name} ${employee.last_name}`).id;

        if (employeeId === managerId) {
            console.log('Employee cannot be their own manager.');
            promptUser();
        } else {
            const updateQuery = 'UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?';
            await connection.promise().query(updateQuery, [managerId, employeeId]);
            console.log('Employee manager updated.');
            promptUser();
        }
    } catch (err) {
        throw err;
    }
};
const deleteEmployee = async () => {
    try {
        const query = 'SELECT employee.id, employee.first_name, employee.last_name FROM employee';
        const [res] = await connection.promise().query(query);

        const employeeNameArray = res.map(employee => `${employee.first_name} ${employee.last_name}`);

        const answer = await inquirer.prompt([
            {
                name: 'selectedEmployee',
                type: 'list',
                message: 'Which employee would you like to delete?',
                choices: employeeNameArray
            }
        ]);

        const employeeId = res.find(employee => answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`).id;

        const deleteQuery = 'DELETE FROM employee WHERE employee.id = ?';
        await connection.promise().query(deleteQuery, [employeeId]);
        console.log('Employee deleted.');
        promptUser();
    } catch (err) {
        throw err;
    }
};
const deleteRole = async () => {
    try {
        const query = 'SELECT role.id, role.title FROM role';
        const [res] = await connection.promise().query(query);

        const rolesArray = res.map(role => role.title);

        const answer = await inquirer.prompt([
            {
                name: 'selectedRole',
                type: 'list',
                message: 'Which role would you like to delete?',
                choices: rolesArray
            }
        ]);

        const roleId = res.find(role => answer.selectedRole === role.title).id;

        const deleteQuery = 'DELETE FROM role WHERE role.id = ?';
        await connection.promise().query(deleteQuery, [roleId]);
        console.log('Role deleted.');
        viewAllRoles();
    } catch (err) {
        throw err;
    }
};

const deleteDepartment = async () => {
    try {
        const query = 'SELECT department.id, department.department_name FROM department';
        const [res] = await connection.promise().query(query);

        const departmentNameArray = res.map(department => department.department_name);

        const answer = await inquirer.prompt([
            {
                name: 'selectedDepartment',
                type: 'list',
                message: 'Which department would you like to delete?',
                choices: departmentNameArray
            }
        ]);

        const departmentId = res.find(department => answer.selectedDepartment === department.department_name).id;

        const deleteQuery = 'DELETE FROM department WHERE department.id = ?';
        await connection.promise().query(deleteQuery, [departmentId]);
        console.log('Department deleted.');
        promptUser();
    } catch (err) {
        throw err;
    }
};

module.exports = connection;