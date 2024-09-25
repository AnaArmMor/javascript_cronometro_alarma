/* se crean las constantes de donde javascript tomara las id*/

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const timeLimitInput = document.getElementById('timeLimit');

/* variables a utitilizar */

let startTime;
let elapsedTime = 0;
let timerInterval;
let timeLimit;

/* declaracion para inicializar las constantes*/

const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const updateTimer = () => {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);

    if (elapsedTime >= timeLimit * 1000) {
        timerDisplay.classList.add('alarm');
        clearInterval(timerInterval);
    }
};

const startTimer = () => {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timeLimit = parseInt(timeLimitInput.value);
};

const stopTimer = () => {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
};

const resetTimer = () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timerDisplay.textContent = '00:00';
    timerDisplay.classList.remove('alarm');
    startBtn.disabled = false;
    stopBtn.disabled = true;
};

/* llamado al evento de escucha adeventlistener*/

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

/*-- boton de reset e inicialización----*/
resetTimer();