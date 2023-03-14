const server = require('../db/server');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { addEmployee, addRole, addDepartment } = require('./addFunctions');
const {updateEmployeeRole, updateEmployeeManager} = require('./updateFunctions');
const {deleteEmployee, deleteRole, deleteDepartment} = require('./deleteFunctions');
const {viewAllEmployees, viewAllEmployeesByDepartment, viewAllEmployeesByManager, viewAllRoles, viewAllDepartments, viewDepartmentBudget} = require('./displayFunctions');

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



