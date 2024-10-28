//時間確認用
const now_time = document.getElementById("now_time");

//通常問題
const startTimer = document.getElementById("startTimer");
const confirmTime = document.getElementById("confirmTime");

confirmTime.disabled = true;

//自作部分
// startTimer.addEventListener("click", () => {
//     let count = 0;
//     startTimer.disabled = true;
//     confirmTime.disabled = false;

//     const timer = setInterval(() => {
//         count++;
//         now_time.textContent = count + "秒";

//         if (count >= 40) {
//             clearInterval(timer);
//             window.alert("40秒経過しました");
//             confirmTime.removeEventListener("click", confirm);
//             startTimer.disabled = false;
//             confirmTime.disabled = true;
//         }
//     }, 1000);

//     const confirm = () => {
//         clearInterval(timer);
//         if (count === 20) {
//             window.alert("成功です");
//         }
//         else if (count < 20) {
//             window.alert(`${count}秒です`);
//         }
//         else {
//             window.alert(`${count}秒です`);
//         }
//         confirmTime.removeEventListener("click", confirm);
//         startTimer.disabled = false;
//         confirmTime.disabled = true;
//     };
//     confirmTime.addEventListener("click", confirm);
// });

//解答確認後に改修
let timer;
let count = 0;

const countUp = () => {
    count++;
    //now_time.textContent = count + "秒";

    if (count >= 40) {
        clearInterval(timer);
        window.alert("40秒経過しました");
        startTimer.disabled = false;
        confirmTime.disabled = true;
        count = 0;
    }
};

startTimer.addEventListener("click", () => {
    clearInterval(timer);

    count = 0;
    startTimer.disabled = true;
    confirmTime.disabled = false;

    timer = setInterval(countUp, 1000);
});

confirmTime.addEventListener("click", () => {
    clearInterval(timer);
    if (count === 20) {
        window.alert("成功です");
    }
    else if (count < 20) {
        window.alert(`${count}秒です`);
    }
    else {
        window.alert(`${count}秒です`);
    }
    startTimer.disabled = false;
    confirmTime.disabled = true;
    count = 0;
});





//チャレンジ問題
const startTimer2 = document.getElementById("startTimer2");
const confirmTime2 = document.getElementById("confirmTime2");


confirmTime2.disabled = true;
let timer2;
let count2 = 0;

let startTime = 0;

const countUp2 = () => {
    count2 = Math.floor((Date.now() - startTime) / 1000)
    //now_time.textContent = count2 + "秒";

    if (count2 >= 40) {
        clearInterval(timer2);
        window.alert("40秒経過しました");
        startTimer2.disabled = false;
        confirmTime2.disabled = true;
        count2 = 0;
    }
};

startTimer2.addEventListener("click", () => {
    clearInterval(timer2);

    count2 = 0;
    startTimer2.disabled = true;
    confirmTime2.disabled = false;

    startTime = Date.now();
    timer2 = setInterval(countUp2, 1000);
});

confirmTime2.addEventListener("click", () => {
    clearInterval(timer2);
    if (count2 === 20) {
        window.alert("成功です");
    }
    else if (count2 < 20) {
        window.alert(`${count2}秒です`);
    }
    else {
        window.alert(`${count2}秒です`);
    }
    startTimer2.disabled = false;
    confirmTime2.disabled = true;
    count2 = 0;
});
