const addArea = document.getElementById("add-area");
const addBtn = document.getElementById("add-btn");
const todo = document.getElementById("todo");

//liを作ってるのはそうだが、やりたいこととしては、todoリストに追加であって
//この関数名だと分かりづらい。
const createLi = () => {
    // Pタグで置くのと、素で置くのって、どっちが良いんだろう？
    // Pは段落要素だから、リストの中にわざわざ段落を設ける必要はない？
    // const p = document.createElement("p");
    // p.textContent = addArea.value;
    //=>どっちでもいい。段落として意識したいなら付ける

    //順番として、<li>text<button></
    //とするので、その順番でcreateした方が見やすい
    const button = document.createElement("button");
    button.textContent = "完了";
    button.addEventListener("click", (event) => {
        event.currentTarget.parentNode.remove();
    });

    const li = document.createElement("li");
    li.append(addArea.value, button);

    todo.appendChild(li);

    addArea.value = "";
};

addBtn.addEventListener("click", () => {
    if (addArea.value === "") {
        window.alert("空欄です！");
        //除外項目はreturnで抜けちゃったほうが良い
        //やりたい項目をelseでネストしなくて良いので
    }
    else {
        createLi();
    }
});