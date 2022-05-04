const body = document.querySelector('body')
const okBtn = document.querySelector('#ok-btn')
const rules = document.querySelector('.rules')
const ruleBtn = document.querySelector('#rulesBtn')
const playAgain = document.querySelector('#playAgain')
const result = document.querySelector('#result')
const imgPlayerOne = document.querySelector('#playerOne')
const imgPlayerTwo = document.querySelector('#playerTwo')
const playerOnePoint = document.querySelector('#playerOnePoint')
const playerTwoPoint = document.querySelector('#playerTwoPoint')
const refresh = document.querySelector('#refresh')
const finalBtn = document.querySelector('#final-btn')
const winnerBoard = document.querySelector('.final')
const winnerText = document.querySelector('#final-result')


function rulesToggle(){
    rules.classList.toggle('open')
}
ruleBtn.addEventListener('click', rulesToggle)
okBtn.addEventListener('click', rulesToggle)
playAgain.addEventListener('click', cardCall )
refresh.addEventListener('click', refreshCall)
finalBtn.addEventListener('click', finalBtnOk)


let countPlay = 1
let count = 1

    let deck = ''
    let deck_id = ''
    let deck_Val = localStorage.getItem('deck')
    function cardCall(){
        fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data =>{
        deck_id = data.deck_id
        localStorage.setItem('deck', deck_id)
        drawTwo()
    })
    .catch(err => console.log(err))
    }
    
    let countArrayOne = []
    let countArrayTwo = []

    function drawTwo(){
        fetch(`https://www.deckofcardsapi.com/api/deck/${deck_Val}/draw/?count=2`)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            imgPlayerOne.src = data.cards[0].image
            imgPlayerTwo.src = data.cards[1].image
            console.log(data.cards.value)     
            let  player1Val = condition(data.cards[0].value)
            let player2Val = condition(data.cards[1].value)
            if (data.remaining === 0){
                arrayCount()
                winnerBoard.classList.toggle('open')
            }
            if (player1Val > player2Val){
                result.textContent = 'PLAYER ONE WINS'
                countVal = count++
                countArrayOne.push(countVal)
                console.log(countArrayOne)
                playerOnePoint.textContent = countVal
            }else if (player2Val > player1Val){
                result.textContent = 'PLAYER TWO WINS'
                countVal = countPlay++
                countArrayTwo.push(countVal)
                console.log(countArrayTwo)
                playerTwoPoint.textContent = countVal
            }else{
                result.textContent = 'TIE'
            }
        })
    }



function condition(val){
    if (val === 'ACE'){
        return 14
    }else if(val === 'KING'){
        return 13
    }else if(val === 'QUEEN'){
        return 12
    }else if(val === 'JACK'){
        return 11
    }else{
        return Number(val)
    }
}

function arrayCount(){
    if(countArrayOne.length > countArrayTwo.length){
        winnerText.textContent = `PLAYER 1 WIN BY ${countArrayOne.length} POINTS` 
    }else if (countArrayOne == countArrayTwo){
        winnerText.textContent = "IT'S A TIE"
    }else{
        winnerText.textContent = `PLAYER 2 WIN BY ${countArrayTwo.length} POINTS`
    }
}
function refreshCall(){
    location.reload()
}

function finalBtnOk(){
    winnerBoard.classList.toggle('open')
    location.reload()
}