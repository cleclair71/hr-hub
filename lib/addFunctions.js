const connection = require('..//config/connection.js');
const mysql = require('mysql2');
// const server = require('../server.js');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
const chalk = require('chalk');

// add new employee

const addEmployee = () => {
    inquirer.prompt([
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
    ])
        .then((answer) => {
            const employeeCriteria = [answer.firstName, answer.lastName];
            const emRole = 'SELECT role.id, role.title FROM role';
            connection.promise().query(emRole, (err, res) => {
                if (err) throw err;
                const roleChoices = data.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));

                inquirer.prompt([
                    {
                        name: 'role',
                        type: 'list',
                        message: 'What is the employees role?',
                        choices: roleChoices
                    }
                ])
                    .then((answer) => {
                        const roleCriteria = answer.role;
                        const emManager = 'SELECT employee.id, employee.first_name, employee.last_name FROM employee';
                        connection.promise().query(emManager, (err, res) => {
                            if (err) throw err;
                            const managerChoices = data.map(({ id, first_name, last_name }) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));

                            inquirer.prompt([
                                {
                                    name: 'manager',
                                    type: 'list',
                                    message: 'Who is the employees manager?',
                                    choices: managerChoices
                                }
                            ])
                                .then((answer) => {
                                    const managerCriteria = answer.manager;
                                    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                                    connection.promise().query(query, { first_name: employeeCriteria[0], last_name: employeeCriteria[1], role_id: roleCriteria, manager_id: managerCriteria }, (err, res) => {
                                        if (err) throw err;
                                        console.log('Employee added.');
                                        viewAllEmployees();
                                    });
                                });
                        });
                    });
            });
        });
};


// add new role

const addRole = () => {
    const query = 'SELECT * FROM department'
    connection.promise().query(query, (err, res) => {
      if (err) throw err;
      const depNameArray = [];
      res.forEach((department) => {depNameArray.push(department.name)});
      depNameArray.push('Create New Department');
      inquirer.prompt([
        {
          name: 'departmentName',
          type: 'list',
          message: 'Which department does the role belong to?',
          choices: depNameArray
        }
      ])
      .then((answer) => {
        if (answer.departmentName === 'Create New Department') {
          addDepartment();
        } else {
          const depId = res.find((department) => department.name === answer.departmentName).id;
          inquirer.prompt([
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
          ])
          .then((answer) => {
            const roleCreated = answer.roleName;
            let departmentId;
  
            res.forEach((department) => {
              if (departmentData.departmentName === department.department_name) {
                departmentId = department.id;
              }
            });
  
            const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
            const criteria = [roleCreated, answer.salary, departmentId];
  
            connection.promise().query(query, criteria, (err, res) => {
              if (err) throw err;
              console.log('Role added.'); // add styling
              viewAllRoles();
            });
          });
        }
      });
    });
  };

// add new department

const addDepartment = () => {

    inquirer.prompt([
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
    ])
        .then((answer) => {
            const query = 'INSERT INTO department (department_name) VALUES (?';
            connection.promise().query(query, answer.departmentName, (err, res) => {
                if (err) throw err;
                console.log('Department added.'); // add styling
                viewAllDepartments();
            });
        });
}

module.exports = { addEmployee, addRole, addDepartment };