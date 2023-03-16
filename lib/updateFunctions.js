const connection = require('../server.js');
const mysql = require('mysql2');
// const server = require('../server.js');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
const chalk = require('chalk');

// update employee role

const updateEmployeeRole = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id" FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id';
    connection.promise().query(query, (err, res) => {
        if (err) throw err;
        const employeeNameArray = [];
        res.forEach((employee) => {employeeNameArray.push(`${employee.first_name} ${employee.last_name}`)});

        const query = 'SELECT role.id, role.title FROM role';
        connection.promise().query(query, (err, res) => {
            if (err) throw err;
            const rolesArray = [];
            res.forEach((role) => {rolesArray.push(role.title)});
            inquirer.prompt([
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
            ])

            .then((answer) => {
                let newTitleId, employeeId;
                res.forEach((role) => {
                    if (answer.selectedRole === role.title) {
                        newTitleId = role.id;
                    }
                });
                res.forEach((employee) => {
                    if (answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`) {
                        employeeId = employee.id;
                    }
                });
                const query = 'UPDATE employee SET employee.role_id = ? WHERE employee.id = ?';
                connection.promise().query(query, [newTitleId, employeeId], (err, res) => {
                    if (err) throw err;
                    console.log('Employee role updated.');
                    connection.promise().end();
                    promptUser();
                });

            });
        });
    });
};

// update employee manager

const updateEmployeeManager = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee';

    connection.promise().query(query, (err, res) => {
        let employeeNameArray = [];
        res.forEach((employee) => {employeeNameArray.push(`${employee.first_name} ${employee.last_name}`)});

        inquirer.prompt([
            {
                name: 'selectedEmployee',
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employeeNameArray
            },
            {
                name: 'newManager',
                type: 'list',
                message: 'Who is the employees new manager?',
                choices: employeeNameArray
            }
        ])

        .then((answer) => {
            let employeeId, managerId;
            res.forEach((employee) => {
                if (answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`) {
                    employeeId = employee.id;
                }
            if (answer.newManager === `${employee.first_name} ${employee.last_name}`) {
                managerId = employee.id;
            }
            });
            if (employeeId === managerId) {
                console.log('Employee cannot be their own manager.');
            } else {
                let query = 'UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?';
                connection.promise().query(query, [managerId, employeeId], (err, res) => {
                    if (err) throw err;
                    console.log('Employee manager updated.');
                    connection.promise().end();
                    promptUser();
                });
            }
        });
    });
};

module.exports = {updateEmployeeRole, updateEmployeeManager};