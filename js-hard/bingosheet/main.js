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

const sheetRow = new Array(6).fill(0).map(() => document.createElement("tr"));

const bingo = {
    header: "BINGO",
    sheet: new Array(5).fill(0).map((_, index) => {
        return createRandArray(5, index * 15 + 1, index * 15 + 15).map(num => {
            return {
                number: num,
                element: document.createElement("td"),
                isHit: false
            }
        });
    })
};

bingo.sheet[2][2].number = 0;

bingo.header.split('').forEach(chara => {
    const headerView = document.createElement("td");
    headerView.textContent = chara;
    sheetRow[0].appendChild(headerView);
});

bingo.sheet.forEach(column => {
    column.forEach((cell, index) => {
        if (cell.number !== 0) {
            cell.element.textContent = cell.number;
        }
        else {
            cell.element.textContent = "free";
        }
        sheetRow[index + 1].appendChild(cell.element);
    });
});

bingoView.append(...sheetRow);