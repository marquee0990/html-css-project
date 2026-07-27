// Elementos DOM
const startScreen = document.getElementById("start-screen")
const quizScreen = document.getElementById("quiz-screen")
const resultScreen = document.getElementById("result-screen")
const startButton = document.getElementById("start-btn")
const questionText = document.getElementById("question-text")
const answersContainer = document.getElementById("answers-container")
const currentQuestionsSpan = document.getElementById("current-question")
const totalQuestionsSpan = document.getElementById("total-questions")
const scoreSpan = document.getElementById("score")
const finalScoreSpan = document.getElementById("final-score")
const maxScoreSpan = document.getElementById("max-score")
const resultMessage = document.getElementById("result-message")
const restartButton = document.getElementById("restart-btn")
const progressBar = document.getElementById("progress")

const quizQuestions = [
    {
        question: "Qual a capital da Bélgica?",
        answers: [
            {text: "Londres", correct: false},
            {text: "Bruxelas", correct: true},
            {text: "Bergamo", correct: false},
            {text: "Brasília", correct: false},
        ],
    },
    {
        question: "Qual o primeiro time de Lionel Messi",
        answers: [
            {text: "PSG", correct: false},
            {text: "Barcelona", correct: true},
            {text: "Inter Miami", correct: false},
            {text: "Seleção Argentina", correct: false},
        ],
    },
    {
        question: "O Darth Vader é o que do Obi-Wan?",
        answers: [
            {text: "Mestre", correct: false},
            {text: "Irmão", correct: false},
            {text: "Rival", correct: true},
            {text: "Aprendiz", correct: false},
        ],
    },
    {
        question: "Qual a torcida com menos QI do Brasil?",
        answers: [
            {text: "Palmeiras", correct: false},
            {text: "Vasco", correct: false},
            {text: "Corinthians", correct: false},
            {text: "Flamengo", correct: true},
        ],
    },
    {
        question: "Qual é o maior deserto do mundo?",
        answers: [
            {text: "Saara", correct: false},
            {text: "Antártica", correct: true},
            {text: "Atacama", correct: false},
            {text: "Outback", correct: false},
        ],
    },
]

// VARIÁVEIS

let currentQuestionIndex = 0
let score = 0
let answersDisabled = false

totalQuestionsSpan.textContent = quizQuestions.length
maxScoreSpan.textContent = quizQuestions.length

// LISTENERS

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz(){
    //reset vars
    currentQuestionIndex = 0
    score = 0
    scoreSpan.textContent = 0

    startScreen.classList.remove("active")
    quizScreen.classList.add("active")

    showQuestion()
}

function showQuestion(){
    //reset estado

    answersDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionsSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")

        button.dataset.correct = answer.correct

        button.addEventListener("click", selectAnswer)
        
        answersContainer.appendChild(button)
    })
}

function selectAnswer(event){
    if(answersDisabled) return

    answersDisabled = true

    const selectedButton = event.target
    const isCorrect = selectedButton.dataset.correct === "true"

    Array.from(answersContainer.children).forEach((button) => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }else{
            button.classList.add("incorrect")
        }
    })

    if(isCorrect){
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        }else{
            showResults()
        }
    }, 1000)
}

function showResults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score

    const percentage = (score/quizQuestions.length) * 100

    if(percentage === 100) {
        resultMessage.textContent = "Perfeito! Você é um gênio!";
    }else if (percentage >= 80){
        resultMessage.textContent = "Bom trabalho! Você sabe muito!";
    }else if (percentage >= 60){
        resultMessage.textContent = "Mandou bem! Continue aprendendo";
    }else if (percentage >= 40){
        resultMessage.textContent = "Nada mal! Tente melhorar!";
    }else{
        resultMessage.textContent = "Continue estudando! Você vai melhorar!";
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active")

    startQuiz()
}