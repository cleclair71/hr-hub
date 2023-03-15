const inquirer = require('inquirer');
const server = require('../server');
const cTable = require('console.table');
const figlet = require('figlet');

// update employee role

const updateEmployeeRole = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id" FROM employee, role, deppartment WHERE department.id = role.department_id AND role.id = employee.role_id';
    server.promise().query(query, (err, res) => {
        if (err) throw err;
        const employeeNameArray = [];
        Response.forEach((employee) => {employeeNameArray.push(`${employee.first_name} ${employee.last_name}`)});

        const query = 'SELECT role.id, role.title FROM role';
        server.promise().query(query, (err, res) => {
            if (err) throw err;
            const rolesArray = [];
            Response.forEach((role) => {rolesArray.push(role.title)});
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
                Response.forEach((role) => {
                    if (answer.selectedRole === role.title) {
                        newTitleId = role.id;
                    }
                });
                Response.forEach((employee) => {
                    if (answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`) {
                        employeeId = employee.id;
                    }
                });
                const query = 'UPDATE employee SET employee.role_id = ? WHERE employee.id = ?';
                server.promise().query(query, [newTitleId, employeeId], (err, res) => {
                    if (err) throw err;
                    console.log('Employee role updated.');
                    server.promise().end();
                    promptUser();
                });

            });
        });
    });
};

// update employee manager

const updateEmployeeManager = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee';

    server.promise().query(query, (err, res) => {
        let employeeNameArray = [];
        Response.forEach((employee) => {employeeNameArray.push(`${employee.first_name} ${employee.last_name}`)});

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
            Response.forEach((employee) => {
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
                server.promise().query(query, [managerId, employeeId], (err, res) => {
                    if (err) throw err;
                    console.log('Employee manager updated.');
                    server.promise().end();
                    promptUser();
                });
            }
        });
    });
};

module.exports = {updateEmployeeRole, updateEmployeeManager};