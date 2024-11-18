const view = document.getElementById("view");
const hitNum = document.getElementById("hitNum");
let bingo = [
    ['B'],
    ['I'],
    ['N'],
    ['G'],
    ['O']
]

const createRandArray = (len, min, max) => {
    let arr = [];
    let limit = 1000;
    while (arr.length < len) {
        const rand = Math.floor(Math.random() * (max + 1 - min) + min);
        if (!arr.includes(rand)) {
            arr.push(rand);
        }

        limit--;
        if (limit <= 0) {
            console.log("ERR:infinite loop");
            break;
        }
    }
    return arr;

    //JavaScriptのSetは順序が変更されないので、以下も可
    // const set = new Set();
    // let limit = 1000;
    // while (set.size < len) {
    //     set.add(Math.floor(Math.random() * (max + 1 - min) + min));

    //     limit--;
    //     if (limit <= 0) {
    //         console.log("ERR:infinite loop");
    //         break;
    //     }
    // }
    // return [...set];
};

bingo.forEach((ele, index) => {
    ele.push(...createRandArray(5, index * 15 + 1, index * 15 + 15));
});
bingo[2][3] = "free";

//これだと、行と列が逆になる。
bingo.forEach((col)=>{
    const tr = document.createElement("tr");
    col.forEach((row)=>{
        const td = document.createElement("td");
        td.textContent = row;
        tr.appendChild(td);
    });
    view.appendChild(tr);
});