#! /usr/bin/env node
// Countdown Timer Project
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
console.log(chalk.blue.bold("Welcome to Code With Saba - Countdown Timer"));
console.log("-".repeat(60));
const res = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: chalk.yellow.bold("Please enter the amount of second"),
    validate: (input) => {
        if (isNaN(input)) {
            return "Please enter valid number";
        }
        else if (input > 60) {
            return "seconds must be in 60";
        }
        else {
            return true;
        }
    }
});
let input = res.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval((() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currTime);
        if (timeDiff <= 0) {
            console.log(chalk.magenta("Timer has expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
