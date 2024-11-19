// const remTime = document.createElement("p");
// document.body.appendChild(remTime);
// const target = "2112-9-3";

//input要素だとか分かる変数名にしちゃった方が
const dateSet = document.getElementById("dateSet");
const dateSearch = document.getElementById("dateSearch");
const diffTime = document.getElementById("diffTime");

let intervalID;

//remだと圧縮しすぎ。初めてみた人が分かるように
const getRemTime = targetTime => {
    //durationオブジェクトだと分かるものに
    const remTime = moment.duration(moment(targetTime).diff(moment()));
    const remDays = Math.floor(remTime.asDays());
    const remHours = remTime.hours();
    const remMinutes = remTime.minutes();
    const remSeconds = remTime.seconds();
    return `まで後${remDays}日${remHours}時間${remMinutes}分${remSeconds}秒`;
};

dateSet.addEventListener("change", () => {
    clearInterval(intervalID);
    diffTime.textContent = "";
});

dateSearch.addEventListener("click", () => {
    diffTime.textContent = getRemTime(dateSet.value);
    clearInterval(intervalID);
    intervalID = setInterval(() => {
        diffTime.textContent = getRemTime(dateSet.value);
    }, 1000);
});
