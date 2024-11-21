const bingoView = document.getElementById("view");
const hitNumButton = document.getElementById("hitNum");

const createRandArray = (len, min, max) => {
    const arr = [];
    while (arr.length < len) {
        const rand = Math.floor(Math.random() * (max + 1 - min) + min);
        if (!arr.includes(rand)) {
            arr.push(rand);
        }
    }
    return arr;

    //JavaScriptのSetは順序が変更されないので、以下も可
    // const set = new Set();
    // while (set.size < len) {
    //     set.add(Math.floor(Math.random() * (max + 1 - min) + min));
    // }
    // return [...set];
};

const bingo = {
    header: "BINGO",
    sheet: new Array(5).fill(0).map((_, index) => {
        return createRandArray(5, index * 15 + 1, index * 15 + 15).map(num => {
            return {
                number: num,
                element: document.createElement("td"),
            }
        });
    })
};

bingo.sheet[2][2].number = 0;

const sheetRow = new Array(6).fill(0).map(() => document.createElement("tr"));

bingo.header.split('').forEach(chara => {
    const headerEle = document.createElement("td");
    headerEle.textContent = chara;
    sheetRow[0].appendChild(headerEle);
});

bingo.sheet.forEach(column => {
    column.forEach((cell, index) => {
        if (cell.number !== 0) {
            cell.element.textContent = cell.number;
        }
        else {
            cell.element.textContent = "free";
            cell.element.classList.add("hit-num");
        }
        sheetRow[index + 1].appendChild(cell.element);
    });
});

bingoView.append(...sheetRow);

hitNumButton.addEventListener("click", () => {
    const hitNumber = Math.floor(Math.random() * 75 + 1);
    window.alert(`数字は${hitNumber}番です！`);
    const hitCell = bingo.sheet.flat().find(({ number }) => number === hitNumber);
    if (hitCell) {
        hitCell.element.classList.add("hit-num");
    }
});
