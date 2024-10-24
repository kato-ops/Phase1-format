let countNum = 0;
const rewriteNum = document.getElementById("rewriteNum");
rewriteNum.textContent = countNum;

const rewriteCntUp = () => {
    countNum++;
    if (countNum % 3 === 0 && countNum % 5 === 0) {
        rewriteNum.textContent = "fizzbuzz";
    }
    else if (countNum % 3 === 0) {
        rewriteNum.textContent = "fizz";
    }
    else if (countNum % 5 === 0) {
        rewriteNum.textContent = "buzz";
    }
    else {
        rewriteNum.textContent = countNum;
    }
}


let gameNum = 0;
const showNum = document.getElementById("showNum");
showNum.textContent = gameNum;

const fizzBtn = () => {
    gameNum++;
    if (gameNum % 3 === 0) {
        showNum.textContent = "fizz";
    }
    else {
        window.alert("ちがいます");
        location.reload();
    }
}
const buzzBtn = () => {
    gameNum++;
    if (gameNum % 5 === 0) {
        showNum.textContent = "buzz";
    }
    else {
        window.alert("ちがいます");
        location.reload();
    }

}
const fizzbuzzBtn = () => {
    gameNum++;
    if (gameNum % 3 === 0 && gameNum % 5 === 0) {
        showNum.textContent = "fizzbuzz";
    }
    else {
        window.alert("ちがいます");
        location.reload();
    }
}
const numBtn = () => {
    gameNum++;
    if (gameNum % 3 === 0 || gameNum % 5 === 0) {
        window.alert("ちがいます");
        location.reload();
    }
    else {
        showNum.textContent = gameNum;
    }
}
