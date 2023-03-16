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
                const roleChoices = res.map(({ id, title }) => ({
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
                            const managerChoices = res.map(({ id, first_name, last_name }) => ({
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
                                    connection.promise().query(query, [employeeCriteria[0], employeeCriteria[1], roleCriteria, managerCriteria], (err, res) => {
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
    const query = 'SELECT * FROM department';
    connection.promise().query(query, (err, res) => {
        if (err) throw err;
        const depNameArray = [];
        res.forEach((department) => {
            depNameArray.push(department.name)
        });
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
                                if (answer.departmentName === department.name) {
                                    departmentId = department.id;
                                }
                            });

                            const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
                            const criteria = [roleCreated, answer.salary, departmentId];

                            connection.promise().query(query, criteria, (err, res) => {
                                if (err) throw err;
                                console.log('Role added.');
                                viewAllRoles();
                            });
                        });
                }
            });
    });
};

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
            const query = 'INSERT INTO department (name) VALUES (?)';
            connection.promise().query(query, answer.departmentName, (err, res) => {
                if (err) throw err;
                console.log('Department added.');
                viewAllDepartments();
            });
        });
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

// view all roles
const viewAllRoles = () => {
    const query =
        `SELECT role.id, role.title, department.name AS department, role.salary
        FROM role
        LEFT JOIN department ON role.department_id = department.id`;

    connection.promise().query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

// view all departments
const viewAllDepartments = () => {
    connection.promise().query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

// view department budget
const viewDepartmentBudget = () => {
    const query =
        `SELECT department.id AS id, 
        department.name AS department,
        SUM(role.salary) AS budget
        FROM role
        LEFT JOIN department ON role.department_id = department.id
        GROUP BY department.id`;

    connection.promise().query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

// update employee role
const updateEmployeeRole = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id" FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id';
    connection.promise().query(query, (err, employees) => {
        if (err) throw err;
        const employeeNameArray = [];
        employees.forEach((employee) => {employeeNameArray.push(`${employee.first_name} ${employee.last_name}`)});

        const query = 'SELECT role.id, role.title FROM role';
        connection.promise().query(query, (err, roles) => {
            if (err) throw err;
            const rolesArray = [];
            roles.forEach((role) => {rolesArray.push(role.title)});
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
                roles.forEach((role) => {
                    if (answer.selectedRole === role.title) {
                        newTitleId = role.id;
                    }
                });
                employees.forEach((employee) => {
                    if (answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`) {
                        employeeId = employee.id;
                    }
                });
                const query = 'UPDATE employee SET employee.role_id = ? WHERE employee.id = ?';
                connection.promise().query(query, [newTitleId, employeeId], (err, res) => {
                    if (err) throw err;
                    console.log('Employee role updated.');
                    promptUser();
                });

            });
        });
    });
};
// update employee manager
const updateEmployeeManager = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee';

    connection.promise().query(query, (err, employees) => {
        if (err) throw err;
        let employeeNameArray = [];
        employees.forEach((employee) => {employeeNameArray.push(`${employee.first_name} ${employee.last_name}`)});
        employeeNameArray.push('None');

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
                message: 'Who is the employee\'s new manager?',
                choices: employeeNameArray
            }
        ])

        .then((answer) => {
            let employeeId, managerId;
            employees.forEach((employee) => {
                if (answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`) {
                    employeeId = employee.id;
                }
                if (answer.newManager === `${employee.first_name} ${employee.last_name}`) {
                    managerId = employee.id;
                }
            });

            if (answer.newManager === 'None') {
                managerId = null;
            }

            if (employeeId === managerId) {
                console.log('Employee cannot be their own manager.');
                promptUser();
            } else {
                let query = 'UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?';
                connection.promise().query(query, [managerId, employeeId], (err, res) => {
                    if (err) throw err;
                    console.log('Employee manager updated.');
                    promptUser();
                });
            }
        });
    });
};
// delete employee
const deleteEmployee = () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name FROM employee';

    connection.promise().query(query, (err, res) => {
        if (err) throw err;
        const employeeNameArray = [];
        res.forEach((employee) => {employeeNameArray.push(`${employee.first_name} ${employee.last_name}`)});
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
            res.forEach((employee) => {
                if (answer.selectedEmployee === `${employee.first_name} ${employee.last_name}`) {
                    employeeId = employee.id;
                }
            });
            const query = 'DELETE FROM employee WHERE employee.id = ?';
            connection.promise().query(query, [employeeId], (err, res) => {
                if (err) throw err;
                console.log('Employee deleted.');
                promptUser();
            });
        });
    });
};
// delete role
const deleteRole = () => {
    const query = 'SELECT role.id, role.title FROM role';

    connection.promise().query(query, (err, res) => {
        if (err) throw err;
        const rolesArray = [];
        res.forEach((role) => {rolesArray.push(role.title)});

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
            res.forEach((role) => {
                if (answer.selectedRole === role.title) {
                    roleId = role.id;
                }
            });
            const query = 'DELETE FROM role WHERE role.id = ?';
            connection.promise().query(query, [roleId], (err, res) => {
                if (err) throw err;
                console.log('Role deleted.');
                viewAllRoles();
            });
        });
    });
};

// delete department
const deleteDepartment = () => {
    const query = 'SELECT department.id, department.name FROM department';
    connection.promise().query(query, (err, res) => {
        if (err) throw err;
        const departmentNameArray = [];
        res.forEach((department) => {departmentNameArray.push(department.name)});
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
            res.forEach((department) => {
                if (answer.selectedDepartment === department.name) {
                    departmentId = department.id;
                }
            });
            const query = 'DELETE FROM department WHERE department.id = ?';
            connection.promise().query(query, [departmentId], (err, res) => {
                if (err) throw err;
                console.log('Department deleted.');
                promptUser();
            });
        });
    });
};

module.exports = connection;