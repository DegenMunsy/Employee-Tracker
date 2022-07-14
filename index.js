const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');
require('console.table');


init();


// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: 'Employee Manager' }).render();
  console.log(logoText);
  loadPrompts();
};

// prompt for list of choices on employee
function loadPrompts() {
    prompt([{
        type: 'list', 
        name: 'choice',
        message: 'what would you like to do?',
        // add in all options from db/index.js
        choices: []
    }])
}

// write functions for what happens in each option

