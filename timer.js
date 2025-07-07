let timerInterval;
let seconds = 0;
let isRunning = false;
let logCounter = 1;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const saveBtn = document.getElementById("saveBtn");

function updateDisplay() {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${secs}`;
}

startBtn.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
        saveBtn.disabled = false;
    }
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
    seconds = 0;
    updateDisplay();
    saveBtn.disabled = true;
});

saveBtn.addEventListener("click", () => {
    const table = document.getElementById("logTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    const cellNo = newRow.insertCell(0);
    const cellTime = newRow.insertCell(1);

    cellNo.textContent = logCounter++;
    cellTime.textContent = timerDisplay.textContent;
});
