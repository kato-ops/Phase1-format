const myHand = document.getElementById("myHand");
const gameStart = document.getElementById("gameStart");
const cpHand = document.getElementById("cpHand");
const log = document.getElementById("log");

const determineResult = (a, b) => {
    let result = null;
    a = parseInt(a);
    b = parseInt(b);

    // シンプルに総当り
    // if (a === b) {
    //     result = 2;
    // }
    // else {
    //     switch (a) {
    //         case 0:
    //             result = b === 1 ? 0 : 1;
    //             break;
    //         case 1:
    //             result = b === 2 ? 0 : 1;
    //             break;
    //         case 2:
    //             result = b === 0 ? 0 : 1;
    //             break;
    //     }
    // }

    // ビット演算
    const hands = [a, b];
    let bitOr = 0;

    for (let i = 0; i < hands.length; i++) {
        bitOr |= 1 << hands[i];
    }

    switch (bitOr) {
        case 1:
        case 2:
        case 4:
        case 7:
            result = 2;
            break;
        case 3:
            result = a === 0 ? 0 : 1;
            break;
        case 5:
            result = a === 2 ? 0 : 1;
            break;
        case 6:
            result = a === 1 ? 0 : 1;
            break;
    }

    //a win = 0, fail = 1, draw = 2
    return result;
};

cpHand.textContent = "相手の手：";
log.textContent = "結果：";

gameStart.addEventListener("click", () => {
    const cpNum = Math.floor(Math.random() * 3);
    switch (cpNum) {
        case 0:
            cpHand.textContent = "相手の手：グー";
            break;
        case 1:
            cpHand.textContent = "相手の手：チョキ";
            break;
        case 2:
            cpHand.textContent = "相手の手：パー";
            break;
    }
    // html要素の属性値は文字列なので厳密演算子やswitch文で使う場合は注意
    switch (determineResult(myHand.value, cpNum)) {
        case 0:
            log.textContent = "結果：勝ち";
            break;
        case 1:
            log.textContent = "結果：負け";
            break;
        case 2:
            log.textContent = "結果：引き分け";
            break;
    }
});

// チャレンジ問題

const player = document.getElementById("player");
const playerHand = document.getElementById("playerHand");
const setHand = document.getElementById("setHand");
const player1Hand = document.getElementById("player1Hand");
const player2Hand = document.getElementById("player2Hand");
const gameStart2 = document.getElementById("gameStart2");
const log2 = document.getElementById("log2");

let player1Num = null;
let player2Num = null;

let turn = 0;
gameStart2.disabled = true;
log2.textContent = "結果："

setHand.addEventListener("click", () => {
    if (turn === 0) {
        player1Num = parseInt(playerHand.value);
        player.textContent = "player2";
        player1Hand.textContent = "player1:セット完了";
    }
    else {
        setHand.disabled = true;
        player2Num = parseInt(playerHand.value);
        player.textContent = "両者セット完了";
        player2Hand.textContent = "player2:セット完了";
        setHand.disabled = true;
        gameStart2.disabled = false;
    }
    turn++;
});

gameStart2.addEventListener("click", () => {
    if (turn === 2) {
        switch (determineResult(player1Num, player2Num)) {
            case 0:
                log2.textContent = "結果：Player1の勝ち";
                break;
            case 1:
                log2.textContent = "結果：Player2の勝ち";
                break;
            case 2:
                log2.textContent = "結果：引き分け";
                break;
        }

        turn = 0;
        player.textContent = "player1";
        player1Hand.textContent = "player1:";
        player2Hand.textContent = "player2:";
        setHand.disabled = false;
        gameStart2.disabled = true;
    }
});