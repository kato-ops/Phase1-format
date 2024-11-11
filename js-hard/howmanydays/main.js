// const remTime = document.createElement("p");
// document.body.appendChild(remTime);
// const target = "2112-9-3";

const dateSet = document.getElementById("dateSet");
const dateSearch = document.getElementById("dateSearch");
const diffTime = document.getElementById("diffTime");

let intervalID;

const getRemTime = targetTime => {
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
