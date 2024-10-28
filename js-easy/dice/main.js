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

setPlayer1dice.setAttribute("src", "./img/saikoro1.png");
setPlayer2dice.setAttribute("src", "./img/saikoro1.png");

//プレイヤー番号で管理するために配列化
//player1 = 0 , player2 = 1
let playerNum = [0, 0];

const gameRandom = (player, dice) => {
    playerNum[player] = Math.floor(Math.random() * 6 + 1);
    dice.setAttribute("src", `./img/saikoro${playerNum[player]}.png`);
};

//addEventListenerに引数を渡す際、プレイヤー番号を渡していた為、配列で管理
let playerRolled = [false, false];

const gameRoll = (btn, player, dice) => {
    if (btn.disabled === false) {
        gameResult.textContent = "???";

        const timer = setInterval(gameRandom, 100, player, dice);
        btn.disabled = true;

        setTimeout(() => {
            clearInterval(timer);
            playerRolled[player] = true;

            if (playerRolled[0] === true && playerRolled[1] === true) {
                if (playerNum[0] === playerNum[1]) {
                    gameResult.textContent = "引き分け";
                }
                else if (playerNum[0] > playerNum[1]) {
                    gameResult.textContent = "player1の勝利";
                }
                else {
                    gameResult.textContent = "player2の勝利";
                }

                player1Btn.disabled = false;
                player2Btn.disabled = false;
                playerRolled = [false, false];
            }
        }, 3000);
    }
};

const gameRoll1 = () => {
    gameRoll(player1Btn, 0, setPlayer1dice);

};
player1Btn.addEventListener("click", gameRoll1);

const gameRoll2 = () => {
    gameRoll(player2Btn, 1, setPlayer2dice);
};
player2Btn.addEventListener("click", gameRoll2);