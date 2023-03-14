const server = require('../db/server');
const inquirer = require('inquirer');
const cTable = require('console.table');

// connect to server
server.connect((err) => {
    if (err) throw err;
    console.log('Connected to the employee database.'); // add title banner
    init();
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
                server.end();
                break;
        }
    });
};

// view all employees

const viewAllEmployees = () => {
    
    const query = 
    `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS department, 
    role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee, role, department
    WHERE department.id = role.department_id
    AND role.id = employee.role_id
    ORDER BY employee.id ASC;`;

    server.promise().query(query, (err, res) => {
        if (err) throw err;
        console.table(res); // add styling
        promptUser();
    });
};

// view all employees by department

const viewAllEmployeesByDepartment = () => {
    const query =
    `SELECT employee.firt_name,
    employee.last_name,
    department.name AS department
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id`;

    server.promise().query(query, (err, res) => {
        if (err) throw err;
        console.table(res); // add styling
        promptUser();
    });
};

// view all roles

const viewAllRoles = () => {
    const query =
    `SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON role.department_id = department.id`;

    server.promise().query(query, (err, res) => {
        if (err) throw err;
        console.table(res); // add styling
        promptUser();
    });
};

// view all departments

const viewAllDepartments = () => {
    const query =
    `SELECT department.id AS id, 
    department.name AS department FROM department`;

    server.promise().query(query, (err, res) => {
        if (err) throw err;
        console.table(res); // add styling
        promptUser();
    });
};
// view department budget

const viewDepartmentBudget = () => {
    const query =
    `SELECT department_id AS id, 
    department.name AS department,
    SUM(salary) AS budget
    FROM role
    LEFT JOIN department ON role.department_id = department.id GROUP BY department_id`;

server.query(query, (err, res) => {
    if (err) throw err;
    console.table(res); // add styling
    promptUser();
});
};

// add employee

// add role

// add department

// update employee role

// update employee manager

// delete employee

// delete role

// delete department

// exit