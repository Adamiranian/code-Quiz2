const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionCounter = 0 
let availableQuestions = []

let questions = [
    {
        question: 'what is 2+2',
        choice1: '2',
        choice2: '4',
        choice3: '5',
        choice4: '19',
        answer: 2,

    },
    {
        question: 'what is a dime worth?',
        choice1: '10 cents',
        choice2: '25 cents',
        choice3: '50 cents',
        choice4: '100 cents',
        answer: 1,

    },
    {
        question: 'What is 5+5',
        choice1: '19',
        choice2: '5',
        choice3: '10',
        choice4: '20',
        answer: 3,

    },
    {
        question: 'what is 2+8',
        choice1: '2',
        choice2: '4',
        choice3: '5',
        choice4: '10',
        answer: 4,

    },
    {
        question: 'what is 2+9',
        choice1: '11',
        choice2: '10',
        choice3: '9',
        choice4: '19',
        answer: 2,

    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () =>{
    questionCounter = 0
    score = 0 
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign("/end.html")
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]

    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)



        
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
