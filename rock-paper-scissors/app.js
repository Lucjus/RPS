class Computer {
    constructor(pickedHand) {
        this.pickedHand = pickedHand
    }

    pickHand() {
        const index = Math.floor(Math.random(game.arrayHands.length) * 1)
        this.pickedHand = index;
    }


}

class Player {
    constructor(pickedHand, kurwas) {
        this.pickedHand = pickedHand;
        this.kurwas = kurwas;
    }

    playerPick(e) {
        this.pickedHand = e.target.dataset.id
        this.kurwas = e.target

        ai.pickHand()
        game.animation()
        this.kurwas.parentElement.style.display = 'block'
        this.kurwas.parentElement.classList.add('player-circle')
        this.kurwas.parentElement.style.top = 50 + '%'
        this.kurwas.parentElement.style.left = 10 + '%'
        this.divus = document.createElement('div')
        this.divus.classList.add('computer-circle')
        game.actionSection.appendChild(this.divus)
        console.log(this.kurwas.parentElement)

    }
}

const ai = new Computer();
const player = new Player()

class Game {
    constructor() {
        this.eventFired = false;
        this.divek = document.querySelectorAll('.action-section-duel-commands')
        this.divekk = [...this.divek]
        this.actionSection = document.querySelector('#action-section')
        this.result = document.querySelector('.okej')
        this.hands = document.querySelectorAll('.kurwa')
        this.arrayHands = [...this.hands]
        this.arrayHands.forEach(hand => hand.addEventListener('click', player.playerPick))
        this.arrayHands.forEach(hand => hand.addEventListener('click', this.check))
        this.picksText = document.querySelectorAll('h1')

    }
    check() {
        setTimeout(function () {
            if (!game.eventFired) {
                let winDiv = document.createElement('div')
                let fiut = game.divek[ai.pickedHand];
                fiut.style.display = 'block'
                fiut.style.top = 50 + "%"
                fiut.style.left = 64 + "%"
                fiut.style.transform = "translateY(-50%)"

                console.log(fiut)
                if (this.pickedHand == 0 && ai.pickedHand == 1) {
                    console.log('Miałeś nożyce, a komp papier, wygrałeś')
                    winDiv.classList.add('wygrana')
                    game.actionSection.appendChild(winDiv)
                    game.result.textContent++
                } else if (this.pickedHand == 0 && ai.pickedHand == 3) {
                    game.result.textContent++
                    console.log('Miałeś nożyce, a komp lizarda, wygrałeś ')
                } else if (this.pickedHand == 1 && ai.pickedHand == 2) {
                    game.result.textContent++
                    console.log('Miałeś papier, a komp kamień, wygrałeś ')
                } else if (this.pickedHand == 1 && ai.pickedHand == 4) {
                    game.result.textContent++
                    console.log('Miałeś papier, a komp spocka, wygrałeś ')
                } else if (this.pickedHand == 2 && ai.pickedHand == 0) {
                    console.log('Miałeś kamień, a komp nożyce, wygrałeś ')
                    game.result.textContent++
                } else if (this.pickedHand == 2 && ai.pickedHand == 3) {
                    console.log('Miałeś kamień, a komp lizarda, wygrałeś ')
                    game.result.textContent++
                } else if (this.pickedHand == 3 && ai.pickedHand == 4) {
                    console.log('Miałeś lizarda, a komp spocka, wygrałeś ')
                    game.result.textContent++
                } else if (this.pickedHand == 3 && ai.pickedHand == 1) {
                    console.log('Miałeś lizarda, a komp papier, wygrałeś ')
                    game.result.textContent++
                } else if (this.pickedHand == 4 && ai.pickedHand == 0) {
                    console.log('Miałeś spocka, a komp nożyce, wygrałeś ')
                    game.result.textContent++
                } else if (this.pickedHand == 4 && ai.pickedHand == 1) {
                    console.log('Miałeś spocka, a komp kamień, wygrałeś ')
                    game.result.textContent++
                } else if (this.pickedHand == ai.pickedHand) {
                    console.log('remis ')

                }
            }
        }.bind(this), 2000);


    }



    animation() {
        this.divekk.forEach(hand => hand.style.display = 'none')
        this.actionSection.style.backgroundImage = 'none'
        this.arrayHands.forEach(hand => hand.style.display = 'none')
        this.picksText.forEach(text => text.style.display = 'block')
    }


}
const game = new Game();