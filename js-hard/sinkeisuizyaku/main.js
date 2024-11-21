const field = document.getElementById("panel");
let cards = [1, 1, 2, 2, 3, 3, 4, 4];
let opendCards;
let finishCount;
let isDecision;

cards.forEach(() => {
    const element = document.createElement("div");
    field.appendChild(element);
});

const cardShuffle = (array) => {
    const copyArray = [...array];
    copyArray.forEach((_, i, arr) => {
        if (i < arr.length - 1) {
            const rand = Math.floor(Math.random() * (arr.length - i) + i);
            [arr[i], arr[rand]] = [arr[rand], arr[i]]
        }
    });
    return copyArray;
    // return _.shuffle(array);
};

const initGame = () => {
    cards = cardShuffle(cards);
    opendCards = [];
    finishCount = 0;
    isDecision = false;
    [...field.children].forEach(element => {
        element.className = "card back";
    });
}

initGame();

//連打とか、反転したやつとかも反応しちゃうから、それ対策しないと
field.addEventListener("click", event => {
    if (event.target === field) {
        return;
    }
    if (isDecision === true) {
        return;
    }

    const cardNum = cards[[...field.children].indexOf(event.target)];
    event.target.textContent = cardNum;
    event.target.classList.replace("back", "hober");
    opendCards.push({ number: cardNum, element: event.target });

    if (opendCards.length === 2) {
        isDecision = true;
        if (opendCards[0].number !== opendCards[1].number) {
            setTimeout(() => {
                opendCards.forEach(({ element }) => {
                    element.textContent = "";
                    element.classList.replace("hober", "back");
                });
                opendCards = [];
                isDecision = false;
            }, 500);
        }
        else {
            setTimeout(() => {
                opendCards.forEach(({ element }) => {
                    element.classList.replace("hober", "finish");
                });
                finishCount += 2;
                opendCards = [];

                if (finishCount === 8) {
                    window.alert("終了です");
                    initGame();
                }
                isDecision = false;
            }, 500);
        }
    }
});