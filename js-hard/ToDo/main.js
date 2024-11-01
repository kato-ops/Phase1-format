const addArea = document.getElementById("add-area");
const addBtn = document.getElementById("add-btn");
const todo = document.getElementById("todo");

const createLi = () => {
    // Pタグで置くのと、素で置くのって、どっちが良いんだろう？
    // Pは段落要素だから、リストの中にわざわざ段落を設ける必要はない？
    // const p = document.createElement("p");
    // p.textContent = addArea.value;

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
    }
    else {
        createLi();
    }
});