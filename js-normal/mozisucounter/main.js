const sampleForm = document.getElementById("sampleForm");
const textCounter = document.getElementById("textCounter");
const resetBtn = document.getElementById("resetBtn");

const goalNum = 400;

const restNumCount = () => {
    const restNum = goalNum - sampleForm.value.length;
    textCounter.textContent = `あと${restNum}文字`;
};

restNumCount();

sampleForm.addEventListener("keyup", restNumCount);

resetBtn.addEventListener("click", () => {
    //input type="reset" だと対応フォーム内の値をリセットするので不要
    //sampleForm.value = "";

    //type="reset"だとclickイベント処理 => テキストエリアのリセットの処理順になるため機能しない
    //restNumCount();

    textCounter.textContent = `あと${goalNum}文字`;
});


//追加問題
const iniDel = document.getElementById("iniDel");
const endDel = document.getElementById("endDel");

iniDel.addEventListener("click", () => {
    const val = sampleForm.value;
    sampleForm.value = val.slice(1);
    restNumCount();
});

endDel.addEventListener("click", () => {
    const val = sampleForm.value;
    sampleForm.value = val.slice(0, - 1);
    restNumCount();
});