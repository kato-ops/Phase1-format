const setBtn = document.getElementById("setBtn");
const resetBtn = document.getElementById("resetBtn");
const showImg = document.getElementById("showImg");

const addImg = (address, alternative) => {
    const img = document.createElement("img");
    img.src = address;
    img.alt = alternative;

    const p = document.createElement("p");
    p.textContent = alternative;

    const div = document.createElement("div");
    div.appendChild(img);
    div.appendChild(p);

    showImg.appendChild(div);
}

setBtn.addEventListener("click", () => {
    showImg.innerHTML = "";
    addImg("./img/evolution1.png", "原人");

    const rand = Math.random();
    if (rand >= 0.4) {
        addImg("./img/evolution2.png", "旧人");
    }
    if (rand >= 0.7) {
        addImg("./img/evolution3.png", "新人");
    }
    if (rand >= 0.9) {
        addImg("./img/evolution4.png", "現代人");
    }
});

resetBtn.addEventListener("click", () => {
    showImg.innerHTML = "";
});