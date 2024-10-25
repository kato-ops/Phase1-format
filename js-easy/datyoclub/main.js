let cntPerson = 0;

const cntUp = () => {
    cntPerson++;
};

const reply = () => {
    window.alert("どうぞどうぞ".repeat(cntPerson));
    cntPerson = 0;
};
const cntDown = () => {
    cntPerson--;
    if (cntPerson < 0) {
        window.alert("もう誰もいない、、、");
        cntPerson = 0;
    }
};