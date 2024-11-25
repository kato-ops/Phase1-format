const cardShuffle = (cards) => {
    // const copyArray = [...cards];
    // copyArray.forEach((_, i, arr) => {
    //     if (i < arr.length - 1) {
    //         const rand = Math.floor(Math.random() * (arr.length - i) + i);
    //         [arr[i], arr[rand]] = [arr[rand], arr[i]]
    //     }
    // });
    // return copyArray;
    return _.shuffle(cards);
};


const main = () => {
    const field = document.getElementById("panel");
    const cardType = 4;

    //カード実体として、エレメント自体をカードとした方がイメージしやすいらしい。
    // ()=>{
    // const card = document.getElementById();
    // card.number = 0;
    // card.opend = false;
    // }
    //みたいに、htmlオブジェクトの予約後でなければ、要素を追加してもいいらしい。
    let cards = new Array(cardType).fill(0).flatMap((_, i) => [i + 1, i + 1]).map(number => {
        return {
            number,
            opend: false
        };
    });
    //後で初期化する場合でも、初期値を入れてundefined状態にさせない方がTypeScript的には良いらしい。
    let opendList = [];
    let matchCount = 0;
    let inProcess = false;

    const turn = {
        player: 0,
        element: document.getElementById("nextPlayer")
    };
    const players = [{
        point: 0,
        element: document.getElementById("player1Point")
    },
    {
        point: 0,
        element: document.getElementById("player2Point")
    }];

    //initするならカードを並べる=html要素を追加する
    //の処理も含めないと違和感があるらしい。
    cards.forEach(() => {
        const element = document.createElement("div");
        field.appendChild(element);
    });

    const initGame = () => {
        [...field.children].forEach(element => {
            element.textContent = "";
            element.className = "card back";
        });
        cards.forEach(card => {
            card.opend = false;
        });
        opendList = [];
        matchCount = 0;
        inProcess = false;
        cards = cardShuffle(cards);

        turn.player = 0;
        turn.element.textContent = "次はplayer1の番です";
        players.forEach((player, index) => {
            player.point = 0;
            player.element.textContent = `player${index + 1}:0`;
        });
    };

    initGame();

    field.addEventListener("click", event => {
        if (event.target === field) {
            return;
        }
        if (inProcess === true) {
            return;
        }

        const selectIndex = [...field.children].indexOf(event.target);
        const selectCard = cards[selectIndex];
        if (selectCard.opend === true) {
            return;
        }

        selectCard.opend = true;
        event.target.textContent = selectCard.number;
        event.target.classList.remove("back");
        opendList = [...opendList, { index: selectIndex, element: event.target }];

        //コードが長すぎる場合には適当なところを関数化して小分けにしたほうが見やすいとのこと。
        //汎用性というか、関数が使うものを引数としている方が理解しやすい関数にも出来るとのこと。
        if (opendList.length === 2) {
            inProcess = true;
            if (cards[opendList[0].index].number !== cards[opendList[1].index].number) {
                setTimeout(() => {
                    opendList.forEach(({ index, element }) => {
                        element.textContent = "";
                        element.classList.add("back");
                        cards[index].opend = false;
                    });
                    opendList = [];
                    inProcess = false;

                    turn.player = (turn.player + 1) % 2;
                    turn.element.textContent = `次はplayer${turn.player + 1}の番です`;
                }, 500);
            }
            else {
                players[turn.player].point++;
                players[turn.player].element.textContent = `player${turn.player + 1}:${players[turn.player].point}`;

                setTimeout(() => {
                    opendList.forEach(({ element }) => {
                        element.classList.add("finish");
                    });
                    matchCount++;
                    opendList = [];
                    inProcess = false;

                    if (matchCount === cardType) {
                        window.alert(`終了。${players[0].point === players[1].point ? "引き分け" : players[0].point > players[1].point ? "勝者はplayer1" : "勝者はplayer2"}です。`);
                        initGame();
                    }
                }, 500);
            }
        }
    });
};

window.onload = main;