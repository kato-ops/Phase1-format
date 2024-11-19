//配列に空の使わないのは要らない
let cpNum = new Array(3);
let userNum = new Array(3);
let remTurns = 10;

const answerNum = document.getElementById("answerNum");
const numCheck = document.getElementById("numCheck");
const remainTurn = document.getElementById("remainTurn");

const hasDuplicate = (array) => {
    return new Set(array).size !== array.length;
};

const makeRandNum = () => {
    let num = [];
    let limit = 1000;
    while (num.length < 3) {
        const rand = Math.floor(Math.random() * 10);
        if (!num.includes(rand)) {
            num.push(rand);
        }

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

//init処理は処理でまとめたい
cpNum = makeRandNum();
console.log(cpNum);
remainTurn.textContent = `あと残り${remTurns}回です`;

numCheck.addEventListener("click", () => {
    //この処理中でしか使わないから、constで定義しちゃったほうが
    //あとtostring要らないらしい。valueは基本文字列だとか
    userNum = answerNum.value.toString().split(``).map(Number);
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

    //処理として一まとまりなのはreturnで抜けたりすると逆に分かりにくい
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