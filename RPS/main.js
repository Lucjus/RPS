class Computer {
    constructor(pickedHand) {
        this.pickedHand = pickedHand

    }

    pickHand() {
        const index = Math.floor(Math.random(game.arrayHands.length) * 3)
        ai.pickedHand = index;
    }


}

class Player {
    constructor(pickedHand) {
        this.pickedHand = pickedHand;

    }

    playerPick(e) {
        game.arrayHands.forEach(img => img.style.boxShadow = '')
        e.target.style.boxShadow = '2px 2px 30px  #74f442'
        player.pickedHand = e.target.dataset.key
    }
}

const ai = new Computer();
const player = new Player()

class Game {
    constructor() {
        this.btnStart = document.querySelector('div.results button'),
            this.btnStart.addEventListener('click', ai.pickHand)
        this.btnStart.addEventListener('click', this.check)
        this.hands = document.querySelectorAll('div.hands img')
        this.arrayHands = [...this.hands]
        this.arrayHands.forEach(img => img.addEventListener('click', player.playerPick));
        this.playerSpan = document.querySelector('div.score span.player')
        this.resultText = document.querySelector('div.hands h2')
        this.cmpSpan = document.querySelector('div.score span.computer')
    }
    check() {
        if (player.pickedHand == 0 && ai.pickedHand == 2) {
            game.resultText.innerHTML = 'Congratulations, You won!'
            game.playerSpan.innerHTML++;
        } else if (player.pickedHand == 1 && ai.pickedHand == 0) {
            game.resultText.innerHTML = 'Congratulations, You won!'
            game.playerSpan.innerHTML++
        } else if (player.pickedHand == 2 && ai.pickedHand == 1) {
            game.resultText.innerHTML = 'Congratulations, You won!'
            game.playerSpan.innerHTML++
        } else if (player.pickedHand == ai.pickedHand) {
            game.resultText.innerHTML = 'Draw!'

        } else {
            game.resultText.innerHTML = 'What a shame, You lost!'
            game.cmpSpan.innerHTML++;
        }

    }
}

const game = new Game();