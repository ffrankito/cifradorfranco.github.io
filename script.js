const buttons = document.querySelectorAll('.button');
const startButton = document.getElementById('startButton');
const darkModeButton = document.getElementById('darkModeButton');
const scoreValue = document.getElementById('scoreValue');
const timerValue = document.getElementById('timerValue');
let sequence = [];
let playerSequence = [];
let score = 0;
let timer;
let darkMode = false;

startButton.addEventListener('click', startGame);
darkModeButton.addEventListener('click', toggleDarkMode);

buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
        if (timer) {
            clearTimeout(timer);
        }
        button.style.opacity = '0.1';
        playerSequence.push(button.id);
        checkSequence();
    });
    
    button.addEventListener('mouseup', () => {
        button.style.opacity = '0.8';
    });
});

function startGame() {
    sequence = [];
    playerSequence = [];
    score = 0;
    scoreValue.textContent = score;
    generateSequence();
    playSequence();
    startTimer();
    startButton.disabled = true;
}

function generateSequence() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        const buttonId = sequence[i];
        const button = document.getElementById(buttonId);
        button.style.opacity = '1';
        setTimeout(() => {
            button.style.opacity = '0.8';
            i++;
            if (i === sequence.length) {
                clearInterval(interval);
            }
        }, 500);
    }, 1000);
}

function checkSequence() {
    if (playerSequence.length === sequence.length) {
        if (playerSequence.every((value, index) => value === sequence[index])) {
            score++;
            scoreValue.textContent = score;
            playerSequence = [];
            generateSequence();
            playSequence();
            resetTimer();
        } else {
            gameOver();
        }
    }
}

function startTimer() {
    let timeLeft = 10;
    timerValue.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timerValue.textContent = timeLeft;
        
        if (timeLeft === 0) {
            gameOver();
        }
    }, 1000);
}

function resetTimer() {
    clearTimeout(timer);
    startTimer();
}

function gameOver() {
    clearTimeout(timer);
    alert('¡Has perdido! Puntaje final: ' + score);
    startButton.disabled = false;
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    darkMode = !darkMode;
}

