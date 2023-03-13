  ![GitHub license](https://img.shields.io/badge/license-MIT-pink.svg)
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

* [Tests](#tests)
 
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

Introducing our command-line application designed to help managers generate a webpage that displays their team's basic information, such as their email addresses and GitHub profiles. This allows for quick and easy access to important team member information. The webpage is nicely formatted and based on the user input. When you click on an email address in the webpage, your default email program will open and populate the TO field with the email address. Additionally, when you click on a team member's GitHub username, the application will open that GitHub profile in a new tab.

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
git clone https://github.com/cleclair71/CrewCard.git
```
2. Change the Working Directory

```bash
cd CrewCard
```
3. Install [`inquirer`](https://www.npmjs.com/package/inquirer), [`axios`](https://www.npmjs.com/package/axios) and [`jest`](https://www.npmjs.com/package/jest)

```bash
npm install inquirer axios jest --save-dev
```
4. Run the App

```bash
\CrewCard> node index.js
```

This will start the application and prompt you to answer the required prompts in the command line. 

After answering all the prompts, your index.html file will be generated and saved in the dist folder. 


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

<a name="tests"></a>

## :heavy_check_mark: Tests

### Material

Tests are run with [JEST](https://jestjs.io/)

### How to Run the Tests

* Setup the Environment

```
cd \CrewCard
```

* Run Tests

```
npm run test
```

  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a name="license"></a>

## :clipboard: License
MIT
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a name="resources"></a>
## :mag_right: Resources

* [Google Fonts](https://fonts.google.com/)
* [Sticky Navbar](https://bootstrapious.com/p/bootstrap-sticky-navbar)
* [Footer](https://mdbootstrap.com/docs/standard/navigation/footer/)
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
* [How to Format and Validate in node js](https://stackoverflow.com/questions/52456065/how-to-format-and-validate-email-node-js)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a name="questions"></a>

## :mailbox_with_no_mail: Questions?

If you have any questions about this project, please don't hesitate to reach out to me. I'm always happy to help and provide additional information.

### How to Ask a Question

1. **Check the existing documentation:** Before asking a question, please take a moment to review the existing documentation. Your question may already be answered in the README file or other project documentation.

2. **Create a new issue:** If you can't find the answer to your question in the documentation, please create a new issue in the project's issue tracker. Be sure to provide as much detail as possible about your question, including any relevant code snippets or screenshots.

3. **Contact cleclair71 directly:** If you prefer to contact me directly, you can do so by sending me an email at cassieleclair71@gmail.com. Please include "Question about README Generator" in the subject line so that I can quickly identify your message.

   <p align="center"> 
   <a href="https://github.com/cleclair71/readme-generator/tree/master">My Repository</a>
   </p>
   
### :pray: Feedback and Suggestions

I welcome feedback and suggestions for this project. If you have ideas for how to improve the project, please feel free to create a new issue or contact me directly. Your input is greatly appreciated!
 
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
 
