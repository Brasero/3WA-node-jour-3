import dotenv from 'dotenv';
import readline from 'node:readline';
import Chifoumi from "./src/chifoumi.js";

dotenv.config()

const {APP_ROCK, APP_SHEET, APP_SCISSORS} = process.env


const game = new Chifoumi({rock: APP_ROCK, sheet:APP_SHEET, scissors:APP_SCISSORS})


const commands = {
    start: {
        name: 'start',
        description: 'lance une partie de chifoumi'
    },
    exit: {
        name: 'exit',
        description: 'Arrête le jeu'
    },
    loop: {
        name: 'loop',
        description: 'Lance un nombre définie de partie'
    },
    history: {
        name: 'history',
        description: "Montre l'historique des parties jouée"
    },
    stats: {
        name:'stats',
        description: "Affiche les statistiques de parties"
    },
    reset: {
        name: 'reset',
        description: "Réinitialise les statistiques et l'historique"
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.setPrompt("CHIFOUMI>> ")
rl.prompt()

rl.on('line', (line) => {

    if (line.trim() === commands.exit.name) {
        rl.close()
    }

    switch(line) {
        case commands.start.name:
            game.run(1)
            break;

        case line.match(/^loop \d+$/) ? line : null:
            const arg = line.split(' ')[1];
            game.run(arg)
            break;

        case commands.history.name:
            game.displayHistory()
            break;

        case commands.stats.name:
            game.displayStats()
            break;

        case commands.reset.name:
            game.reset();
            break;

        default:
            console.log('Commande inconnu')
            console.group('Liste des commandes')
                console.table(commands)
            console.groupEnd()
    }
    rl.prompt()
})
rl.on('close', () => {
    console.log('Merci d\'avoir joué')
    process.exit(0)
})