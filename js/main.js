const images = ["4_frog.png",
    "10_tiger.png",
    "8_panda.png",
    "2_squirrel.png",
    "9_chick.png",
    "1_pig.png",
    "11_penguin.png",
    "5_fox.png",
    "6_bear.png",
    "3_rabbit.png",
    "12_racoon.png",
    "7_monkey.png"
]
const backImage = "img/back.png"
const template = document.querySelector('#card')
let flippedIds = []
let flippedCards = []
let correctIds = []
let object = {}
let incorrectGuesses = 0


function gameFinished() {
    if (correctIds.length == 24) {
        alert(`Game finished\nNumber of incorrect guesses: ${incorrectGuesses}`)
            // localStorage.setItem("highscore", incorrectGuesses)
    }
}

function unFlip() {
    setTimeout(function() {
        flippedCards.forEach(card => card.src = backImage)
        flippedIds = []
        flippedCards = []
    }, 200);
}

function updateGuesses() {
    incorrectGuesses++
    elem = document.querySelector(".guesses")
    elem.innerHTML = `Incorrect guesses: ${incorrectGuesses}`
}

function flip(elem) {
    flippedIds.push(elem.id)
    flippedCards.push(elem)
    elem.src = `img/${object[elem.id]}`
}

function check() {
    if (object[flippedIds[0]] == object[flippedIds[1]]) {
        correctIds = correctIds.concat(flippedIds)
        flippedIds = []
        flippedCards = []
        gameFinished()
    } else {
        updateGuesses()
        unFlip()
    }
}

function click(e) {
    let elem = e.target
    let id = elem.id
    if (!correctIds.includes(id)) {
        if (flippedIds.length == 1) {
            if (flippedIds[0] != id) {
                flip(elem)
                check()
            }
        } else {
            flip(elem)
        }
    }
}

function renderCards(cards) {
    cards.forEach(card => document.body.appendChild(card))
}

function createCard(image) {
    let img = template.content.cloneNode(true).querySelector("img")
    img.src = `${backImage}`
    img.id = uuidv4()
    object[img.id] = image
    img.addEventListener("click", click)
    return img
}

function genCards() {
    var sortedCards = []
    images.forEach(image => sortedCards = sortedCards.concat(createCard(image)))
    images.forEach(image => sortedCards = sortedCards.concat(createCard(image)))
    let cards = sortedCards.sort(() => Math.random() - 0.5)
    renderCards(cards)
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
genCards()