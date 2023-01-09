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
        question: 'How many legs do cats have?',
        choice1: '2',
        choice2: '4',
        choice3: '5',
        choice4: '1',
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
        question: 'Whats the largest state in the US?',
        choice1: 'Texas',
        choice2: 'Flordia',
        choice3: 'Alaska',
        choice4: 'Hawaii',
        answer: 3,

    },
    {
        question: 'How many states are in the US?',
        choice1: '45',
        choice2: '50',
        choice3: '40',
        choice4: '51',
        answer: 2,

    },
    {
        question: 'What city in the US has the largest building?',
        choice1: 'Miami',
        choice2: 'Chicago',
        choice3: 'New York',
        choice4: 'Seattle',
        answer: 3,

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

        return window.location.assign("end.html")
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
