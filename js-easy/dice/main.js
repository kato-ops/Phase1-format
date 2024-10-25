//サイコロアプリ
const diceBtn = document.getElementById("diceBtn");
const body = document.getElementsByTagName("body")[0];

const dice = document.createElement("img");
dice.style.width = "100px";
dice.style.height = "100px";

let diceNum = "./img/saikoro1.png";
dice.setAttribute("src", diceNum);
body.prepend(dice);

const random = () => {
    diceNum = `./img/saikoro${Math.floor(Math.random() * 6 + 1)}.png`;
    dice.setAttribute("src", diceNum);
};

diceBtn.addEventListener("click", () => {
    if (diceBtn.disabled === false) {
        const timer = setInterval(random, 100);
        diceBtn.disabled = true;

        setTimeout(() => {
            clearInterval(timer);
            diceBtn.disabled = false;
        }, 3000);
    }
});

//サイコロゲーム
const player1Btn = document.getElementById("player1Btn");
const player2Btn = document.getElementById("player2Btn");
const setPlayer1dice = document.getElementById("setPlayer1dice");
const setPlayer2dice = document.getElementById("setPlayer2dice");
const gameResult = document.getElementById("result");

setPlayer1dice.setAttribute("src", "./img/saikoro1.png")
setPlayer2dice.setAttribute("src", "./img/saikoro1.png")

//addEventListenerに引数を渡す際、変数ではなく値が渡されるので、プレイヤー番号で管理するために配列化
//player1 = 0 , player2 = 1
let playerNum = [0, 0];

const gameRandom = (playerR, diceR) => {
    playerNum[playerR] = Math.floor(Math.random() * 6 + 1)
    diceR.setAttribute("src", `./img/saikoro${playerNum[playerR]}.png`);
};

//addEventListenerに引数を渡す際、プレイヤー番号を渡していた為、配列で管理
let playerRolled = [false, false];

//引数をplayer diceといった言葉で統一した方が定義としては分かりやすいと思うのですが、
//コードとしてみた場合には同じ単語が並んで分かりづらくなると思い、末尾に文字を入れました。
//どちらの方が良いでしょうか？
const gameRoll = (btnG, playerG, diceG) => {
    if (btnG.disabled === false) {
        gameResult.textContent = "???";

        const timer = setInterval(gameRandom, 100, playerG, diceG);
        btnG.disabled = true;

        //要らないとは思いますが渡していることが明示的に分かるため一応引数として渡しています。
        setTimeout((timerS, playerS) => {
            clearInterval(timerS);
            playerRolled[playerS] = true;

            if (playerRolled[0] === true && playerRolled[1] === true) {
                if (playerNum[0] === playerNum[1]) {
                    gameResult.textContent = "引き分け"
                }
                else if (playerNum[0] > playerNum[1]) {
                    gameResult.textContent = "player1の勝利"
                }
                else {
                    gameResult.textContent = "player2の勝利"
                }

                player1Btn.disabled = false;
                player2Btn.disabled = false;
                playerRolled = [false, false];
            }
        }, 3000, timer, playerG);
    }
};

//アロー関数の場合、thisで参照できないためラップ
function gameRollEvent(e) {
    gameRoll(this.btn, this.player, this.dice);
}

player1Btn.addEventListener("click", { handleEvent: gameRollEvent, btn: player1Btn, player: 0, dice: setPlayer1dice });
player2Btn.addEventListener("click", { handleEvent: gameRollEvent, btn: player2Btn, player: 1, dice: setPlayer2dice });
//通常、addEventListenerでは関数に引数を渡す処理は行われない。
//handleEventがあるオブジェクトをaddEventListenerに渡すことで、関数以外の情報も処理させることが出来ている。
//処理としては以下のものと同様
//
// const foo = {
//     handleEvent: gameRollEvent,
//     btn: player1Btn,
//     player: 0,
//     dice: setPlayer1dice
// };
// player1Btn.addEventListener("click", foo);
//
//     num: player1Num
//　　　といった風にしたかったが、数値はコピーされる際に値がコピーされるため難しい。