const spinReel = reel => {
    reel.symbols.forEach((content) => {
        if (content.number <= 0) {
            content.number = 9;
        }
        else {
            content.number--;
        }
        content.element.textContent = content.number;
    });
};

const hitSlot = slot => {
    const rightDiagonal = slot.map((reel, index) => {
        return reel.symbols[index];
    });
    const centerLine = slot.map((reel) => {
        return reel.symbols[1];
    });
    const leftDiagonal = slot.map((reel, index) => {
        return reel.symbols[slot.length - 1 - index];
    });

    if (rightDiagonal.every((content) => content.number === rightDiagonal[0].number)) {
        return rightDiagonal;
    }
    else if (centerLine.every((content) => content.number === centerLine[0].number)) {
        return centerLine;
    }
    else if (leftDiagonal.every((content) => content.number === leftDiagonal[0].number)) {
        return leftDiagonal;
    }
    else {
        return null;
    }
};

const main = () => {
    const slot = new Array(3).fill(0).map((_, reelIndex) => {
        const stopButton = document.querySelector(`input:nth-child(${reelIndex + 1})`);
        stopButton.disabled = true;
        return {
            symbols: new Array(3).fill(0).map((_, symbolIndex) => {
                const element = document.querySelectorAll(`.slot p:nth-child(${reelIndex + 1})`)[symbolIndex];
                element.textContent = symbolIndex;
                return {
                    element,
                    number: symbolIndex
                };
            }),
            stopButton,
            spinId: null,
            isSpin: false
        };
    });

    const startButton = document.getElementById("startTimer");

    startButton.addEventListener("click", () => {
        slot.forEach(reel => {
            if (reel.isSpin === false) {
                reel.spinId = setInterval(() => spinReel(reel), 100);
                reel.isSpin = true;
            }
            reel.symbols.forEach(symbol => {
                symbol.element.style.backgroundColor = "transparent";
            });
            reel.stopButton.disabled = false;
        });
    });

    slot.forEach(reel => {
        reel.stopButton.addEventListener("click", () => {
            clearInterval(reel.spinId);
            reel.isSpin = false;
            reel.stopButton.disabled = true;
            if (slot.every((reel) => !reel.isSpin)) {
                const result = hitSlot(slot);
                if (result) {
                    result.forEach((reel) => {
                        reel.element.style.backgroundColor = "orange"
                    });
                    setTimeout(() => window.alert("おめでとう"), 2);
                }
                else {
                    window.alert("再挑戦");
                }
            }
        });
    });
};

window.onload = main;