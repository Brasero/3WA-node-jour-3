

class Chifoumi {

    constructor({rock, sheet, scissors}){
        this.rock = rock;
        this.sheet = sheet;
        this.scissors = scissors;
        this.storedGame = [];
        this.stats = {
            game: {
                qte: 0,
                j1: 0,
                j2: 0,
                equality: 0
            },
            manche: {
                qte: 0,
                j1: 0,
                j2: 0,
                equality: 0
            }
        }
    }

    run(time) {
        for(let i = 0; i < time; i++) {
            this.stats.game.qte++
            const game = {
                winner: null,
                nb: this.storedGame.length + 1,
                history: []
            }
            for(let j = 0; j < 3; j++) {
                this.stats.manche.qte++
                const manche = {
                    nb: j+1,
                    winner: null,
                    j1: null,
                    j2: null
                }
                const [signe1, signe2] = this.getRandomSigne()
                console.log(`Manche ${manche.nb} J1 : ${signe1} vs J2 : ${signe2}`)
                manche.j1 = signe1;
                manche.j2 = signe2;
                const winner = this.getWinner(signe1, signe2);

                if(!winner) {
                    console.log("Égalité");
                    this.stats.manche.equality++
                }else {
                    console.log(`Le joueur ${winner} à gagné la manche`)
                    manche.winner = winner
                    this.stats.manche[`j${winner}`]++
                }
                game.history.push(manche)
            }
            const winValue = game.history.reduce((acc, manche) => {
                if(manche.winner) {
                    acc[`j${manche.winner}`]++
                }
                return acc
            }, {
                j1: 0,
                j2: 0
            })

            if(winValue.j1 === winValue.j2) {
                console.log(`La partie ${game.nb} s'est terminée sur une égalité`)
                this.stats.game.equality++
            } else if(winValue.j1 > winValue.j2) {
                this.stats.game.j1++
                console.log(`La partie ${game.nb} à été gagné par le joueur 1`)
                game.winner = 1
            } else {
                this.stats.game.j2++
                console.log(`La partie ${game.nb} à été gagné par le joueur 2`)
                game.winner = 2
            }
            this.storedGame.push(game)
        }
    }

    getRandomSigne() {
        const signes = [this.rock, this.sheet, this.scissors];
        return [
            signes[Math.floor(Math.random() * signes.length)],
            signes[Math.floor(Math.random() * signes.length)]
        ]
    }

    getWinner(signe1, signe2) {
        if(signe1 === signe2) {
            return null
        }
        switch(signe1) {
            case this.rock:
                return signe2 === this.sheet ? 2 : 1
            case this.sheet:
                return signe2 === this.scissors ? 2 : 1
            case this.scissors:
                return signe2 === this.rock ? 2 : 1
        }
    }

    displayHistory() {
        if(this.storedGame.length === 0) {
            console.log('Aucun historique à afficher.')
            return
        }
        console.group("Historique des parties : \n")
            this.storedGame.forEach((game) => {
                console.log(`La partie ${game.nb} ${game.winner ? `à été remportée par le joueur ${game.winner}` : "La partie s'est soldée sur une égalité"}`)
                console.table(game.history, ['winner', 'j1', 'j2'])
            })
        console.groupEnd()
    }

    displayStats() {
        const {game, manche} = this.stats
        console.group("Les Statistiques de vos parties")
            console.log(`Nombre de partie jouée : ${game.qte}`)
            console.log(`Nombre de partie gagnée par J1 : ${game.j1}`)
            console.log(`Nombre de partie gagnée par J2 : ${game.j2}`)
            console.log(`Nombre de partie nulle : ${game.equality}`)
            console.group("Statistique des manches")
                console.log(`Nombre de manche jouée : ${manche.qte}`)
                console.log(`Nombre de manche gagnée par J1 : ${manche.j1}`)
                console.log(`Nombre de manche gagnée par J2 : ${manche.j2}`)
                console.log(`Nombre de manche nulle : ${manche.equality}`)
            console.groupEnd()
        console.groupEnd()
    }

    reset() {
        this.stats = {
            game: {
                qte: 0,
                j1: 0,
                j2: 0,
                equality: 0
            },
            manche: {
                qte: 0,
                j1: 0,
                j2: 0,
                equality: 0
            }
        }
        this.storedGame = [];

        console.log("L'historique et les statistiques ont été supprimées")
    }
}

export default Chifoumi