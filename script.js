const CONTAINER = document.querySelector('.container')
const CONTAINER2 = document.querySelector('.container2')
const COMPUTER = document.querySelector('#comp')
const PLAYER = document.querySelector('#plr')
const WIN = document.querySelector('#h2')
const STAKE = document.querySelector('#stake')
const BTN = document.querySelector('#btn')
arrValue = []
let ace = []
let all = []

const SUITS = ["♠", "♣", "♥", "♦"]

const VALUES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
]

function creat(x) {
    for (let i = 0; i < 5; i++) {
        let random = Math.floor(Math.random() * VALUES.length)
        let ranSuits = Math.floor(Math.random() * SUITS.length)
        const div = document.createElement('div')
        div.classList.add('card')
        if (SUITS[ranSuits] == "♥" || SUITS[ranSuits] == "♦") {
            div.classList.add('red')
        }
        div.innerHTML = `${SUITS[ranSuits]}<div class="topNr"data-value="${VALUES[random]}" >
        <p>${VALUES[random]}</p>
        <p>${SUITS[ranSuits]}</p>
    </div>
    <div class="bottomNr">
        <p>${VALUES[random]}</p>
        <p>${SUITS[ranSuits]}</p>
    </div>`
        x.append(div)
    }
}

creat(CONTAINER)
creat(CONTAINER2)

function reveal() {
    let sub = readStake()

    if (sub === 0) {
        BTN.removeEventListener('click', reveal)
    }
    if (sub > Number(0)) {
        let element = document.querySelectorAll('.card')

        element.forEach(el => {
            const style = document.createElement("style");
            style.innerHTML = ".card::before {z-index:-9;}";
            el.before(style)
        })

        oblicz(result, COMPUTER)
        oblicz(result1, PLAYER)
        whoWon()
        setTimeout("window.location.reload()", 4000);
    }
}

function exchange(element, index) {

    if (element === 'A') {
        arrValue.splice(index, 1)
        ace.push('100')
    }
    if (element === 'K') {
        arrValue.splice(index, 1)
        ace.push('50')
    }
    if (element === 'Q') {
        arrValue.splice(index, 1)
        ace.push('40')
    }
    if (element === 'J') {
        arrValue.splice(index, 1)
        ace.push('30')
    }
    return element
}

let result = document.querySelectorAll('.container>.card>.topNr')
let result1 = document.querySelectorAll('.container2>.card>.topNr')

function oblicz(result, COMPUTER) {
    result.forEach(wn => {
        arrValue.push(wn.dataset.value)
        arrValue.filter(exchange)
        all = arrValue.concat(ace)
        console.log(all);
        let res = all.reduce((acu, value) => (Number(acu) + Number(value)))
        COMPUTER.innerHTML = res
    })
    arrValue = []
    ace = []
    all = []
}

function whoWon() {
    let comp = COMPUTER.innerHTML
    let play = PLAYER.innerHTML

    if (Number(comp) > Number(play)) {
        WIN.innerHTML = `COMPUTER WIN! ${readStake(rate)}€`
    } else {
        WIN.innerHTML = `PLAYER WIN!' ${readStake(rate)}€`
    }
}
let rate = null

function readStake(rate) {
    rate = STAKE.value
    //    STAKE.value=0
    return rate
}
BTN.addEventListener('click', reveal)