import chalk from 'chalk';
import prompts from 'prompts';
import crypto from 'crypto';
import fs from 'node:fs';


(async() => {
        
        fs.writeFileSync('gameLog.txt', "");

        // title and rules that are logged to the console 
        console.log(chalk.bold.magenta('GUESS THE NUMBER!'));
        console.log(chalk.blue("------------------"));
        console.log("Guess a number between 1 and 10.");
        console.log(chalk.yellow("You have 3 attempts!"));
        console.log("");

        // Save title and rules
        fs.appendFileSync('gameLog.txt', "GUESS THE NUMBER!\n");
        fs.appendFileSync('gameLog.txt', "------------------\n");
        fs.appendFileSync('gameLog.txt', "Guess a number between 1 and 10.\n"); 
        fs.appendFileSync('gameLog.txt', "You have 3 attempts!\n\n");

        // variables 
        const maxAttempts = 3;
        const secretNum = crypto.randomInt(1,11);


        for(let i = 1; i <= maxAttempts; i++){
            try{
                const response = await prompts({
                    type: 'text',
                    name: 'playerInput',
                    message: `Attempt ${i}/3: Enter your guess`
                })

                const guess = response.playerInput;


                if(guess === undefined){
                    console.log(chalk.yellow("Game cancelled."));
                    fs.appendFileSync('gameLog.txt', "Game cancelled.\n");
                    return;
                }

                // Save the player's guess
                fs.appendFileSync('gameLog.txt', `Attempt ${i}/${maxAttempts}: ${guess}\n`);

                if(guess.trim() === ""){
                    throw new Error("Input can't be empty");
                }

                const playerNum = Number(guess);

                if(! Number.isInteger(playerNum) ){
                    throw new Error( "Has to be an integer");
                }

                if(playerNum <= 0){
                    throw new Error("Number can't be an negative number or 0");
                }

                if(playerNum > 10){
                    throw new Error("Guess can NOT exceed 10");
                }


                if(playerNum > secretNum){
                    console.log(chalk.yellow("Too big, the number is smaller"));
                    fs.appendFileSync('gameLog.txt', "Too big, the number is smaller\n");
                }

                else if(playerNum < secretNum){
                    console.log(chalk.magenta("Too small, the number is bigger"));
                    fs.appendFileSync('gameLog.txt', "Too small, the number is bigger\n");
                }

                else {
                    console.log(chalk.green(`That is correct! The secret number was in fact ${secretNum}`));
                    fs.appendFileSync('gameLog.txt', `That is correct! The secret number was in fact ${secretNum}\n`);
                    return;
                }

            }

            catch(error){
                console.error(chalk.red(error.message));
                fs.appendFileSync('gameLog.txt', error.message + "\n");
            }

            
        }
        // When game is over
        console.log(chalk.bold.red("GAME OVER! Out of attempts!"));
        console.log(`The secret number was ${secretNum}`);

        fs.appendFileSync('gameLog.txt', "GAME OVER! Out of attempts!\n");
        fs.appendFileSync('gameLog.txt', `The secret number was ${secretNum}\n`);



})();
