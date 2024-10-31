const nowPassArea = document.getElementById("nowPassword");
const confirmPassField = document.getElementById("confirmPassword");
const newPassField = document.getElementById("newPassword");
const setPassbutton = document.getElementById("setPassword");

let nowPassValue = "aaaaa";
nowPassArea.textContent = `現在のパスワードは ${nowPassValue}`;

const changePass = () => {
    const confirmPassValue = confirmPassField.value;
    const newPassValue = newPassField.value;

    if (confirmPassValue !== nowPassValue) {
        window.alert("古いパスワードが間違っています！");
    }
    else if (newPassValue === nowPassValue) {
        window.alert("同じパスワードはつかえません！");
    }
    else if (newPassValue.length < 8) {
        window.alert("8文字以上にして下さい。");
    }

    // ^先頭、末尾をちゃんと指定しないと前後になにか混じっても通ってしまう$
    // string.match()などで利用する場合は最後にgを付ける（~/g フラグ）と挙動が変わる
    // else if (!/^\d{3}-\d{4}$/.test(newPassValue)) {
    //     window.alert("xxx-yyyyの形式で入力してください");
    // }
    // \n は後方参照（backreference）出てきた(グループ)の中身は記録され、\出現順 で参照できる
    else if (/(.)\1/.test(newPassValue)) {
        window.alert("同じ文字を連続で使うことは出来ません");
    }
    // (一定の文字列の繰り返し)+といったのでないなら(グループ)にしなくて良い
    else if (/abc/.test(newPassValue)) {
        window.alert("「abc」を含むものは使えません");
    }
    else {
        nowPassValue = newPassValue;
        nowPassArea.textContent = `現在のパスワードは ${nowPassValue}`;
        window.alert(`新しいパスワードは ${nowPassValue}`);
    }
};

setPassbutton.addEventListener("click", changePass);