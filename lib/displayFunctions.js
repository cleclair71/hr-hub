const server = require('../db/server');
const inquirer = require('inquirer');
const cTable = require('console.table');
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

module.exports = { viewAllEmployees, viewAllEmployeesByDepartment, viewAllRoles, viewAllDepartments, viewDepartmentBudget };