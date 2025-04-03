// DOM Elements
const homePage = document.getElementById('home');
const gamePage = document.getElementById('game');
const endPage = document.getElementById('end');
const highscoresPage = document.getElementById('highscores');

const startBtn = document.getElementById('start-btn');
const highscoresBtn = document.getElementById('highscores-btn');
const questionElement = document.getElementById('question');
const choiceElements = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterElement = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const usernameElement = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const goHomeBtn = document.getElementById('go-home-btn');
const highscoresList = document.getElementById('highscores-list');
const returnHomeBtn = document.getElementById('return-home-btn');

// Game variables
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// Event Listeners
startBtn.addEventListener('click', startGame);
highscoresBtn.addEventListener('click', showHighscores);
choiceElements.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        // Special case for the Rojox question (question 6) which has two correct answers
        let classToApply;
        if (currentQuestion.question.includes("Rojox") && 
            (selectedAnswer == 2 || selectedAnswer == 4)) {
            classToApply = 'correct';
            incrementScore(CORRECT_BONUS);
        } else {
            classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
            
            if (classToApply === 'correct') {
                incrementScore(CORRECT_BONUS);
            }
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

usernameElement.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !usernameElement.value;
});

saveScoreBtn.addEventListener('click', saveHighScore);
playAgainBtn.addEventListener('click', startGame);
goHomeBtn.addEventListener('click', goHome);
returnHomeBtn.addEventListener('click', goHome);

// Functions
function startGame() {
    homePage.classList.add('hidden');
    highscoresPage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    
    scoreElement.innerText = score;
    getNewQuestion();
}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // Save score to local storage
        localStorage.setItem('mostRecentScore', score);
        
        // Go to end page
        gamePage.classList.add('hidden');
        endPage.classList.remove('hidden');
        finalScoreElement.innerText = score;
        return;
    }
    
    questionCounter++;
    questionCounterElement.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionElement.innerText = currentQuestion.question;
    
    choiceElements.forEach(choice => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion['choice' + number];
    });
    
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

function incrementScore(num) {
    score += num;
    scoreElement.innerText = score;
}

function saveHighScore(e) {
    e.preventDefault();
    
    const score = {
        score: parseInt(finalScoreElement.innerText),
        name: usernameElement.value
    };
    
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5); // Keep only top 5 scores
    
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    goHome();
}

function showHighscores() {
    homePage.classList.add('hidden');
    endPage.classList.add('hidden');
    gamePage.classList.add('hidden');
    highscoresPage.classList.remove('hidden');
    
    // Clear the list
    highscoresList.innerHTML = '';
    
    // Get high scores from local storage
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    // Create list items for each high score
    highScores.forEach(score => {
        const li = document.createElement('li');
        li.className = 'high-score';
        li.innerHTML = `<span>${score.name}</span><span>${score.score}</span>`;
        highscoresList.appendChild(li);
    });
}

function goHome() {
    gamePage.classList.add('hidden');
    endPage.classList.add('hidden');
    highscoresPage.classList.add('hidden');
    homePage.classList.remove('hidden');
}

// Load questions from questions.js when the page loads
document.addEventListener('DOMContentLoaded', () => {
    questions = [...fmsQuestions];
}); 