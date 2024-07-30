// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: ('What is the title of your project?'),
        name: 'title',
      },
      {
          type: 'input',
          message: ('Please enter a description of your project'),
          name: 'desc',
      },
      {
          type: 'input',
          message: ('Please enter instructions for installation'),
          name: 'install',
      },
      {
        type: 'input',
        message: ('Please enter usage information'),
        name: 'usage',
    },
    {
        type: 'input',
        message: ('Please enter contribution guidelines'),
        name: 'contribution',
    },
    {
        type: 'input',
        message: ('Please enter test instructions'),
        name: 'test',
    },
    {
        type: 'list',
        message: 'Choose a license for your project',
        name: 'license',
        choices: ['MIT', 'GPL-3.0', 'Apache-2.0', 'BSD-3-Clause', 'None'],
    },
    {
        type: 'input',
        message: ('Please enter your github username'),
        name: 'username',
    },
    {
        type: 'input',
        message: ('Please enter your email adress'),
        name: 'email',
    },
];

const licenses = {
    'MIT': {
        badge: '![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)',
        link: 'https://opensource.org/licenses/MIT',
    },
    'GPL-3.0': {
        badge: '![GPLv3 License](https://img.shields.io/badge/License-GPLv3-blue.svg)',
        link: 'https://www.gnu.org/licenses/gpl-3.0',
    },
    'Apache-2.0': {
        badge: '![Apache License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)',
        link: 'https://opensource.org/licenses/Apache-2.0',
    },
    'BSD-3-Clause': {
        badge: '![BSD License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)',
        link: 'https://opensource.org/licenses/BSD-3-Clause',
    },
    'None': {
        badge: '',
        link: '',
    },
};


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Success`);
        }
    });
}
// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((answers) => {
        const readmeTemplate = `
# ${answers.title}

${licenses[answers.license].badge}

## Table of Contents

1. [Description](#description)
2. [Installation Instructions](#installation-instructions)
3. [Usage Information](#usage-information)
4. [Contribution Guidelines](#contribution-guidelines)
5. [Test Instructions](#test-instructions)
6. [License](#license)
7. [Questions](#questions)

## Description
${answers.desc}

## Installation Instructions
${answers.install}

## Usage Information
${answers.usage}

## Contribution Guidelines
${answers.contribution}

## Test Instructions
${answers.test}

${answers.license !== 'None' ? `## License
This project is licensed under the [${answers.license} license](${licenses[answers.license].link}).` : ''}

## Questions
(https://github.com/${answers.username})
email me: ${answers.email}
`;
writeToFile(`${answers.title}.md`, readmeTemplate);
});
}

// Function call to initialize app
init();
