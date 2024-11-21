const field = document.getElementById("panel");
let cards = [1, 1, 2, 2, 3, 3, 4, 4].map(num => {
    return {
        number: num,
        element: document.createElement("div")
    };
});
let opendCards;
let finishCount;

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

const clickCard = card => {
    card.element.textContent = card.number;
    card.element.classList.remove("back");
    card.element.classList.add("hober");
    opendCards.push(card);
    if (opendCards.length === 2) {
        if (opendCards[0].number !== opendCards[1].number) {
            setTimeout(() => {
                opendCards.forEach(({ element }) => {
                    element.textContent = "";
                    element.classList.remove("hober");
                    element.classList.add("back");
                });
                opendCards = [];
            }, 500)
        }
        else {
            setTimeout(() => {
                opendCards.forEach(({ element }) => {
                    element.classList.remove("hober");
                    element.classList.add("finish");
                });
                opendCards = [];
                finishCount += 2;

                if (finishCount === 8) {
                    window.alert("終了です");
                    initGame();
                }
            }, 500)
        }
    }
};

const initGame = () => {

    //前消ししてから追加だと何かcss残るんだけどなんで？
    while (field.firstChild) {
        field.removeChild(field.firstChild);
    }

    cards = cardShuffle(cards);
    opendCards = [];
    finishCount = 0;

    cards.forEach(item => {
        item.element.classList.add("card", "back");
        //削除=>子要素再追加ってするとcssとかリスナーが残るっぽい。
        //親要素のクリック=>ターゲット　で配列と対応とかが良いんだと思う。
        //どうやって配列番号と対応させるんだ？id使わずに
        item.element.addEventListener("click", () => { clickCard(item) });
        field.appendChild(item.element);
    });
};

initGame();