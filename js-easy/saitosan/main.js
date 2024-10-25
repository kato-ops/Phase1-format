const setBtn = () => {
    const rand = Math.floor(Math.random() * 10);
    // if (rand < 5) {
    //     window.alert("ぺっぺっぺー");
    // }
    // else {
    //     window.alert("斎藤さんだぞ！");
    // }
    window.alert(rand < 5 ? "ぺっぺっぺー" : "斎藤さんだぞ！");
};

const word1 = "ぺっぺっぺー";
const word2 = "斎藤さんだぞ！";

const setBtnEx = () => {
    const rand = Math.floor(Math.random() * 10);
    if (rand < 5) {
        const result = window.confirm(word1);
        if (result) {
            window.alert(word1);
        }
        else {
            window.alert(word2);
        }
    }
    else {
        const result = window.confirm(word2);
        if (result) {
            window.alert(word2);
        }
        else {
            window.alert(word1);
        }
    }
};