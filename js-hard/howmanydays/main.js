// const remTime = document.createElement("p");
// document.body.appendChild(remTime);
// const target = "2112-9-3";

const inputDate = document.getElementById("dateSet");
const searchButton = document.getElementById("dateSearch");
const displayDiff = document.getElementById("diffTime");

let intervalID;

const getRemainTime = targetTime => {
    const remainDuration = moment.duration(moment(targetTime).diff(moment()));
    const remainDays = Math.floor(remainDuration.asDays());
    const remainHours = remainDuration.hours();
    const remainMinutes = remainDuration.minutes();
    const remainSeconds = remainDuration.seconds();
    return `まで後${remainDays}日${remainHours}時間${remainMinutes}分${remainSeconds}秒`;
};

inputDate.addEventListener("change", () => {
    clearInterval(intervalID);
    displayDiff.textContent = "";
});

searchButton.addEventListener("click", () => {
    displayDiff.textContent = getRemainTime(inputDate.value);
    clearInterval(intervalID);
    intervalID = setInterval(() => {
        displayDiff.textContent = getRemainTime(inputDate.value);
    }, 1000);
});
