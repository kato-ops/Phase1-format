const inputTime = document.getElementById("inputTime");
const setTime = document.getElementById("setTime");
const startTimer = document.getElementById("startTimer");
const stopTimer = document.getElementById("stopTimer");
const nowTime = document.getElementById("nowTime");

const timeParse = (seconds) => {
    //これだと日単位以上は表示できない
    // const date = new Date(0);
    // date.setSeconds(seconds);
    // return `${date.getUTCHours()}時${date.getUTCMinutes()}分${date.getUTCSeconds()}秒`;
    const parseHours = Math.floor(seconds / 3600);
    const parseMinutes = Math.floor((seconds % 3600) / 60);
    const parseSeconds = seconds % 60;
    return `${parseHours}時${parseMinutes}分${parseSeconds}秒`;
};

let sec = 10;
inputTime.value = sec;
nowTime.textContent = `残り${timeParse(sec)}`;

let timer;
let startSec = sec;

setTime.addEventListener("click", () => {
    sec = parseInt(inputTime.value);
    if (sec < 0 || Number.isInteger(sec) === false) {
        sec = 0;
    }
    startSec = sec;
    const date = new Date(sec * 1000);
    nowTime.textContent = `残り${timeParse(sec)}：セット完了です`;
});

const countDown = () => {
    if (sec > 0) {
        sec--;
        nowTime.textContent = `残り${timeParse(sec)}`;
    }
    else {
        sec = startSec;
        nowTime.textContent = `残り${timeParse(sec)}`;
        clearInterval(timer);
        window.alert("終了");
    }
};

startTimer.addEventListener("click", () => {
    clearInterval(timer);
    timer = setInterval(countDown, 1000);
});

stopTimer.addEventListener("click", () => {
    clearInterval(timer);
    nowTime.textContent = `残り${timeParse(sec)}：ストップしました`;
});

