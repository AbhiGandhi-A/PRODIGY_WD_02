let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let intervalId;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(Math.floor(milliseconds / 10)).padStart(2, '0')}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    const elapsed = elapsedTime + (currentTime - startTime);
    display.textContent = formatTime(elapsed);
}

function startStop() {
    if (isRunning) {
        clearInterval(intervalId);
        elapsedTime += Date.now() - startTime;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now();
        intervalId = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(intervalId);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
