const columnElements = new Array(3).fill(0).map((_, i) => i + 1);
const rowElements = new Array(3).fill(0).map((_, i) => i + 1);

//スロットの数値要素など＋縦列のボタンを収めたオブジェクト
//オブジェクトとか中身的な意味合いじゃなくて、概念的に何か？を変数名にした方が良い
const slotObject = columnElements.map((col) => {
    return {
        //rowか？
        row: rowElements.map((row) => {
            return {
                //これは要素だからそうした方が…
                slot: document.querySelectorAll(`.slot p:nth-child(${col})`)[row - 1],
                number: row
            }
        }),
        stopButton: document.querySelector(`input:nth-child(${col})`),
        spinId: null,
        isSpin: false
    }
});

const startTimer = document.getElementById("startTimer");

//仮引数も、それ単体で何入れれば良いのか分かるように
const spinNumber = (ele) => {
    ele.row.forEach((row) => {
        if (row.number <= 0) {
            row.number = 9;
        }
        else {
            row.number--;
        }
        row.slot.textContent = row.number;
    });
};

startTimer.addEventListener("click", () => {
    slotObject.forEach((col) => {
        if (col.isSpin === false) {
            col.spinId = setInterval(() => spinNumber(col), 100);
            col.isSpin = true;
        }
        col.row.forEach((row) => {
            row.slot.style.backgroundColor = "transparent";
        });
        col.stopButton.disabled = false;
    });
});

const hitSlot = (obj) => {
    const rightDiagonal = obj.map((col, i) => {
        return col.row[i];
    });
    const centerLine = obj.map((col) => {
        return col.row[1];
    });
    const leftDiagonal = obj.map((col, i) => {
        return col.row[obj.length - 1 - i];
    });

    if (rightDiagonal.every((ele) => ele.number === rightDiagonal[0].number)) {
        return rightDiagonal;
    }
    else if (centerLine.every((ele) => ele.number === centerLine[0].number)) {
        return centerLine;
    }
    else if (leftDiagonal.every((ele) => ele.number === leftDiagonal[0].number)) {
        return leftDiagonal;
    }
    else {
        return false;
    }
};

slotObject.forEach((col) => {
    //初期化
    col.row.forEach((row) => {
        row.slot.textContent = row.number;
    });
    col.stopButton.disabled = true;

    //ストップボタンの処理
    col.stopButton.addEventListener("click", () => {
        clearInterval(col.spinId);
        col.isSpin = false;
        col.stopButton.disabled = true;
        if (slotObject.every((ele) => !ele.isSpin)) {
            const result = hitSlot(slotObject);
            if (result !== false) {
                result.forEach((ele) => {
                    ele.slot.style.backgroundColor = "orange"
                });
                setTimeout(() => window.alert("おめでとう"), 2);
            }
            else {
                window.alert("再挑戦");
            }
        }
    });
});