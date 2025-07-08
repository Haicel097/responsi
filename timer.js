let timerInterval;
let seconds = 0;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const hiddenTime = document.getElementById("hiddenTime");
const statusMessage = document.getElementById("statusMessage"); 

// Fungsi untuk memperbarui tampilan timer (MM:SS)
function updateDisplay() {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${secs}`;
}

// Fungsi yang dipanggil saat formulir disubmit (untuk menyimpan waktu)
function prepareTime() {
    hiddenTime.value = timerDisplay.textContent; // Mengambil teks dari tampilan timer dan memasukkannya ke input tersembunyi
    return true; // Mengizinkan pengiriman formulir
}

// untuk tombol Start
startBtn.addEventListener("click", () => {
    if (!isRunning) { // Hanya mulai jika timer belum berjalan
        isRunning = true;
        timerInterval = setInterval(() => { // Mengatur interval untuk menambah detik setiap 1000ms (1 detik)
            seconds++;
            updateDisplay(); // Perbarui tampilan
        }, 1000);
    }
});

// untuk tombol Stop
stopBtn.addEventListener("click", () => {
    clearInterval(timerInterval); // Menghentikan interval
    isRunning = false; // Mengatur status menjadi tidak berjalan
});

//  untuk tombol Reset
resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false; // Mengatur status menjadi tidak berjalan
    seconds = 0; // Mengatur detik kembali ke 0
    updateDisplay(); 
});
