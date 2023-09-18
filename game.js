const question = document.querySelector("#question")
const choices = Array.from(document.querySelectorAll(".choice-text"))
const progressText = document.querySelector("#progressText")
const scoreText = document.querySelector("#score")
const progressBarFull = document.querySelector("#progressBarFull")
// console.log(progressBarFull)
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0
let questionCounter = 0
let availableQuestions = []



let questions = [
    {
        question: 'Which Ethiopian city is known as the "New Flower"?',
        choice1:' Addis Ababa',
        choice2:'Bahir Dar',
        choice3:'Axum',
        choice4:'Harar',
        answer:1
    },
    {
        question: "What is Ethiopia's iconic rock-hewn church famous for its monolithic architecture?",
        choice1:'Lalibela Church',
        choice2:'Aksum Obelisk',
        choice3:'Gondar Castle',
        choice4:'Simien Mountains',
        answer:1
    },
    {
        question: 'Which Ethiopian landmark is often called the "Roof of Africa"?',
        choice1:' Lake Tana',
        choice2:'Simien Mountains',
        choice3:'Danakil Depression',
        choice4:'Lalibela Rock Churches',
        answer:2
    },
    {
        question: 'In which region of Ethiopia can you find the ancient archaeological site of Axum?',
        choice1:' Tigray',
        choice2:'Amhara',
        choice3:'Oromia',
        choice4:'SNNP',
        answer:1
    },
    {
        question: 'What Ethiopian natural wonder is famous for its colorful sulfur springs and salt flats?',
        choice1:'  Lake Tana',
        choice2:'Simien Mountains',
        choice3:'Danakil Depression',
        choice4:'Bale Mountains',
        answer:4
    }
]

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 5;    
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion();
}
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore",score)
        return window.location.assign('/end.html')
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter /MAX_QUESTIONS) * 100}%`
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    });
    availableQuestions.splice(questionIndex,1)
    acceptingAnswers = true;

}
choices.forEach(choice => {
    choice.addEventListener('click',e => {
        if (!acceptingAnswers) return 
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer? 'correct': 'incorrect'
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
        },1000)
    })
})

incrementScore = num => {
    score+=num;
    scoreText.innerText = score;
}

startGame()