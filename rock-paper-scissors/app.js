class Computer {
    constructor(pickedHand) {
        this.pickedHand = pickedHand
    }

    pickHand() {
        const index = Math.floor(Math.random(game.arrayHands.length) * 5)
        this.pickedHand = index;
    }


}

class Player {
    constructor(pickedHand, commandCover) {
        this.pickedHand = pickedHand;
        this.commandCover = commandCover
    }
    playerPick(e) {
        game.animation()
        ai.pickHand()
        this.pickedHand = e.target.dataset.id
        this.commandCover = e.target
        this.commandCover.parentElement.style.display = 'block'
        this.commandCover.parentElement.classList.add('player-circle')
        this.commandCover.parentElement.style.top = 50 + '%'
        this.commandCover.parentElement.style.left = 10 + '%'
        this.cmpAnimationDiv = document.createElement('div')
        this.cmpAnimationDiv.classList.add('computer-circle')
        game.actionSection.appendChild(this.cmpAnimationDiv)
    }
}

const ai = new Computer();
const player = new Player()

class Game {
    constructor() {
        this.eventFired = false;
        this.cmp = document.querySelector('.cmp')
        this.computerSvg = document.querySelector('.computer-svg')
        this.text = document.querySelector('.text-result')
        this.playBtn = document.querySelector('.play-again')
        this.result = document.querySelector('.number')
        this.closeIcon = document.querySelector('.close-icon')
        this.modal = document.querySelector('.modal')
        this.rulesBox = document.querySelector('.rules-box')
        this.actionButton = document.querySelector('.rules-btn')
        this.actionSection = document.querySelector('#action-section')
        this.duelCommandsNode = document.querySelectorAll('.action-section-duel-commands')
        this.picksText = document.querySelectorAll('h1')
        this.hands = document.querySelectorAll('.cover-command')
        this.closeIcon.addEventListener('click', this.closeRulesBox)
        this.actionButton.addEventListener('click', this.showRulesBox)
        this.playBtn.addEventListener('click', this.reset)
        this.duelCommandsArray = [...this.duelCommandsNode]
        this.arrayHands = [...this.hands]
        this.arrayHands.forEach(hand => hand.addEventListener('click', player.playerPick))
        this.arrayHands.forEach(hand => hand.addEventListener('click', this.check))
        this.winDiv = document.createElement('div')
    }
    check() {
        let d = (5 + ai.pickedHand - this.pickedHand) % 5
        setTimeout(function () {
            if (!game.eventFired) {
                game.text.classList.add('display-text')
                game.playBtn.style.display = 'block'
                game.cmp.style.display = 'block'
                game.cmp.style.left = 64 + "%"
                if (ai.pickedHand == 1) {
                    game.cmp.classList.add('paper-command')
                    game.computerSvg.classList.add('paper-svg')
                } else if (ai.pickedHand == 0) {
                    game.cmp.classList.add('scissors-command')
                    game.computerSvg.classList.add('scissors-svg')
                } else if (ai.pickedHand == 2) {
                    game.cmp.classList.add('rock-command')
                    game.computerSvg.classList.add('rock-svg')
                } else if (ai.pickedHand == 3) {
                    game.cmp.classList.add('lizard-command')
                    game.computerSvg.classList.add('lizard-svg')
                } else if (ai.pickedHand == 4) {
                    game.cmp.classList.add('spock-command')
                    game.computerSvg.classList.add('spock-svg')
                }

                if (d == 1 || d == 3) {
                    game.text.textContent = 'YOU WIN'
                    game.winDiv.classList.add('player-win')
                    game.actionSection.appendChild(game.winDiv)
                    game.result.textContent++
                } else if (d == 2 || d == 4) {
                    game.winDiv.classList.add('computer-win')
                    game.actionSection.appendChild(game.winDiv)
                    game.text.textContent = 'YOU LOSE'
                } else if (d == 0) {
                    game.text.textContent = 'TIE'
                }

            }
        }.bind(this), 2000);


    }

    animation() {
        game.actionSection.style.backgroundImage = 'none'
        game.duelCommandsArray.forEach(hand => hand.style.display = 'none')
        game.arrayHands.forEach(hand => hand.style.display = 'none')
        game.picksText.forEach(text => text.style.display = 'block')
    }
    reset() {
        game.text.textContent = ''
        game.actionSection.style.backgroundImage = 'block'
        game.cmp.style.display = 'none';
        game.winDiv.style.display = 'none'
        game.duelCommandsArray.forEach(hand => hand.style.display = 'block')
        game.arrayHands.forEach(hand => hand.style.display = 'block')
        game.picksText.forEach(text => text.style.display = 'none')
    }

    showRulesBox() {
        game.rulesBox.style.display = 'flex'
        game.modal.style.display = 'block'
    }

    closeRulesBox() {
        game.rulesBox.style.display = 'none'
        game.modal.style.display = 'none'
    }
}

const game = new Game();