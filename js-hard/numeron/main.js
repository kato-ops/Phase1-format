let cpNum;
let remTurns;

const inputNum = document.getElementById("answerNum");
const answerButton = document.getElementById("numCheck");
const displayTurn = document.getElementById("remainTurn");

const hasDuplicate = (array) => {
    return new Set(array).size !== array.length;
};

const makeRandNum = () => {
    const num = [];
    while (num.length < 3) {
        const rand = Math.floor(Math.random() * 10);
        if (!num.includes(rand)) {
            num.push(rand);
        }
    }
    return num;
};

const countEatBite = (arr1, arr2) => {
    let eatNum = 0;
    let biteNum = 0;

    arr1.forEach((ele1, index1) => {
        arr2.forEach((ele2, index2) => {
            if (ele1 === ele2) {
                if (index1 === index2) {
                    eatNum++;
                }
                else {
                    biteNum++;
                }
            }
        });
    });

    return { eat: eatNum, bite: biteNum };
};

const initCpNum = () => {
    cpNum = makeRandNum();
    console.log(cpNum);
    remTurns = 10;
    displayTurn.textContent = `あと残り${remTurns}回です`;
};

initCpNum();

answerButton.addEventListener("click", () => {
    const userNum = inputNum.value.split(``).map(Number);
    if (userNum.length !== 3) {
        window.alert("3桁の数を入れて下さい");
        return;
    }
    if (hasDuplicate(userNum)) {
        window.alert("同じ数を2回使ってはいけません");
        return;
    }

    const result = countEatBite(cpNum, userNum);
    window.alert(`${result.eat} EAT, ${result.bite} BITE`);

    if (result.eat !== 3) {
        if (remTurns > 1) {
            remTurns--;
            displayTurn.textContent = `あと残り${remTurns}回です`;
            return;
        }
        else {
            window.alert(`終了です。答えは${cpNum.join('')}でした`);
            initCpNum();
            return;
        }
    }
    else {
        window.alert("正解です！");
        initCpNum();
    }
});