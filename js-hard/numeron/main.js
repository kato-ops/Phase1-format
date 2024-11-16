let cpNum = [0, 1, 2];
let userNum = [0, 1, 2];
let remTurns = 10;

const answerNum = document.getElementById("answerNum");
const numCheck = document.getElementById("numCheck");
const remainTurn = document.getElementById("remainTurn");

const isDuplicate = (ele, index, arr) => {
    return ele === arr[(index + 1) % 3];
};

const makeRandNum = () => {
    let num = [0, 0, 0];
    let limit = 1000;
    while (num.some(isDuplicate)) {
        num = num.map(() => Math.floor(Math.random() * 9));

        limit--;
        if (limit <= 0) {
            console.log("ERR:infinite loop");
            break;
        }
    }
    return num;
};

const countEatBite = (arr1, arr2) => {
    let eatNum = 0;
    let biteNUm = 0;

    arr1.forEach((ele1, index1) => {
        arr2.forEach((ele2, index2) => {
            if (ele1 === ele2) {
                if (index1 === index2) {
                    eatNum++;
                }
                else {
                    biteNUm++;
                }
            }
        });
    });

    return { eat: eatNum, bite: biteNUm };
};


cpNum = makeRandNum();
console.log(cpNum);
remainTurn.textContent = `あと残り${remTurns}回です`;

numCheck.addEventListener("click", () => {
    userNum = answerNum.value.toString().split(``).map(Number);
    if (userNum.length !== 3) {
        window.alert("3桁の数を入れて下さい");
        return;
    }
    if (userNum.some(isDuplicate)) {
        window.alert("同じ数を2回使ってはいけません");
        return;
    }

    const result = countEatBite(cpNum, userNum);
    window.alert(`${result.eat} EAT, ${result.bite} BITE`);
    if (result.eat === 3) {
        window.alert("正解です！");
        cpNum = makeRandNum();
        console.log(cpNum);
        remTurns = 10;
        remainTurn.textContent = `あと残り${remTurns}回です`;
        return;
    }

    if (remTurns > 1) {
        remTurns--;
        remainTurn.textContent = `あと残り${remTurns}回です`;
        return;
    }
    else {
        window.alert(`終了です。答えは${cpNum.join('')}でした`);
        cpNum = makeRandNum();
        console.log(cpNum);
        remTurns = 10;
        remainTurn.textContent = `あと残り${remTurns}回です`;
        return;
    }
});