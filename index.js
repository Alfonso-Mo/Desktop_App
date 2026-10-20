import chalk from 'chalk';
import prompts from 'prompts';
import crypto from 'crypto';


(async() => {

    // title and rules that are logged to the console 
    console.log(chalk.bold.magenta('GUESS THE NUMBER!'));
    console.log(chalk.blue("------------------"));
    console.log("Guess a number between 1 and 10.");
    console.log(chalk.yellow("You have 3 attempts!"));
    console.log("");


    // variables 
    const maxAttempts = 3;
    let currentAttempt = 1;

    // random generated number that is between 1 - 10
    const secretNum = crypto.randomInt(1,10);

    for(let i = 0; i < maxAttempts; i++){

        const response = await prompts({
            type: 'number',
            name: 'playerInput',
            message: `Attempt ${currentAttempt} /3: Enter your guess`
        })

        if (response.playerInput == secretNum){
            console.log(chalk.green(`That is correct! The secret number was in fact ${secretNum}`));
            return;
        }

        else if(currentAttempt == 3){
            console.log(chalk.bold.red("GAME OVER!"));
            console.log(`The secret number was ${secretNum}`);
        }

        else{
            console.log(chalk.red("Incorrect, ") + chalk.blue("try again"));
        }

        currentAttempt += 1;
    }




})();
