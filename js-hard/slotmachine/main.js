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

const setTime = [
    document.getElementById("setTime1"),
    document.getElementById("setTime2"),
    document.getElementById("setTime3")
];
const startTimer = document.getElementById("startTimer");

let nowNumber = [
    [9, 0, 1],
    [9, 0, 1],
    [9, 0, 1]
];

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

let spinId = [];
let isSpin = [false, false, false];

startTimer.addEventListener("click", () => {
    for (let column = 0; column < 3; column++) {
        if (isSpin[column] === false) {
            spinId[column] = setInterval(spinNumber, 1000, column);
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

        if (compareArray(isSpin, [false, false, false])) {
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
