const nowTime = [
    [
        document.getElementById("nowTime4"),
        document.getElementById("nowTime"),
        document.getElementById("nowTime7")
    ], [
        document.getElementById("nowTime5"),
        document.getElementById("nowTime2"),
        document.getElementById("nowTime8")
    ], [
        document.getElementById("nowTime6"),
        document.getElementById("nowTime3"),
        document.getElementById("nowTime9")
    ]
];

let nowNumber = [
    [9, 0, 1],
    [9, 0, 1],
    [9, 0, 1]
];

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

const setTime = [
    document.getElementById("setTime1"),
    document.getElementById("setTime2"),
    document.getElementById("setTime3")
];
const startTimer = document.getElementById("startTimer");

const compareArray = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length === b.length) {
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
    return true;
};


for (let column = 0; column < 3; column++) {
    for (let row = 0; row < 3; row++) {
        nowTime[column][row].textContent = nowNumber[column][row];
    }
    setTime[column].disabled = true;
}


let spinId = [];
let isSpin = [false, false, false];

startTimer.addEventListener("click", () => {
    for (let column = 0; column < 3; column++) {
        if (isSpin[column] === false) {
            spinId[column] = setInterval(spinNumber, 100, column);
            isSpin[column] = true;
        }
        setTime[column].disabled = false;
    }
});

for (let column = 0; column < 3; column++) {
    setTime[column].addEventListener("click", () => {
        clearInterval(spinId[column]);
        isSpin[column] = false;
        setTime[column].disabled = true;

        if (compareArray(isSpin, [false, false, false])) {
            // スロットの停止後判定
            console.log("test");
        }
    });
}
