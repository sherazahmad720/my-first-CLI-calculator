import inquirer from 'inquirer';
import chalk, { Chalk } from 'chalk';
import chalkAnimation, { karaoke } from 'chalk-animation';

const warning = chalk.hex('#FFA500');
const welcomeMessage = chalkAnimation.glitch(chalk.blue.bold('Welcome! Now you can calculate some values with this CLI tool By Sherazi'));

var operations: string[] = [
    'Addition',
    'Subtraction',
    'Multiplication',
    'Division'
];
async function AskForUserInput() {
    var userInput = await inquirer.prompt([
        {
            type: 'list',
            name: 'operation',
            message: chalk.yellow('What operation would you like to perform?'),
            choices: operations
        },
        {
            type: 'number',
            name: 'firstNumber',
            message: 'What is the first number?'
        },
        {
            type: 'number',
            name: 'secondNumber',
            message: 'What is the second number?'
        }

    ]);
    calculate(userInput);
}

function calculate(userInput: any) {
    if (!userInput.firstNumber || !userInput.secondNumber) {
        console.log(warning.italic('Ops! You have to enter a number! Please try again!'));
        AskForUserInput();
    } else {
        let result = 0;
        let symbol = '';
        if (userInput.operation === 'Addition') {
            result = userInput.firstNumber + userInput.secondNumber;
            symbol = '+';
        }
        else if (userInput.operation === 'Subtraction') {
            result = userInput.firstNumber - userInput.secondNumber;
            symbol = '-';
        }
        else if (userInput.operation === 'Multiplication') {
            result = userInput.firstNumber * userInput.secondNumber;
            symbol = '*';
        }
        else if (userInput.operation === 'Division') {
            result = userInput.firstNumber / userInput.secondNumber;
            symbol = '/';
        }
        showResult(userInput.firstNumber, userInput.secondNumber, symbol, result);

    }

}
function showResult(num1: number, num2: Number, symbol: string, result: number) {
    console.log(chalk.green.bold(`${num1} ${symbol} ${num2} = ${result}`));
    exitConfirmation();
}

function exitConfirmation() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'repeat',
            message: 'Would you like to perform another calculation?'
        }
    ]).then((answers) => {
        if (answers.repeat) {
            AskForUserInput();
        } else {
            console.log('Thanks for using this CLI tool!');
            process.exit();
        }
    });
}
async function welcome() {
    setTimeout(() => {
        welcomeMessage.stop();
        AskForUserInput();
    }, 1000);
}
welcome();



