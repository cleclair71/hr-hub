const server = require('../db/server');
const inquirer = require('inquirer');

// delete employee

const deleteEmployee = () => {
    let query = 'SELECT employee.id, employee.first_name, employee.last_name FROM employee';

    server.promise().query(query, (err, res) => {
        if (err) throw err;
        let employeeNameArray = [];
        Response.forEach((employee) => {employeeNameArray.push(`${employee.first_name} ${employee.last_name}`)});
        inquirer.prompt([
            {
                name: 'selectedEmployee',
                type: 'list',
                message: 'Which employee would you like to delete?',
                choices: employeeNameArray
            }
        ])
        .then((answer) => {
            let employeeId;
            Response.forEach((employee) => {
                if (answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`) {
                    employeeId = employee.id;
                }
            });
            let query = 'DELETE FROM employee WHERE employee.id = ?';
            server.promise().query(query, [employeeId], (err, res) => {
                if (err) throw err;
                console.log('Employee deleted.'); // add styling
                // server.promise().end();
                promptUser();
            });
        });
    });
  };


// delete role

const deleteRole = () => {
    let query = 'SELECT role.id, role.title FROM role';

    server.promise().query(query, (err, res) => {
        if (err) throw err;
        let rolesArray = [];
        Response.forEach((role) => {rolesArray.push(role.title)});

        inquirer.prompt([
            {
                name: 'selectedRole',
                type: 'list',
                message: 'Which role would you like to delete?',
                choices: rolesArray
            }
        ])
        .then((answer) => {
            let roleId;
            Response.forEach((role) => {
                if (answer.selectedRole === role.title) {
                    roleId = role.id;
                }
            });
            let query = 'DELETE FROM role WHERE role.id = ?';
            server.promise().query(query, [roleId], (err, res) => {
                if (err) throw err;
                console.log('Role deleted.'); // add styling
                // server.promise().end();
                ViewAllRoles();
            });
        });
    });
  };

// delete department

const deleteDepartment = () => {
    let query = 'SELECT department.id, department.name FROM department';
    server.promise().query(query, (err, res) => {
        if (err) throw err;
        let departmentNameArray = [];
        Response.forEach((department) => {departmentNameArray.push(department.name)});
        inquirer.prompt([
            {
                name: 'selectedDepartment',
                type: 'list',
                message: 'Which department would you like to delete?',
                choices: departmentNameArray
            }
        ])
        .then((answer) => {
            let departmentId;
            Response.forEach((department) => {
                if (answer.selectedDepartment === department.name) {
                    departmentId = department.id;
                }
            });
            let query = 'DELETE FROM department WHERE department.id = ?';
            server.promise().query(query, [departmentId], (err, res) => {
                if (err) throw err;
                console.log('Department deleted.'); // add styling
                // server.promise().end();
                promptUser();
            });
        });
    });
    };