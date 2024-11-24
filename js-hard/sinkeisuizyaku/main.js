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
    const cardType = 6;
    let cards = new Array(cardType).fill(0).flatMap((_, i) => [i + 1, i + 1]).map(number => {
        return {
            number,
            opend: false
        };
    });
    let opendList;
    let matchCount;
    let inProcess;

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
        event.target.classList.replace("back", "hober");
        opendList.push({ index: selectIndex, element: event.target });

        if (opendList.length === 2) {
            inProcess = true;
            if (cards[opendList[0].index].number !== cards[opendList[1].index].number) {
                setTimeout(() => {
                    opendList.forEach(({ index, element }) => {
                        element.textContent = "";
                        element.classList.replace("hober", "back");
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
                        element.classList.replace("hober", "finish");
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