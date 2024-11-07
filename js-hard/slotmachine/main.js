const nowTime = [
    //slotクラスの子要素pの1番目
    Array.from(document.querySelectorAll(".slot p:nth-child(1)")),
    //とにかく子要素のという意味合いでスペースを開けても出来る
    //スペース開け忘れると、slotの中で何番目のを取ってしまうので注意
    Array.from(document.querySelectorAll(".slot :nth-child(2)")),
    //スプレッド構文でバラして配列に格納
    [...document.querySelectorAll(".slot p:nth-child(3)")]
];

// const setTime = [
//     document.getElementById("setTime1"),
//     document.getElementById("setTime2"),
//     document.getElementById("setTime3")
// ];
const setTime = [...document.querySelectorAll("input:nth-child(-n+3)")];

const startTimer = document.getElementById("startTimer");

let nowNumber = [
    [9, 0, 1],
    [9, 0, 1],
    [9, 0, 1]
];

let spinId = [];
let isSpin = [false, false, false];

for (let column = 0; column < 3; column++) {
    for (let row = 0; row < 3; row++) {
        nowTime[column][row].textContent = nowNumber[column][row];
    }
    setTime[column].disabled = true;
}

const spinNumber = (column) => {
    for (let row = 0; row < 3; row++) {
        if (nowNumber[column][row] <= 0) {
            nowNumber[column][row] = 9;
        }
        else {
            nowNumber[column][row]--;
        }
        nowTime[column][row].textContent = nowNumber[column][row];
    }
};

startTimer.addEventListener("click", () => {
    for (let column = 0; column < 3; column++) {
        if (isSpin[column] === false) {
            spinId[column] = setInterval(() => spinNumber(column), 100);
            isSpin[column] = true;
        }
        for (let row = 0; row < 3; row++) {
            nowTime[column][row].style.backgroundColor = "transparent";
        }
        setTime[column].disabled = false;
    }
});

for (let column = 0; column < 3; column++) {
    setTime[column].addEventListener("click", () => {
        clearInterval(spinId[column]);
        isSpin[column] = false;
        setTime[column].disabled = true;

        //Array.every(判定式) 判定式で 値 === false かを見たい
        //falseならtrueを返したいので!で反転させれば良い
        if (isSpin.every(ele => !ele)) {
            if (nowNumber[0][1] === nowNumber[1][1] && nowNumber[1][1] === nowNumber[2][1]) {
                nowTime[0][1].style.backgroundColor = "orange";
                nowTime[1][1].style.backgroundColor = "orange";
                nowTime[2][1].style.backgroundColor = "orange";
                setTimeout(() => {
                    window.alert("おめでとう");
                }, 0);
            }
            else if (nowNumber[0][0] === nowNumber[1][1] && nowNumber[1][1] === nowNumber[2][2]) {
                nowTime[0][0].style.backgroundColor = "orange";
                nowTime[1][1].style.backgroundColor = "orange";
                nowTime[2][2].style.backgroundColor = "orange";
                setTimeout(() => {
                    window.alert("おめでとう");
                }, 0);
            }
            else if (nowNumber[0][2] === nowNumber[1][1] && nowNumber[1][1] === nowNumber[2][0]) {
                nowTime[0][2].style.backgroundColor = "orange";
                nowTime[1][1].style.backgroundColor = "orange";
                nowTime[2][0].style.backgroundColor = "orange";
                setTimeout(() => {
                    window.alert("おめでとう");
                }, 0);
            }
            else {
                window.alert("再挑戦");
            }
        }
    });
}
