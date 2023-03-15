  ![GitHub license](https://img.shields.io/badge/license-MIT-pink.svg)
  ![repo size](https://img.shields.io/github/repo-size/cleclair71/hr-hub?color=yellow)
  ![commits](https://img.shields.io/github/commit-activity/m/cleclair71/hr-hub/main)
  ![language](https://img.shields.io/github/languages/top/cleclair71/hr-hub)
  ![console.table](https://img.shields.io/github/package-json/dependency-version/cleclair71/hr-hub/console.table)
  ![inquirer](https://img.shields.io/github/package-json/dependency-version/cleclair71/hr-hub/inquirer?color=lime)
  ![mysql2](https://img.shields.io/github/package-json/dependency-version/cleclair71/hr-hub/mysql2?color=orange)

  <a name="readme-top"></a>
 <br />
 <div align="center">
 <h1 align="center">HR Hub</h1>
    <a href="https://github.com/cleclair71/hr-hub">
     <img src="/assets/img/hrhub.jpg" alt="Logo" height="200">
   </a>
    <p align="center">
      Teamwork made easy with our input generated CLI crew cards!
    </p>
  
<br />
<details><summary>Table of Contents;</summary>

* [About the Project](#description) 

* [Added Features](#features)
 
* [Installation](#installation)
 
* [Usage](#usage) 

* [Contributing](#contributing)

* [Resources](#resources)
 
* [license](#license)

* [Questions](#questions)

</details>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a name="description"></a>
## :rocket: About The Project
<p align="center">
  <img src="assets\Capture.JPG"/>
</p>

Welcome to our business management tool HR Hub! This application has been designed to help you organize and plan your business by providing you with a comprehensive view of your departments, roles, and employees.

Our command-line application accepts user input and provides you with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role.

When you choose to view all departments, you will be presented with a formatted table showing department names and department ids. If you choose to view all roles, you will see the job title, role id, the department that role belongs to, and the salary for that role. Similarly, when you choose to view all employees, you will be presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.

Our application also allows you to add new departments, roles, and employees to the database. When you choose to add a department, you will be prompted to enter the name of the department and that department will be added to the database. Similarly, when you choose to add a role, you will be prompted to enter the name, salary, and department for the role, and that role will be added to the database. Finally, when you choose to add an employee, you will be prompted to enter the employee's first name, last name, role, and manager, and that employee will be added to the database.

Last but not least, our application also allows you to update an employee's role. When you choose to update an employee role, you will be prompted to select an employee to update and their new role. This information will then be updated in the database.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<a name="features"></a>

## :star: Added Features

 - Collapsible cards at a click of a button
 - Avatar api fetch with axios
 - Fully Responsive cards
 - Link to an alert that prompts you create a new team
 - Default photo is there if an api error or the user doesn't have a github profile
 - Role specific icons and cover photos

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a name="installation"></a>

## :hammer_and_wrench: Installation

1. Clone the repository 

```bash
git clone https://github.com/cleclair71/hr-hub.git
```
2. Change the Working Directory

```bash
cd hr-hub
```
3. Install [`inquirer`](https://www.npmjs.com/package/inquirer), [`axios`](https://www.npmjs.com/package/axios) and [`jest`](https://www.npmjs.com/package/jest)

```bash
npm i
```
4. Run the App

```bash
\hr-hub> node index.js
```

This will start the application and prompt you to answer the required prompts in the command line. 
 


<p align="right">(<a href="#readme-top">back to top</a>)</p>

  <a name="usage"></a>

## :computer: Usage

<div align="center">
     <img src="assets\app.gif">
   </div>
   <br />
   <p align="center"> 
   <a href="https://drive.google.com/file/d/1oZJElx4QXzcGZlfQwMoUEVd9D6Ld_YKO/view?usp=sharing">Walk Through Video</a>
   </p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
  

 <a name="contributing"></a>

## :handshake: Contributing

Thank you for your interest in contributing to this project! By contributing, you can help make this project even better for everyone.

### How to Contribute

If you would like to contribute to this project, please follow these steps:
      
1. **Fork the Project:** Fork this project to your own GitHub account.

2. **Create your Feature Branch:** Create a branch for your feature using:
```bash 
git checkout -b your-branch-name.
```
3. **Commit your Changes:** Commit your changes using:
```bash 
git commit -m "Your commit message here"
```
4. **Push to the Branch:** Push your changes to the branch using:
```bash 
git push origin your-branch-name
```
5. **Open a Pull Request:** Open a pull request to merge your changes into the main branch of the original project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<a name="license"></a>

## :clipboard: License
MIT
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a name="resources"></a>
## :mag_right: Resources

* [Creating and Selecting a Database](https://dev.mysql.com/doc/refman/8.0/en/creating-database.html)
* [Creating a Table](https://dev.mysql.com/doc/refman/8.0/en/creating-tables.html)
* [Figlet](https://www.npmjs.com/package/figlet)
* [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
* [How To Create Interactive Command-line Prompts with Inquirer.js](https://www.digitalocean.com/community/tutorials/nodejs-interactive-command-line-prompts)
* [Icons created by Paul J.](https://www.flaticon.com/free-icons/programmer)
* [onerror](https://www.w3schools.com/jsref/event_onerror.asp)
* [Collapse](https://getbootstrap.com/docs/4.1/components/collapse/)
* [Overwrite a File with node.js](https://stackoverflow.com/questions/43892482/whats-the-best-way-to-overwrite-a-file-using-fs-in-node-js)
* [Axios](https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index)
* [github API](https://api.github.com/users/cleclair71)
* [Canva](https://www.canva.com/)
* [Everything you should know about ‘module’ & ‘require’ in Node.js](https://www.freecodecamp.org/news/require-module-in-node-js-everything-about-module-require-ccccd3ad383/)
* [break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)
* [ShieldsIO](https://shields.io/category/funding)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a name="questions"></a>

## :mailbox_with_no_mail: Questions?

If you have any questions about this project, please don't hesitate to reach out to me. I'm always happy to help and provide additional information.

### How to Ask a Question

1. **Check the existing documentation:** Before asking a question, please take a moment to review the existing documentation. Your question may already be answered in the README file or other project documentation.

2. **Create a new issue:** If you can't find the answer to your question in the documentation, please create a new issue in the project's issue tracker. Be sure to provide as much detail as possible about your question, including any relevant code snippets or screenshots.

3. **Contact cleclair71 directly:** If you prefer to contact me directly, you can do so by sending me an email at cassieleclair71@gmail.com. Please include "Question about README Generator" in the subject line so that I can quickly identify your message.

   <p align="center"> 
   <a href="https://github.com/cleclair71/hr-hub">My Repository</a>
   </p>
   
### :pray: Feedback and Suggestions

I welcome feedback and suggestions for this project. If you have ideas for how to improve the project, please feel free to create a new issue or contact me directly. Your input is greatly appreciated!
 
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
 
