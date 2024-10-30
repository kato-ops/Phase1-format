const data = [
    { img: "./img/slide1.png", text: "春へ" },
    { img: "./img/slide2.png", text: "夏へ" },
    { img: "./img/slide3.png", text: "秋へ" },
    { img: "./img/slide4.png", text: "冬へ" }
];

const pushBtn = document.getElementById("pushBtn");
const viewImg = document.getElementById("viewImg");

let imgNum = 0;

const setImg = () => {
    pushBtn.textContent = data[imgNum].text;
    viewImg.src = data[imgNum].img;
};

setImg();

pushBtn.addEventListener("click", () => {
    if (imgNum === 3) {
        imgNum = 0;
    }
    else {
        imgNum++;
    }
    setImg();
});

//追加問題
const seasonNum = document.getElementById("seasonNum");
const skipBtn = document.getElementById("skipBtn");

skipBtn.addEventListener("click", () => {
    imgNum = parseInt(seasonNum.value);
    setImg();
});