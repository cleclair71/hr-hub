const server = require('./db/server.js');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { addEmployee, addRole, addDepartment } = require('./lib/addFunctions');
const {updateEmployeeRole, updateEmployeeManager} = require('./lib/updateFunctions');
const {deleteEmployee, deleteRole, deleteDepartment} = require('./lib/deleteFunctions');
const {viewAllEmployees, viewAllEmployeesByDepartment, viewAllEmployeesByManager, viewAllRoles, viewAllDepartments, viewDepartmentBudget} = require('./lib/viewFunctions');

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



